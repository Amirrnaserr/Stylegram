export const BG_STYLES = [
  {
    id: 'transparent',
    name: 'شفاف (Transparent)',
    defaults: { exportTransparent: true },
    controls: []
  },
  {
    id: 'solid',
    name: 'تک‌رنگ (Solid Color)',
    defaults: { color: '#011728', opacity: 100 },
    controls: [
      { key: 'color', label: 'انتخاب رنگ', type: 'color' },
      { key: 'opacity', label: 'شفافیت', type: 'range', min: 10, max: 100, unit: '%' }
    ]
  },
  {
    id: 'gradient',
    name: 'گرادیان (Gradient)',
    defaults: { color1: '#011728', color2: '#0B82F6', color3: '#8B35FF', angle: 135, opacity: 100 },
    controls: [
      { key: 'color1', label: 'رنگ اول', type: 'color' },
      { key: 'color2', label: 'رنگ دوم', type: 'color' },
      { key: 'color3', label: 'رنگ سوم', type: 'color' },
      { key: 'angle', label: 'زاویه گرادیان', type: 'range', min: 0, max: 360, unit: '°' },
      { key: 'opacity', label: 'شدت و شفافیت', type: 'range', min: 15, max: 100, unit: '%' }
    ]
  },
  {
    id: 'neonGradient',
    name: 'نئون گرادیان (Neon Gradient)',
    defaults: { color1: '#00D9FF', color2: '#8B35FF', baseDark: '#011728', angle: 125, intensity: 80 },
    controls: [
      { key: 'color1', label: 'نور اول', type: 'color' },
      { key: 'color2', label: 'نور دوم', type: 'color' },
      { key: 'baseDark', label: 'رنگ پایه تیره', type: 'color' },
      { key: 'angle', label: 'زاویه', type: 'range', min: 0, max: 360, unit: '°' },
      { key: 'intensity', label: 'شدت درخشش', type: 'range', min: 20, max: 100, unit: '%' }
    ]
  },
  {
    id: 'liquidGlass',
    name: 'شیشه مایع (Liquid Glass)',
    defaults: { glassColor: '#0B82F6', blur: 32, opacity: 55, highlight: 75, glow: 65 },
    controls: [
      { key: 'glassColor', label: 'رنگ شیشه', type: 'color' },
      { key: 'blur', label: 'شدت Blur', type: 'range', min: 5, max: 60, unit: 'px' },
      { key: 'opacity', label: 'شفافیت', type: 'range', min: 15, max: 95, unit: '%' },
      { key: 'highlight', label: 'انعکاس نور', type: 'range', min: 0, max: 100, unit: '%' },
      { key: 'glow', label: 'میزان درخشش', type: 'range', min: 0, max: 100, unit: '%' }
    ]
  },
  {
    id: 'smoke',
    name: 'دودی (Smoke)',
    defaults: { smokeColor: '#00D9FF', bgBase: '#020B16', intensity: 70, density: 6, blur: 40 },
    controls: [
      { key: 'smokeColor', label: 'رنگ دود', type: 'color' },
      { key: 'bgBase', label: 'رنگ پایه', type: 'color' },
      { key: 'intensity', label: 'شدت دود', type: 'range', min: 20, max: 100, unit: '%' },
      { key: 'density', label: 'تراکم', type: 'range', min: 2, max: 14, unit: '' },
      { key: 'blur', label: 'میزان Blur', type: 'range', min: 10, max: 80, unit: 'px' }
    ]
  },
  {
    id: 'galaxy',
    name: 'کهکشان (Galaxy)',
    defaults: { galaxyColor: '#8B35FF', accentColor: '#00D9FF', starDensity: 95, glowIntensity: 75, blur: 30 },
    controls: [
      { key: 'galaxyColor', label: 'رنگ کهکشان', type: 'color' },
      { key: 'accentColor', label: 'رنگ سحابی', type: 'color' },
      { key: 'starDensity', label: 'تراکم ستاره‌ها', type: 'range', min: 15, max: 220, unit: '' },
      { key: 'glowIntensity', label: 'شدت نور', type: 'range', min: 20, max: 100, unit: '%' },
      { key: 'blur', label: 'میزان Blur سحابی', type: 'range', min: 10, max: 60, unit: 'px' }
    ]
  },
  {
    id: 'abstract',
    name: 'انتزاعی (Abstract)',
    defaults: { color1: '#0B82F6', color2: '#8B35FF', color3: '#00D9FF', shapes: 7 },
    controls: [
      { key: 'color1', label: 'رنگ ۱', type: 'color' },
      { key: 'color2', label: 'رنگ ۲', type: 'color' },
      { key: 'color3', label: 'رنگ ۳', type: 'color' },
      { key: 'shapes', label: 'تعداد فرم‌ها', type: 'range', min: 3, max: 14, unit: '' }
    ]
  },
  {
    id: 'carbonFiber',
    name: 'فیبر کربن (Carbon Fiber)',
    defaults: { baseColor: '#0A111A', weaveContrast: 55, cellSize: 16 },
    controls: [
      { key: 'baseColor', label: 'رنگ پایه کربن', type: 'color' },
      { key: 'weaveContrast', label: 'کنتراست بافت', type: 'range', min: 15, max: 100, unit: '%' },
      { key: 'cellSize', label: 'اندازه بافت', type: 'range', min: 8, max: 32, unit: 'px' }
    ]
  },
  {
    id: 'metallic',
    name: 'فلزی (Metallic)',
    defaults: { metalColor: '#334155', shine: 75, angle: 120 },
    controls: [
      { key: 'metalColor', label: 'رنگ فلز', type: 'color' },
      { key: 'shine', label: 'شدت انعکاس', type: 'range', min: 15, max: 100, unit: '%' },
      { key: 'angle', label: 'زاویه تابش', type: 'range', min: 0, max: 360, unit: '°' }
    ]
  },
  {
    id: 'holographic',
    name: 'هولوگرافیک (Holographic)',
    defaults: { hueShift: 30, intensity: 85, waveScale: 50 },
    controls: [
      { key: 'hueShift', label: 'چرخش طیف', type: 'range', min: 0, max: 360, unit: '°' },
      { key: 'intensity', label: 'شدت رنگ', type: 'range', min: 30, max: 100, unit: '%' },
      { key: 'waveScale', label: 'نرمی موج', type: 'range', min: 20, max: 100, unit: '%' }
    ]
  },
  {
    id: 'marble',
    name: 'مرمر (Marble)',
    defaults: { baseColor: '#0F172A', veinColor: '#38BDF8', veinIntensity: 60 },
    controls: [
      { key: 'baseColor', label: 'رنگ سنگ', type: 'color' },
      { key: 'veinColor', label: 'رنگ رگه‌ها', type: 'color' },
      { key: 'veinIntensity', label: 'وضوح رگه‌ها', type: 'range', min: 15, max: 100, unit: '%' }
    ]
  },
  {
    id: 'noise',
    name: 'بافت نویز (Noise Texture)',
    defaults: { baseColor: '#011728', noiseAmount: 35, grainContrast: 50 },
    controls: [
      { key: 'baseColor', label: 'رنگ پس‌زمینه', type: 'color' },
      { key: 'noiseAmount', label: 'میزان نویز', type: 'range', min: 10, max: 90, unit: '%' },
      { key: 'grainContrast', label: 'کنتراست دانه', type: 'range', min: 10, max: 100, unit: '%' }
    ]
  },
  {
    id: 'geometric',
    name: 'هندسی (Geometric)',
    defaults: { bgColor: '#011728', lineColor: '#00D9FF', gridSize: 42, lineOpacity: 35 },
    controls: [
      { key: 'bgColor', label: 'رنگ زمینه', type: 'color' },
      { key: 'lineColor', label: 'رنگ خطوط هندسی', type: 'color' },
      { key: 'gridSize', label: 'اندازه شبکه', type: 'range', min: 20, max: 90, unit: 'px' },
      { key: 'lineOpacity', label: 'شفافیت خطوط', type: 'range', min: 10, max: 90, unit: '%' }
    ]
  },
  {
    id: 'meshGradient',
    name: 'مش گرادیان (Mesh Gradient)',
    defaults: { c1: '#0B82F6', c2: '#8B35FF', c3: '#00D9FF', c4: '#011728', softness: 85 },
    controls: [
      { key: 'c1', label: 'نقطه ۱', type: 'color' },
      { key: 'c2', label: 'نقطه ۲', type: 'color' },
      { key: 'c3', label: 'نقطه ۳', type: 'color' },
      { key: 'c4', label: 'پس‌زمینه پایه', type: 'color' },
      { key: 'softness', label: 'نرمی ترکیب', type: 'range', min: 30, max: 100, unit: '%' }
    ]
  },
  {
    id: 'aurora',
    name: 'شفق قطبی (Aurora)',
    defaults: { skyColor: '#011728', ribbon1: '#00D9FF', ribbon2: '#8B35FF', ribbon3: '#10B981', glow: 80 },
    controls: [
      { key: 'skyColor', label: 'رنگ آسمان', type: 'color' },
      { key: 'ribbon1', label: 'نوار اول', type: 'color' },
      { key: 'ribbon2', label: 'نوار دوم', type: 'color' },
      { key: 'ribbon3', label: 'نوار سوم', type: 'color' },
      { key: 'glow', label: 'شدت شفق', type: 'range', min: 25, max: 100, unit: '%' }
    ]
  },
  {
    id: 'fire',
    name: 'آتش (Fire)',
    defaults: { darkBase: '#180402', flameColor: '#F97316', emberColor: '#FACC15', intensity: 85 },
    controls: [
      { key: 'darkBase', label: 'رنگ پایه تیره', type: 'color' },
      { key: 'flameColor', label: 'رنگ شعله', type: 'color' },
      { key: 'emberColor', label: 'رنگ جرقه‌ها', type: 'color' },
      { key: 'intensity', label: 'شدت گرما', type: 'range', min: 25, max: 100, unit: '%' }
    ]
  },
  {
    id: 'ice',
    name: 'یخ (Ice)',
    defaults: { deepBlue: '#082F49', frostColor: '#BAE6FD', crystalOpacity: 60 },
    controls: [
      { key: 'deepBlue', label: 'آبی عمقی', type: 'color' },
      { key: 'frostColor', label: 'رنگ بلور یخ', type: 'color' },
      { key: 'crystalOpacity', label: 'تراکم بلورها', type: 'range', min: 15, max: 100, unit: '%' }
    ]
  },
  {
    id: 'paper',
    name: 'کاغذی (Paper Texture)',
    defaults: { paperColor: '#EFEFEF', fiberOpacity: 35, vignette: 30 },
    controls: [
      { key: 'paperColor', label: 'رنگ کاغذ', type: 'color' },
      { key: 'fiberOpacity', label: 'شدت بافت کاغذ', type: 'range', min: 5, max: 85, unit: '%' },
      { key: 'vignette', label: 'سایه حاشیه', type: 'range', min: 0, max: 80, unit: '%' }
    ]
  },
  {
    id: 'colorSplash',
    name: 'پاشش رنگ (Color Splash)',
    defaults: { bgColor: '#011728', splash1: '#00D9FF', splash2: '#8B35FF', splashCount: 14 },
    controls: [
      { key: 'bgColor', label: 'پس‌زمینه', type: 'color' },
      { key: 'splash1', label: 'رنگ پاشش ۱', type: 'color' },
      { key: 'splash2', label: 'رنگ پاشش ۲', type: 'color' },
      { key: 'splashCount', label: 'تعداد لکه‌ها', type: 'range', min: 5, max: 30, unit: '' }
    ]
  },
  {
    id: 'darkLuxury',
    name: 'لوکس تیره (Dark Luxury)',
    defaults: { obsidian: '#011728', goldAccent: '#D97706', sheen: 55 },
    controls: [
      { key: 'obsidian', label: 'رنگ مشکی عمیق', type: 'color' },
      { key: 'goldAccent', label: 'رنگ طلایی حاشیه', type: 'color' },
      { key: 'sheen', label: 'درخشش طلایی', type: 'range', min: 15, max: 100, unit: '%' }
    ]
  },
  {
    id: 'cyberpunk',
    name: 'سایبرپانک (Cyberpunk)',
    defaults: { nightColor: '#050816', neonPink: '#FF007F', neonCyan: '#00D9FF', gridOpacity: 45 },
    controls: [
      { key: 'nightColor', label: 'رنگ شب', type: 'color' },
      { key: 'neonPink', label: 'نئون صورتی', type: 'color' },
      { key: 'neonCyan', label: 'نئون فیروزه‌ای', type: 'color' },
      { key: 'gridOpacity', label: 'شدت شبکه پرسپکتیو', type: 'range', min: 10, max: 95, unit: '%' }
    ]
  },
  {
    id: 'bokeh',
    name: 'بوکه (Bokeh)',
    defaults: { baseColor: '#011728', light1: '#00D9FF', light2: '#8B35FF', orbCount: 18, orbBlur: 24 },
    controls: [
      { key: 'baseColor', label: 'رنگ زمینه', type: 'color' },
      { key: 'light1', label: 'نور اول', type: 'color' },
      { key: 'light2', label: 'نور دوم', type: 'color' },
      { key: 'orbCount', label: 'تعداد دایره‌ها', type: 'range', min: 6, max: 40, unit: '' },
      { key: 'orbBlur', label: 'نرمی بوکه', type: 'range', min: 6, max: 50, unit: 'px' }
    ]
  },
  {
    id: 'checkerboard',
    name: 'شطرنجی (Checkerboard)',
    defaults: { color1: '#011728', color2: '#0B2D48', tileSize: 36 },
    controls: [
      { key: 'color1', label: 'رنگ خانه اول', type: 'color' },
      { key: 'color2', label: 'رنگ خانه دوم', type: 'color' },
      { key: 'tileSize', label: 'اندازه خانه‌ها', type: 'range', min: 14, max: 80, unit: 'px' }
    ]
  }
];

export const TEXT_BG_EXTRA_STYLES = [
  {
    id: 'pillGlow',
    name: 'کپسول نئونی (Neon Pill)',
    defaults: { fillColor: '#011728', borderColor: '#00D9FF', glowBlur: 22, borderWidth: 3 },
    controls: [
      { key: 'fillColor', label: 'رنگ داخل کپسول', type: 'color' },
      { key: 'borderColor', label: 'رنگ نور حاشیه', type: 'color' },
      { key: 'glowBlur', label: 'شدت نور', type: 'range', min: 4, max: 50, unit: 'px' },
      { key: 'borderWidth', label: 'ضخامت حاشیه', type: 'range', min: 1, max: 10, unit: 'px' }
    ]
  },
  {
    id: 'frostedBadge',
    name: 'بج شیشه‌ای (Frosted Badge)',
    defaults: { tintColor: '#0B82F6', edgeColor: '#FFFFFF', opacity: 55, highlight: 70 },
    controls: [
      { key: 'tintColor', label: 'رنگ شیشه', type: 'color' },
      { key: 'edgeColor', label: 'رنگ لبه نورانی', type: 'color' },
      { key: 'opacity', label: 'شفافیت شیشه', type: 'range', min: 15, max: 95, unit: '%' },
      { key: 'highlight', label: 'انعکاس بالا', type: 'range', min: 0, max: 100, unit: '%' }
    ]
  },
  {
    id: 'ribbon',
    name: 'روبان کج (Ribbon Banner)',
    defaults: { color1: '#0B82F6', color2: '#8B35FF', skew: 12 },
    controls: [
      { key: 'color1', label: 'رنگ اول روبان', type: 'color' },
      { key: 'color2', label: 'رنگ دوم روبان', type: 'color' },
      { key: 'skew', label: 'زاویه کجی', type: 'range', min: -25, max: 25, unit: '°' }
    ]
  },
  {
    id: 'highlightMarker',
    name: 'هایلایت ماژیکی (Marker)',
    defaults: { markerColor: '#8B35FF', opacity: 85, tilt: -2 },
    controls: [
      { key: 'markerColor', label: 'رنگ ماژیک', type: 'color' },
      { key: 'opacity', label: 'شفافیت جوهر', type: 'range', min: 25, max: 100, unit: '%' },
      { key: 'tilt', label: 'شیب ماژیک', type: 'range', min: -8, max: 8, unit: '°' }
    ]
  },
  {
    id: 'tape',
    name: 'نوار چسب استوری (Story Tape)',
    defaults: { tapeColor: '#FDE047', opacity: 82, angle: -2 },
    controls: [
      { key: 'tapeColor', label: 'رنگ نوار چسب', type: 'color' },
      { key: 'opacity', label: 'شفافیت چسب', type: 'range', min: 30, max: 100, unit: '%' },
      { key: 'angle', label: 'زاویه چسب', type: 'range', min: -10, max: 10, unit: '°' }
    ]
  },
  {
    id: 'brackets',
    name: 'قاب گوشه‌دار (Corner Frame)',
    defaults: { fillColor: '#011728', cornerColor: '#00D9FF', thickness: 4, cornerLen: 26 },
    controls: [
      { key: 'fillColor', label: 'رنگ پس‌زمینه داخل', type: 'color' },
      { key: 'cornerColor', label: 'رنگ گوشه‌ها', type: 'color' },
      { key: 'thickness', label: 'ضخامت خطوط', type: 'range', min: 2, max: 12, unit: 'px' },
      { key: 'cornerLen', label: 'طول گوشه‌ها', type: 'range', min: 10, max: 60, unit: 'px' }
    ]
  }
];

export const TEXT_BG_STYLES = [
  {
    id: 'none',
    name: 'بدون کادر (غیرفعال)',
    defaults: {},
    controls: []
  },
  ...BG_STYLES.filter(b => b.id !== 'transparent'),
  ...TEXT_BG_EXTRA_STYLES
];

export function createDefaultBgConfigs() {
  const map = {};
  for (const b of BG_STYLES) {
    map[b.id] = { ...b.defaults };
  }
  return map;
}

export function createDefaultTextBgConfigs() {
  const map = {};
  for (const b of TEXT_BG_STYLES) {
    map[b.id] = { ...b.defaults };
  }
  return map;
}
