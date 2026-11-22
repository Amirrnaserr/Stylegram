import { FONT_LIBRARY, loadCustomFontFile, loadStoredCustomFonts, deleteStoredCustomFont } from './fonts.js';
import { TEXT_STYLES, createDefaultTextConfigs } from './textStyles.js';
import { BG_STYLES, TEXT_BG_STYLES, createDefaultBgConfigs, createDefaultTextBgConfigs } from './bgStyles.js';
import { renderComposition, renderTextThumb, renderBgThumb, renderTextBgThumb } from './renderer.js';

const state = {
  theme: 'dark',
  activeTab: 'text',
  text: {
    content: 'استودیو حرفه‌ای StyleGram\nطراحی متن و استیکر شفاف ✨',
    align: 'center',
    lineHeight: 1.45
  },
  font: {
    id: 'Vazirmatn',
    weight: '800',
    size: 68,
    search: '',
    filter: 'all'
  },
  customFonts: [],
  activeTextStyle: 'neon',
  textStyleConfigs: createDefaultTextConfigs(),
  activeTextBgStyle: 'none',
  textBgConfigs: createDefaultTextBgConfigs(),
  textBgBox: {
    padX: 34,
    padY: 18,
    radius: 22,
    opacity: 92
  },
  activeBgStyle: 'liquidGlass',
  bgStyleConfigs: createDefaultBgConfigs(),
  settings: {
    ratio: '1:1',
    width: 1080,
    height: 1080,
    padding: 48,
    edgeMargin: 24,
    vAlign: 'center',
    offsetX: 0,
    offsetY: 0,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: '#00D9FF',
    globalShadow: 0,
    globalOpacity: 100,
    zoom: 100
  },
  exportOpts: {
    scale: 2
  }
};

const RATIOS = {
  '1:1': [1080, 1080],
  '4:5': [1080, 1350],
  '9:16': [1080, 1920],
  '16:9': [1920, 1080]
};

function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

function renderPreview() {
  const canvas = document.getElementById('mainCanvas');
  if (!canvas) return;
  renderComposition(canvas, state, 1);

  const wrapper = document.getElementById('canvasWrapper');
  if (wrapper) {
    const z = (state.settings.zoom || 100) / 100;
    wrapper.style.transform = `scale(${z})`;
  }

  const dimLabel = document.getElementById('previewDimBadge');
  if (dimLabel) {
    dimLabel.textContent = `${state.settings.width} × ${state.settings.height}`;
  }
  updateExportEstimate();
}

function updateExportEstimate() {
  const el = document.getElementById('exportSizeEstimate');
  if (!el) return;
  const w = state.settings.width * state.exportOpts.scale;
  const h = state.settings.height * state.exportOpts.scale;
  const isTransparent = state.activeBgStyle === 'transparent';
  const bpp = isTransparent ? 0.32 : 0.65;
  const approxKb = Math.max(24, Math.round((w * h * bpp) / 1024));
  const label = approxKb > 1024
    ? `~ ${(approxKb / 1024).toFixed(1)} MB`
    : `~ ${approxKb} KB`;
  el.textContent = `${w} × ${h} px • حجم تقریبی: ${label}`;
}

function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      state.activeTab = target;
      buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
      panels.forEach(p => p.classList.toggle('active', p.id === `tab-${target}`));
    });
  });
}

function initTextTab() {
  const textarea = document.getElementById('mainTextInput');
  const charCount = document.getElementById('charCountLabel');
  const lineRange = document.getElementById('textLineHeight');
  const lineVal = document.getElementById('textLineHeightVal');
  const sizeRange = document.getElementById('textSizeQuick');
  const sizeVal = document.getElementById('textSizeQuickVal');
  const alignBtns = document.querySelectorAll('[data-align]');

  const updateCount = () => {
    const val = textarea.value;
    charCount.textContent = `${val.length} کاراکتر • ${val.split('\n').length} خط`;
  };

  textarea.value = state.text.content;
  updateCount();

  textarea.addEventListener('input', () => {
    state.text.content = textarea.value;
    updateCount();
    renderPreview();
  });

  alignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.text.align = btn.dataset.align;
      alignBtns.forEach(b => b.classList.toggle('active', b.dataset.align === state.text.align));
      renderPreview();
    });
  });

  lineRange.value = state.text.lineHeight;
  lineVal.textContent = state.text.lineHeight;
  lineRange.addEventListener('input', () => {
    state.text.lineHeight = Number(lineRange.value);
    lineVal.textContent = state.text.lineHeight.toFixed(2);
    renderPreview();
  });

  sizeRange.value = state.font.size;
  sizeVal.textContent = `${state.font.size}px`;
  sizeRange.addEventListener('input', () => {
    state.font.size = Number(sizeRange.value);
    sizeVal.textContent = `${state.font.size}px`;
    const fontTabSize = document.getElementById('fontTabSize');
    const fontTabSizeVal = document.getElementById('fontTabSizeVal');
    if (fontTabSize) fontTabSize.value = state.font.size;
    if (fontTabSizeVal) fontTabSizeVal.textContent = `${state.font.size}px`;
    renderPreview();
  });
}

function renderFontList() {
  const listEl = document.getElementById('fontListContainer');
  if (!listEl) return;

  const allFonts = [...state.customFonts, ...FONT_LIBRARY];
  const q = state.font.search.trim().toLowerCase();

  const filtered = allFonts.filter(f => {
    const matchQuery = !q || f.name.toLowerCase().includes(q) || f.id.toLowerCase().includes(q);
    let matchCat = true;
    if (state.font.filter === 'fa') matchCat = f.lang === 'fa';
    if (state.font.filter === 'en') matchCat = f.lang === 'en';
    if (state.font.filter === 'display') matchCat = f.cat === 'display';
    if (state.font.filter === 'read') matchCat = f.cat === 'read' || f.cat === 'classic';
    if (state.font.filter === 'custom') matchCat = f.cat === 'custom';
    return matchQuery && matchCat;
  });

  listEl.innerHTML = '';
  if (filtered.length === 0) {
    listEl.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--text-secondary);font-size:0.82rem;padding:18px;">فونتی با این جستجو پیدا نشد.</div>';
    return;
  }

  filtered.forEach(f => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'font-card' + (state.font.id === f.id ? ' active' : '');
    const deleteBadge = f.cat === 'custom'
      ? `<span class="font-del" data-delfont="${f.id}" title="حذف فونت" style="color:#fda4af;font-size:0.75rem;margin-right:6px;">✕</span>`
      : '';
    card.innerHTML = `
      <div class="font-card-top">
        <span class="font-name">${f.name}</span>
        <div style="display:flex;align-items:center;">
          <span class="font-status ${f.fallback ? 'fallback' : ''}">${f.status}</span>
          ${deleteBadge}
        </div>
      </div>
      <div class="font-sample" style="font-family: '${f.family}', 'Vazirmatn', sans-serif; font-weight: ${state.font.weight};">${f.sample}</div>
    `;
    card.addEventListener('click', async (e) => {
      const delBtn = e.target.closest('[data-delfont]');
      if (delBtn) {
        e.stopPropagation();
        const delId = delBtn.dataset.delfont;
        state.customFonts = state.customFonts.filter(cf => cf.id !== delId);
        deleteStoredCustomFont(delId);
        if (state.font.id === delId) state.font.id = 'Vazirmatn';
        renderFontList();
        renderPreview();
        showToast('فونت سفارشی حذف شد');
        return;
      }
      state.font.id = f.id;
      renderFontList();
      await document.fonts.ready;
      renderPreview();
    });
    listEl.appendChild(card);
  });
}

function initFontsTab() {
  const searchInput = document.getElementById('fontSearchInput');
  const catBtns = document.querySelectorAll('[data-fontcat]');
  const weightSelect = document.getElementById('fontWeightSelect');
  const fontTabSize = document.getElementById('fontTabSize');
  const fontTabSizeVal = document.getElementById('fontTabSizeVal');
  const customUpload = document.getElementById('customFontUpload');

  searchInput.addEventListener('input', () => {
    state.font.search = searchInput.value;
    renderFontList();
  });

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.font.filter = btn.dataset.fontcat;
      catBtns.forEach(b => b.classList.toggle('active', b.dataset.fontcat === state.font.filter));
      renderFontList();
    });
  });

  weightSelect.value = state.font.weight;
  weightSelect.addEventListener('change', () => {
    state.font.weight = weightSelect.value;
    renderFontList();
    renderPreview();
  });

  fontTabSize.value = state.font.size;
  fontTabSizeVal.textContent = `${state.font.size}px`;
  fontTabSize.addEventListener('input', () => {
    state.font.size = Number(fontTabSize.value);
    fontTabSizeVal.textContent = `${state.font.size}px`;
    const quick = document.getElementById('textSizeQuick');
    const quickVal = document.getElementById('textSizeQuickVal');
    if (quick) quick.value = state.font.size;
    if (quickVal) quickVal.textContent = `${state.font.size}px`;
    renderPreview();
  });

  customUpload.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const fontObj = await loadCustomFontFile(file);
      state.customFonts.unshift(fontObj);
      state.font.id = fontObj.id;
      renderFontList();
      renderPreview();
      showToast(`فونت «${fontObj.name}» وارد و ذخیره شد`);
    } catch {
      showToast('فرمت فونت معتبر نیست یا بارگذاری نشد');
    }
    customUpload.value = '';
  });

  renderFontList();
}

function renderDynamicControls(containerId, schema, configObj, onChange, emptyMsg) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  if (!schema || schema.length === 0) {
    container.innerHTML = `<div style="font-size:0.8rem;color:var(--text-secondary);">${emptyMsg || 'تنظیمات اضافی ندارد.'}</div>`;
    return;
  }

  schema.forEach(ctrl => {
    const wrap = document.createElement('div');
    wrap.className = 'field-group';

    if (ctrl.type === 'color') {
      wrap.innerHTML = `
        <label class="field-label">${ctrl.label}</label>
        <div class="color-input-wrap">
          <input type="color" value="${configObj[ctrl.key] || '#ffffff'}" />
          <span class="color-hex">${(configObj[ctrl.key] || '#ffffff').toUpperCase()}</span>
        </div>
      `;
      const input = wrap.querySelector('input');
      const hexSpan = wrap.querySelector('.color-hex');
      input.addEventListener('input', () => {
        configObj[ctrl.key] = input.value;
        hexSpan.textContent = input.value.toUpperCase();
        onChange();
      });
    } else if (ctrl.type === 'range') {
      const val = configObj[ctrl.key] ?? ctrl.min;
      wrap.innerHTML = `
        <label class="field-label">${ctrl.label} <strong>${val}${ctrl.unit || ''}</strong></label>
        <input type="range" min="${ctrl.min}" max="${ctrl.max}" value="${val}" />
      `;
      const input = wrap.querySelector('input');
      const strong = wrap.querySelector('strong');
      input.addEventListener('input', () => {
        configObj[ctrl.key] = Number(input.value);
        strong.textContent = `${configObj[ctrl.key]}${ctrl.unit || ''}`;
        onChange();
      });
    }
    container.appendChild(wrap);
  });
}

function initTextStylesTab() {
  const grid = document.getElementById('textStyleGrid');
  grid.innerHTML = '';

  TEXT_STYLES.forEach(styleObj => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'style-tile' + (state.activeTextStyle === styleObj.id ? ' active' : '');
    tile.dataset.styleid = styleObj.id;

    const thumb = document.createElement('canvas');
    thumb.className = 'style-thumb';
    renderTextThumb(thumb, styleObj);

    const lbl = document.createElement('span');
    lbl.className = 'style-label';
    lbl.textContent = styleObj.name;

    tile.appendChild(thumb);
    tile.appendChild(lbl);

    tile.addEventListener('click', () => {
      state.activeTextStyle = styleObj.id;
      grid.querySelectorAll('.style-tile').forEach(t => t.classList.toggle('active', t.dataset.styleid === styleObj.id));
      renderTextStyleControls();
      renderPreview();
    });

    grid.appendChild(tile);
  });

  renderTextStyleControls();
}

function renderTextStyleControls() {
  const styleObj = TEXT_STYLES.find(s => s.id === state.activeTextStyle);
  const title = document.getElementById('activeTextStyleTitle');
  if (title && styleObj) title.textContent = `تنظیمات اختصاصی: ${styleObj.name}`;
  renderDynamicControls(
    'textStyleControlsContainer',
    styleObj?.controls || [],
    state.textStyleConfigs[state.activeTextStyle],
    renderPreview
  );
}

/* Text Background Tab (30 Dynamic Box Styles) */
function initTextBgTab() {
  const grid = document.getElementById('textBgStyleGrid');
  if (!grid) return;
  grid.innerHTML = '';

  TEXT_BG_STYLES.forEach(bgObj => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'style-tile' + (state.activeTextBgStyle === bgObj.id ? ' active' : '');
    tile.dataset.textbgid = bgObj.id;

    const thumb = document.createElement('canvas');
    thumb.className = 'style-thumb';
    renderTextBgThumb(thumb, bgObj);

    const lbl = document.createElement('span');
    lbl.className = 'style-label';
    lbl.textContent = bgObj.name;

    tile.appendChild(thumb);
    tile.appendChild(lbl);

    tile.addEventListener('click', () => {
      state.activeTextBgStyle = bgObj.id;
      grid.querySelectorAll('.style-tile').forEach(t => t.classList.toggle('active', t.dataset.textbgid === bgObj.id));
      renderTextBgControls();
      renderPreview();
    });

    grid.appendChild(tile);
  });

  const bindBoxRange = (id, key, unit = '') => {
    const el = document.getElementById(id);
    const valEl = document.getElementById(id + 'Val');
    if (!el) return;
    el.value = state.textBgBox[key];
    if (valEl) valEl.textContent = `${state.textBgBox[key]}${unit}`;
    el.addEventListener('input', () => {
      state.textBgBox[key] = Number(el.value);
      if (valEl) valEl.textContent = `${state.textBgBox[key]}${unit}`;
      renderPreview();
    });
  };

  bindBoxRange('tbPadX', 'padX', 'px');
  bindBoxRange('tbPadY', 'padY', 'px');
  bindBoxRange('tbRadius', 'radius', 'px');
  bindBoxRange('tbOpacity', 'opacity', '%');

  renderTextBgControls();
}

function renderTextBgControls() {
  const bgObj = TEXT_BG_STYLES.find(b => b.id === state.activeTextBgStyle);
  const title = document.getElementById('activeTextBgTitle');
  if (title && bgObj) title.textContent = `تنظیمات اختصاصی کادر: ${bgObj.name}`;
  renderDynamicControls(
    'textBgControlsContainer',
    bgObj?.controls || [],
    state.textBgConfigs[state.activeTextBgStyle],
    renderPreview,
    'برای فعال‌سازی، یکی از استایل‌های پس‌زمینه متن را انتخاب کنید.'
  );
}

function initBgStylesTab() {
  const grid = document.getElementById('bgStyleGrid');
  grid.innerHTML = '';

  BG_STYLES.forEach(bgObj => {
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'style-tile' + (state.activeBgStyle === bgObj.id ? ' active' : '');
    tile.dataset.bgid = bgObj.id;

    const thumb = document.createElement('canvas');
    thumb.className = 'style-thumb';
    renderBgThumb(thumb, bgObj);

    const lbl = document.createElement('span');
    lbl.className = 'style-label';
    lbl.textContent = bgObj.name;

    tile.appendChild(thumb);
    tile.appendChild(lbl);

    tile.addEventListener('click', () => {
      state.activeBgStyle = bgObj.id;
      grid.querySelectorAll('.style-tile').forEach(t => t.classList.toggle('active', t.dataset.bgid === bgObj.id));
      renderBgStyleControls();
      renderPreview();
    });

    grid.appendChild(tile);
  });

  renderBgStyleControls();
}

function renderBgStyleControls() {
  const bgObj = BG_STYLES.find(b => b.id === state.activeBgStyle);
  const title = document.getElementById('activeBgStyleTitle');
  if (title && bgObj) title.textContent = `تنظیمات پس‌زمینه: ${bgObj.name}`;
  renderDynamicControls(
    'bgStyleControlsContainer',
    bgObj?.controls || [],
    state.bgStyleConfigs[state.activeBgStyle],
    renderPreview,
    'این حالت بدون پس‌زمینه است و خروجی کاملاً شفاف تولید می‌کند.'
  );
}

function initSettingsTab() {
  const ratioBtns = document.querySelectorAll('[data-ratio]');
  const widthInput = document.getElementById('setWidth');
  const heightInput = document.getElementById('setHeight');
  const vAlignBtns = document.querySelectorAll('[data-valign]');
  const zoomRange = document.getElementById('previewZoom');
  const zoomVal = document.getElementById('previewZoomVal');

  const syncDimInputs = () => {
    widthInput.value = state.settings.width;
    heightInput.value = state.settings.height;
    const expW = document.getElementById('exportWidthInput');
    const expH = document.getElementById('exportHeightInput');
    if (expW) expW.value = state.settings.width;
    if (expH) expH.value = state.settings.height;
  };

  ratioBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const r = btn.dataset.ratio;
      state.settings.ratio = r;
      ratioBtns.forEach(b => b.classList.toggle('active', b.dataset.ratio === r));
      if (RATIOS[r]) {
        state.settings.width = RATIOS[r][0];
        state.settings.height = RATIOS[r][1];
        syncDimInputs();
      }
      renderPreview();
    });
  });

  widthInput.addEventListener('input', () => {
    state.settings.width = Math.max(200, Math.min(4096, Number(widthInput.value) || 1080));
    state.settings.ratio = 'custom';
    ratioBtns.forEach(b => b.classList.toggle('active', b.dataset.ratio === 'custom'));
    renderPreview();
  });

  heightInput.addEventListener('input', () => {
    state.settings.height = Math.max(200, Math.min(4096, Number(heightInput.value) || 1080));
    state.settings.ratio = 'custom';
    ratioBtns.forEach(b => b.classList.toggle('active', b.dataset.ratio === 'custom'));
    renderPreview();
  });

  vAlignBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.settings.vAlign = btn.dataset.valign;
      vAlignBtns.forEach(b => b.classList.toggle('active', b.dataset.valign === state.settings.vAlign));
      renderPreview();
    });
  });

  const bindRange = (id, key, unit = '') => {
    const el = document.getElementById(id);
    const valEl = document.getElementById(id + 'Val');
    if (!el) return;
    el.value = state.settings[key];
    if (valEl) valEl.textContent = `${state.settings[key]}${unit}`;
    el.addEventListener('input', () => {
      state.settings[key] = Number(el.value);
      if (valEl) valEl.textContent = `${state.settings[key]}${unit}`;
      renderPreview();
    });
  };

  bindRange('setPadding', 'padding', 'px');
  bindRange('setEdgeMargin', 'edgeMargin', 'px');
  bindRange('setOffsetX', 'offsetX', 'px');
  bindRange('setOffsetY', 'offsetY', 'px');
  bindRange('setRadius', 'borderRadius', 'px');
  bindRange('setBorderWidth', 'borderWidth', 'px');
  bindRange('setGlobalShadow', 'globalShadow', 'px');
  bindRange('setGlobalOpacity', 'globalOpacity', '%');

  const borderCol = document.getElementById('setBorderColor');
  borderCol.value = state.settings.borderColor;
  borderCol.addEventListener('input', () => {
    state.settings.borderColor = borderCol.value;
    renderPreview();
  });

  zoomRange.value = state.settings.zoom;
  zoomVal.textContent = `${state.settings.zoom}%`;
  zoomRange.addEventListener('input', () => {
    state.settings.zoom = Number(zoomRange.value);
    zoomVal.textContent = `${state.settings.zoom}%`;
    renderPreview();
  });

  syncDimInputs();
}

function initExportTab() {
  const scaleBtns = document.querySelectorAll('[data-expscale]');
  const expW = document.getElementById('exportWidthInput');
  const expH = document.getElementById('exportHeightInput');
  const dlBtn = document.getElementById('btnExportDownload');
  const copyBtn = document.getElementById('btnExportCopy');
  const shareBtn = document.getElementById('btnExportShare');

  scaleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.exportOpts.scale = Number(btn.dataset.expscale);
      scaleBtns.forEach(b => b.classList.toggle('active', Number(b.dataset.expscale) === state.exportOpts.scale));
      updateExportEstimate();
    });
  });

  expW.addEventListener('input', () => {
    state.settings.width = Math.max(200, Math.min(4096, Number(expW.value) || 1080));
    document.getElementById('setWidth').value = state.settings.width;
    renderPreview();
  });

  expH.addEventListener('input', () => {
    state.settings.height = Math.max(200, Math.min(4096, Number(expH.value) || 1080));
    document.getElementById('setHeight').value = state.settings.height;
    renderPreview();
  });

  const generateBlob = async () => {
    await document.fonts.ready;
    const offscreen = document.createElement('canvas');
    renderComposition(offscreen, state, state.exportOpts.scale);
    return new Promise(resolve => offscreen.toBlob(resolve, 'image/png'));
  };

  dlBtn.addEventListener('click', async () => {
    const blob = await generateBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `StyleGram-${state.settings.width * state.exportOpts.scale}x${state.settings.height * state.exportOpts.scale}.png`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('فایل PNG با کیفیت بالا دانلود شد');
  });

  copyBtn.addEventListener('click', async () => {
    const blob = await generateBlob();
    if (!blob) return;
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      showToast('تصویر در کلیپ‌بورد کپی شد!');
    } catch {
      showToast('کپی مستقیم در این مرورگر پشتیبانی نمی‌شود؛ از دانلود یا اشتراک استفاده کنید');
    }
  });

  shareBtn.addEventListener('click', async () => {
    const blob = await generateBlob();
    if (!blob) return;
    const file = new File([blob], 'StyleGram.png', { type: 'image/png' });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
      try {
        await navigator.share({ files: [file], title: 'StyleGram Export' });
        showToast('اشتراک‌گذاری انجام شد');
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }
    showToast('Web Share در این مرورگر فعال نیست؛ از دانلود استفاده کنید');
  });
}

function initThemeAndPWA() {
  const themeBtn = document.getElementById('themeToggleBtn');
  themeBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    themeBtn.textContent = state.theme === 'dark' ? '☀️ روشن' : '🌙 تاریک';
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js?v=5').then((reg) => {
        reg.update();
      }).catch(() => {});
    });
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  initThemeAndPWA();
  state.customFonts = await loadStoredCustomFonts();
  initTabs();
  initTextTab();
  initFontsTab();
  initTextStylesTab();
  initTextBgTab();
  initBgStylesTab();
  initSettingsTab();
  initExportTab();

  await document.fonts.ready;
  renderPreview();
});
