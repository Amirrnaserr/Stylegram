export const TEXT_STYLES = [
  {
    id: 'minimal',
    name: 'مینیمال (Minimal)',
    defaults: { textColor: '#EFEFEF', opacity: 100, letterSpacing: 0 },
    controls: [
      { key: 'textColor', label: 'رنگ متن', type: 'color' },
      { key: 'opacity', label: 'شفافیت', type: 'range', min: 20, max: 100, unit: '%' }
    ]
  },
  {
    id: 'neon',
    name: 'نئون (Neon)',
    defaults: { textColor: '#FFFFFF', glowColor: '#00D9FF', glowIntensity: 85, glowRadius: 28, strokeWidth: 2 },
    controls: [
      { key: 'glowColor', label: 'رنگ نور', type: 'color' },
      { key: 'textColor', label: 'رنگ هسته متن', type: 'color' },
      { key: 'glowIntensity', label: 'شدت Glow', type: 'range', min: 10, max: 100, unit: '%' },
      { key: 'glowRadius', label: 'شعاع نور', type: 'range', min: 4, max: 60, unit: 'px' },
      { key: 'strokeWidth', label: 'ضخامت حاشیه', type: 'range', min: 0, max: 8, unit: 'px' }
    ]
  },
  {
    id: '3d',
    name: 'سه‌بعدی (3D)',
    defaults: { faceColor: '#EFEFEF', depthColor: '#0B82F6', depth: 10, angle: 135, shadowDir: 1 },
    controls: [
      { key: 'faceColor', label: 'رنگ رویه متن', type: 'color' },
      { key: 'depthColor', label: 'رنگ لایه‌های عمقی', type: 'color' },
      { key: 'depth', label: 'عمق سه‌بعدی', type: 'range', min: 2, max: 24, unit: 'px' },
      { key: 'angle', label: 'زاویه نور', type: 'range', min: 0, max: 360, unit: '°' }
    ]
  },
  {
    id: 'chrome',
    name: 'کروم (Chrome)',
    defaults: { metalTint: '#B8D4F5', reflection: 80, brightness: 105, shine: 70 },
    controls: [
      { key: 'metalTint', label: 'رنگ فلز', type: 'color' },
      { key: 'reflection', label: 'میزان انعکاس', type: 'range', min: 20, max: 100, unit: '%' },
      { key: 'brightness', label: 'روشنایی', type: 'range', min: 60, max: 140, unit: '%' },
      { key: 'shine', label: 'شدت درخشش', type: 'range', min: 0, max: 100, unit: '%' }
    ]
  },
  {
    id: 'gold',
    name: 'طلایی (Gold)',
    defaults: { goldTone: '#FBBF24', gloss: 85, bevel: 4, shadowStrength: 60 },
    controls: [
      { key: 'goldTone', label: 'طیف رنگ طلایی', type: 'color' },
      { key: 'gloss', label: 'میزان براقیت', type: 'range', min: 20, max: 100, unit: '%' },
      { key: 'bevel', label: 'شدت برجستگی', type: 'range', min: 0, max: 10, unit: 'px' },
      { key: 'shadowStrength', label: 'سایه', type: 'range', min: 0, max: 100, unit: '%' }
    ]
  },
  {
    id: 'silver',
    name: 'نقره‌ای (Silver)',
    defaults: { silverTint: '#E2E8F0', gloss: 78, bevel: 3, shadowStrength: 50 },
    controls: [
      { key: 'silverTint', label: 'طیف نقره‌ای', type: 'color' },
      { key: 'gloss', label: 'براقیت', type: 'range', min: 20, max: 100, unit: '%' },
      { key: 'bevel', label: 'برجستگی لبه', type: 'range', min: 0, max: 10, unit: 'px' },
      { key: 'shadowStrength', label: 'شدت سایه', type: 'range', min: 0, max: 100, unit: '%' }
    ]
  },
  {
    id: 'glass',
    name: 'شیشه‌ای (Glass)',
    defaults: { glassTint: '#FFFFFF', opacity: 45, blur: 10, highlight: 80 },
    controls: [
      { key: 'glassTint', label: 'رنگ شیشه', type: 'color' },
      { key: 'opacity', label: 'میزان شفافیت', type: 'range', min: 15, max: 90, unit: '%' },
      { key: 'blur', label: 'Blur نور لبه', type: 'range', min: 0, max: 25, unit: 'px' },
      { key: 'highlight', label: 'انعکاس نور', type: 'range', min: 10, max: 100, unit: '%' }
    ]
  },
  {
    id: 'gradient',
    name: 'گرادیان (Gradient)',
    defaults: { color1: '#00D9FF', color2: '#8B35FF', angle: 120, shadowBlur: 12 },
    controls: [
      { key: 'color1', label: 'رنگ اول', type: 'color' },
      { key: 'color2', label: 'رنگ دوم', type: 'color' },
      { key: 'angle', label: 'زاویه گرادیان', type: 'range', min: 0, max: 360, unit: '°' },
      { key: 'shadowBlur', label: 'نرمی سایه', type: 'range', min: 0, max: 35, unit: 'px' }
    ]
  },
  {
    id: 'shadow',
    name: 'سایه‌دار (Shadow)',
    defaults: { textColor: '#EFEFEF', shadowColor: '#000000', shadowBlur: 22, offsetX: 0, offsetY: 10 },
    controls: [
      { key: 'textColor', label: 'رنگ متن', type: 'color' },
      { key: 'shadowColor', label: 'رنگ سایه', type: 'color' },
      { key: 'shadowBlur', label: 'پخش سایه', type: 'range', min: 0, max: 50, unit: 'px' },
      { key: 'offsetY', label: 'فاصله عمودی', type: 'range', min: -25, max: 35, unit: 'px' }
    ]
  },
  {
    id: 'outline',
    name: 'دورخط (Outline)',
    defaults: { strokeColor: '#00D9FF', strokeWidth: 3, fillOpacity: 0, glow: 8 },
    controls: [
      { key: 'strokeColor', label: 'رنگ دورخط', type: 'color' },
      { key: 'strokeWidth', label: 'ضخامت خط', type: 'range', min: 1, max: 12, unit: 'px' },
      { key: 'fillOpacity', label: 'شفافیت داخل متن', type: 'range', min: 0, max: 100, unit: '%' },
      { key: 'glow', label: 'نور لبه', type: 'range', min: 0, max: 30, unit: 'px' }
    ]
  },
  {
    id: 'glow',
    name: 'درخشان (Glow)',
    defaults: { textColor: '#FFFFFF', glowColor: '#8B35FF', glowRadius: 34, intensity: 90 },
    controls: [
      { key: 'textColor', label: 'رنگ متن', type: 'color' },
      { key: 'glowColor', label: 'رنگ هاله', type: 'color' },
      { key: 'glowRadius', label: 'شعاع هاله', type: 'range', min: 6, max: 65, unit: 'px' },
      { key: 'intensity', label: 'شدت درخشش', type: 'range', min: 20, max: 100, unit: '%' }
    ]
  },
  {
    id: 'retro',
    name: 'رترو (Retro)',
    defaults: { topColor: '#FDE047', bottomColor: '#F97316', shadowColor: '#7C2D12', offset: 6 },
    controls: [
      { key: 'topColor', label: 'رنگ بالا', type: 'color' },
      { key: 'bottomColor', label: 'رنگ پایین', type: 'color' },
      { key: 'shadowColor', label: 'رنگ سایه رترو', type: 'color' },
      { key: 'offset', label: 'ضخامت سایه', type: 'range', min: 2, max: 16, unit: 'px' }
    ]
  },
  {
    id: 'glitch',
    name: 'گلیچ (Glitch)',
    defaults: { textColor: '#FFFFFF', redChannel: '#FF0055', cyanChannel: '#00D9FF', intensity: 65, shift: 5 },
    controls: [
      { key: 'textColor', label: 'رنگ اصلی', type: 'color' },
      { key: 'redChannel', label: 'کانال قرمز', type: 'color' },
      { key: 'cyanChannel', label: 'کانال فیروزه‌ای', type: 'color' },
      { key: 'intensity', label: 'شدت اختلال', type: 'range', min: 10, max: 100, unit: '%' },
      { key: 'shift', label: 'میزان جابه‌جایی', type: 'range', min: 1, max: 16, unit: 'px' }
    ]
  },
  {
    id: 'graffiti',
    name: 'گرافیتی (Graffiti)',
    defaults: { fillColor: '#22D3EE', fillColor2: '#A855F7', outlineColor: '#011728', strokeWidth: 7, dropDepth: 7 },
    controls: [
      { key: 'fillColor', label: 'رنگ اول', type: 'color' },
      { key: 'fillColor2', label: 'رنگ دوم', type: 'color' },
      { key: 'outlineColor', label: 'رنگ حاشیه', type: 'color' },
      { key: 'strokeWidth', label: 'ضخامت حاشیه', type: 'range', min: 2, max: 16, unit: 'px' },
      { key: 'dropDepth', label: 'عمق سایه', type: 'range', min: 2, max: 16, unit: 'px' }
    ]
  },
  {
    id: 'cyberpunk',
    name: 'سایبرپانک (Cyberpunk)',
    defaults: { faceColor: '#FCEE0A', accentColor: '#00D9FF', neonEdge: '#FF007F', glow: 24 },
    controls: [
      { key: 'faceColor', label: 'رنگ زرد سایبری', type: 'color' },
      { key: 'accentColor', label: 'رنگ فیروزه‌ای', type: 'color' },
      { key: 'neonEdge', label: 'رنگ لبه نئون', type: 'color' },
      { key: 'glow', label: 'شدت نور', type: 'range', min: 4, max: 45, unit: 'px' }
    ]
  },
  {
    id: 'metallic',
    name: 'متالیک (Metallic)',
    defaults: { baseColor: '#64748B', highlightColor: '#F8FAFC', bevel: 3, contrast: 80 },
    controls: [
      { key: 'baseColor', label: 'رنگ پایه فلز', type: 'color' },
      { key: 'highlightColor', label: 'رنگ انعکاس', type: 'color' },
      { key: 'bevel', label: 'لبه فلزی', type: 'range', min: 0, max: 8, unit: 'px' },
      { key: 'contrast', label: 'کنتراست', type: 'range', min: 20, max: 100, unit: '%' }
    ]
  },
  {
    id: 'holographic',
    name: 'هولوگرافیک (Holographic)',
    defaults: { shift: 45, saturation: 90, glow: 18, outline: 2 },
    controls: [
      { key: 'shift', label: 'طیف رنگین‌کمانی', type: 'range', min: 0, max: 360, unit: '°' },
      { key: 'saturation', label: 'اشباع رنگ', type: 'range', min: 40, max: 100, unit: '%' },
      { key: 'glow', label: 'درخشش هولوگرام', type: 'range', min: 0, max: 40, unit: 'px' },
      { key: 'outline', label: 'حاشیه نورانی', type: 'range', min: 0, max: 6, unit: 'px' }
    ]
  },
  {
    id: 'vintage',
    name: 'وینتیج (Vintage)',
    defaults: { creamColor: '#F5E6C8', shadowColor: '#5C4033', grain: 50, depth: 5 },
    controls: [
      { key: 'creamColor', label: 'رنگ کرم کلاسیک', type: 'color' },
      { key: 'shadowColor', label: 'رنگ سایه قهوه‌ای', type: 'color' },
      { key: 'depth', label: 'عمق کلاسیک', type: 'range', min: 1, max: 12, unit: 'px' },
      { key: 'grain', label: 'شدت بافت قدیمی', type: 'range', min: 0, max: 100, unit: '%' }
    ]
  },
  {
    id: 'fire',
    name: 'آتشین (Fire)',
    defaults: { coreColor: '#FEF08A', midColor: '#F97316', edgeColor: '#DC2626', flameGlow: 28 },
    controls: [
      { key: 'coreColor', label: 'هسته زرد', type: 'color' },
      { key: 'midColor', label: 'شعله نارنجی', type: 'color' },
      { key: 'edgeColor', label: 'لبه قرمز', type: 'color' },
      { key: 'flameGlow', label: 'شدت گرمای نور', type: 'range', min: 6, max: 50, unit: 'px' }
    ]
  },
  {
    id: 'ice',
    name: 'یخی (Ice)',
    defaults: { iceCore: '#F0F9FF', frostColor: '#38BDF8', deepIce: '#0369A1', frostGlow: 22 },
    controls: [
      { key: 'iceCore', label: 'رنگ یخ سفید', type: 'color' },
      { key: 'frostColor', label: 'یخ فیروزه‌ای', type: 'color' },
      { key: 'deepIce', label: 'سایه عمق یخ', type: 'color' },
      { key: 'frostGlow', label: 'درخشش برفی', type: 'range', min: 4, max: 45, unit: 'px' }
    ]
  },
  {
    id: 'cartoon',
    name: 'کارتونی (Cartoon)',
    defaults: { fillColor: '#FACC15', borderColor: '#000000', borderWidth: 6, popShadow: 7 },
    controls: [
      { key: 'fillColor', label: 'رنگ داخل', type: 'color' },
      { key: 'borderColor', label: 'رنگ کادر', type: 'color' },
      { key: 'borderWidth', label: 'ضخامت کادر', type: 'range', min: 2, max: 14, unit: 'px' },
      { key: 'popShadow', label: 'سایه برجسته', type: 'range', min: 2, max: 16, unit: 'px' }
    ]
  },
  {
    id: 'bold',
    name: 'ضخیم مدرن (Bold)',
    defaults: { textColor: '#FFFFFF', shadowColor: '#0B82F6', shadowOffset: 5, strokeWidth: 2 },
    controls: [
      { key: 'textColor', label: 'رنگ متن', type: 'color' },
      { key: 'shadowColor', label: 'رنگ سایه', type: 'color' },
      { key: 'shadowOffset', label: 'عمق سایه', type: 'range', min: 0, max: 14, unit: 'px' },
      { key: 'strokeWidth', label: 'تقویت ضخامت', type: 'range', min: 0, max: 8, unit: 'px' }
    ]
  },
  {
    id: 'luxury',
    name: 'لوکس (Luxury)',
    defaults: { goldColor: '#EAB308', accentColor: '#FEF3C7', shadowBlur: 24, shine: 85 },
    controls: [
      { key: 'goldColor', label: 'رنگ طلایی', type: 'color' },
      { key: 'accentColor', label: 'رنگ درخشش', type: 'color' },
      { key: 'shadowBlur', label: 'عمق سایه نرم', type: 'range', min: 4, max: 45, unit: 'px' },
      { key: 'shine', label: 'براقیت لوکس', type: 'range', min: 20, max: 100, unit: '%' }
    ]
  },
  {
    id: 'doubleStroke',
    name: 'دوبل خط (Double Stroke)',
    defaults: { fillColor: '#FFFFFF', innerStroke: '#011728', outerStroke: '#00D9FF', innerWidth: 5, outerWidth: 11 },
    controls: [
      { key: 'fillColor', label: 'رنگ متن', type: 'color' },
      { key: 'innerStroke', label: 'رنگ خط اول', type: 'color' },
      { key: 'outerStroke', label: 'رنگ خط دوم', type: 'color' },
      { key: 'innerWidth', label: 'ضخامت خط اول', type: 'range', min: 2, max: 12, unit: 'px' },
      { key: 'outerWidth', label: 'ضخامت خط دوم', type: 'range', min: 5, max: 22, unit: 'px' }
    ]
  }
];

export function createDefaultTextConfigs() {
  const map = {};
  for (const s of TEXT_STYLES) {
    map[s.id] = { ...s.defaults };
  }
  return map;
}
