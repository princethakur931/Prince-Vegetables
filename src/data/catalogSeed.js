// All images are served from Cloudinary — no local asset imports needed.
// Cloud: dldi9hkkf | Public IDs fetched via Admin API
const CLD = 'https://res.cloudinary.com/dldi9hkkf/image/upload';
const IMG = (pid) => `${CLD}/f_auto,q_auto,w_600/${pid}`;
const BNR = (pid) => `${CLD}/f_auto,q_auto,w_1400/${pid}`;

const BANNER_LIBRARY = {
  banner1: BNR('banner1_yssz4y'),
  banner2: BNR('banner2_m3qlb5')
};

export const SECTION_ORDER = [
  'daily-essentials',
  'leafy-greens',
  'root-vegetables',
  'fruit-vegetables',
  'beans-and-peas',
  'salad-picks'
];

export const SECTION_META = {
  'daily-essentials': {
    title: 'Daily Essentials',
    subtitle: 'Most ordered vegetables for everyday cooking.',
    unit: 'fresh, 1 kg',
    items: [
      'Potato (Aloo)',
      'Onion (Pyaaz)',
      'Tomato (Tamatar)',
      'Green Chilli (Hari Mirch)',
      'Ginger (Adrak)',
      'Garlic (Lahsun)',
      'Coriander Leaves (Dhaniya Patta)',
      'Lemon (Nimbu)',
      'Spinach (Palak)',
      'Cabbage (Patta Gobhi)',
      'Cauliflower (Phool Gobhi)',
      'Brinjal (Baingan)',
      'Capsicum (Shimla Mirch)',
      'Okra (Bhindi)'
    ]
  },
  'leafy-greens': {
    title: 'Leafy Greens',
    subtitle: 'Healthy, fresh and nutrient-rich green picks.',
    unit: 'fresh bunch, 250 g',
    items: [
      'Spinach (Palak)',
      'Fenugreek Leaves (Methi)',
      'Mustard Greens (Sarson)',
      'Mint Leaves (Pudina)',
      'Coriander Leaves (Dhaniya Patta)',
      'Amaranth Leaves (Chaulai)',
      'Bathua (Bathua)',
      'Dill Leaves (Suva / Shepu)',
      'Radish Leaves (Mooli ke Patte)',
      'Lettuce (Salad Patta)'
    ]
  },
  'root-vegetables': {
    title: 'Root Vegetables',
    subtitle: 'Fresh roots and underground staples.',
    unit: 'farm fresh, 1 kg',
    items: [
      'Carrot (Gajar)',
      'Radish (Mooli)',
      'Beetroot (Chukandar)',
      'Turnip (Shalgam)',
      'Sweet Potato (Shakarkand)',
      'Potato (Aloo)',
      'Onion (Pyaaz)',
      'Garlic (Lahsun)',
      'Ginger (Adrak)',
      'Turmeric Root (Kacchi Haldi)',
      'Arbi / Taro Root (Arbi)',
      'Yam (Suran / Jimikand)'
    ]
  },
  'fruit-vegetables': {
    title: 'Fruit Vegetables',
    subtitle: 'Most important category for daily recipes.',
    unit: 'sorted, 1 kg',
    items: [
      'Brinjal (Baingan)',
      'Capsicum (Shimla Mirch)',
      'Tomato (Tamatar)',
      'Green Chilli (Hari Mirch)',
      'Cucumber (Kheera)',
      'Bottle Gourd (Lauki)',
      'Ridge Gourd (Turai)',
      'Sponge Gourd (Nenua / Gilki)',
      'Bitter Gourd (Karela)',
      'Pumpkin (Kaddu)',
      'Ash Gourd (Petha)',
      'Raw Banana (Kacha Kela)',
      'Raw Papaya (Kaccha Papita)',
      'Okra (Bhindi)',
      'Ivy Gourd (Kundru / Tindora)',
      'Pointed Gourd (Parwal)',
      'Round Gourd (Tinda)'
    ]
  },
  'beans-and-peas': {
    title: 'Beans & Peas',
    subtitle: 'Tender pods and protein-rich green legumes.',
    unit: 'fresh pack, 500 g',
    items: [
      'Green Peas (Matar)',
      'French Beans (French Beans / Farasbi)',
      'Cluster Beans (Gawar Phali)',
      'Broad Beans (Sem Phali)',
      'Long Beans (Lambi Phali / Barbati)',
      'Cowpeas (Lobia)',
      'Field Beans (Papdi / Valor)'
    ]
  },
  'salad-picks': {
    title: 'Salad Picks',
    subtitle: 'Quick-order section highlighted for fresh salads.',
    unit: 'salad grade, 500 g',
    items: [
      'Cucumber (Kheera)',
      'Tomato (Tamatar)',
      'Onion (Pyaaz)',
      'Carrot (Gajar)',
      'Beetroot (Chukandar)',
      'Radish (Mooli)',
      'Lettuce (Salad Patta)',
      'Cabbage (Patta Gobhi)',
      'Capsicum (Shimla Mirch)',
      'Lemon (Nimbu)'
    ]
  }
};

export const DEFAULT_DAILY_BESTSELLERS = [
  'Potato (Aloo)',
  'Onion (Pyaaz)',
  'Tomato (Tamatar)',
  'Green Chilli (Hari Mirch)',
  'Ginger (Adrak)',
  'Garlic (Lahsun)',
  'Coriander Leaves (Dhaniya Patta)',
  'Lemon (Nimbu)'
];

export const DEFAULT_AD_BANNERS = ['banner:banner1', 'banner:banner2'];

export const IMAGE_LIBRARY = {
  carrot:      IMG('fresh_carrot_1775370917174_eg6x9s'),
  capsicum:    IMG('fresh_capsicum_1775370933456_szpj1t'),
  potato:      IMG('potato_a3meiu'),
  tomato:      IMG('tomato_ngbkxn'),
  chili:       IMG('green_chili_ypo1li'),
  ginger:      IMG('Ginger_f5jsrv'),
  garlic:      IMG('Garlic_bulbs_with_seasoning_and_parsley_gpyd3d'),
  lemon:       IMG('Bright_lemon_on_green_backdrop_zj65or'),
  coriander:   IMG('Fresh_bunch_of_cilantro_on_green_background_yloxwb'),
  cabbage:     IMG('Fresh_green_cabbage_on_wood_vnzn4l'),
  cauliflower: IMG('Fresh_cauliflower_on_rustic_wood_uc340r'),
  palak:       IMG('Fresh_desi_palak_on_burlap_cloth_idhirs'),
  okra:        IMG('Fresh_okra_with_star-shaped_seeds_b0tpnw'),
  brinjal:     IMG('Fresh_eggplant_on_soft_purple_background_ywae4b'),
  onion:       IMG('Fresh_red_onion_and_sliced_beauty_mzdhgq'),
  beetroot:    IMG('prince_vegetables/oatq9phkpee4nx4a78dz'),
  peas:        IMG('Fresh_green_peas_on_wooden_surface_ovtwi2'),
  lettuce:     IMG('Fresh_green_lettuce_on_wooden_surface_qfj8dh'),
  beans:       IMG('Fresh_green_beans_on_beige_surface_sgfzgm'),
  gawarBeans:  IMG('Fresh_green_beans_on_slate_background_cnw3nx'),
  cucumber:    IMG('Fresh_cucumber_with_slices_on_green_y3opwb'),
  radish:      IMG('Fresh_daikon_radish_and_slices_alhcwx')
};

// ASSET_FILE_LIBRARY: backward-compat for old MongoDB refs that stored filename strings.
const ASSET_FILE_LIBRARY = {
  'fresh_carrot_1775370917174.png':                      IMAGE_LIBRARY.carrot,
  'fresh_capsicum_1775370933456.png':                    IMAGE_LIBRARY.capsicum,
  'potato.png':                                          IMAGE_LIBRARY.potato,
  'tomato.png':                                          IMAGE_LIBRARY.tomato,
  'green chili.png':                                     IMAGE_LIBRARY.chili,
  'ginger.png':                                          IMAGE_LIBRARY.ginger,
  'garlic bulbs with seasoning and parsley.png':         IMAGE_LIBRARY.garlic,
  'bright lemon on green backdrop.png':                  IMAGE_LIBRARY.lemon,
  'fresh bunch of cilantro on green background.png':     IMAGE_LIBRARY.coriander,
  'fresh green cabbage on wood.png':                     IMAGE_LIBRARY.cabbage,
  'fresh cauliflower on rustic wood.png':                IMAGE_LIBRARY.cauliflower,
  'fresh desi palak on burlap cloth.png':                IMAGE_LIBRARY.palak,
  'fresh okra with star-shaped seeds.png':               IMAGE_LIBRARY.okra,
  'fresh eggplant on soft purple background.png':        IMAGE_LIBRARY.brinjal,
  'fresh red onion and sliced beauty.png':               IMAGE_LIBRARY.onion,
  'vibrant beetroot against soft pink backdrop.png':     IMAGE_LIBRARY.beetroot,
  'fresh green peas on wooden surface.png':              IMAGE_LIBRARY.peas,
  'fresh green lettuce on wooden surface.png':           IMAGE_LIBRARY.lettuce,
  'fresh green beans on beige surface.png':              IMAGE_LIBRARY.beans,
  'fresh green beans on slate background.png':           IMAGE_LIBRARY.gawarBeans,
  'fresh cucumber with slices on green.png':             IMAGE_LIBRARY.cucumber,
  'fresh daikon radish and slices.png':                  IMAGE_LIBRARY.radish,
  'banner1.png':                                         BANNER_LIBRARY.banner1,
  'banner2.png':                                         BANNER_LIBRARY.banner2
};


const normalizeAssetPath = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  const normalized = value.trim();

  if (!normalized) {
    return '';
  }

  return normalized
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\.?\/?src\/assets\//i, '')
    .replace(/^\/?assets\//i, '')
    .trim();
};

const resolveKnownAsset = (value) => {
  const assetPath = normalizeAssetPath(value);

  if (!assetPath) {
    return null;
  }

  const fileName = assetPath.split('/').pop() ?? '';
  const key = decodeURIComponent(fileName.split('?')[0].split('#')[0]).toLowerCase();
  if (ASSET_FILE_LIBRARY[key]) {
    return ASSET_FILE_LIBRARY[key];
  }

  // Support Vite hashed assets like banner1-ABC123xy.png persisted in remote catalog.
  const dehashedKey = key.replace(/-[a-z0-9_]{6,}(?=\.[a-z0-9]+$)/i, '');
  return ASSET_FILE_LIBRARY[dehashedKey] ?? null;
};

const isCloudinaryUrl = (value) =>
  typeof value === 'string' && value.includes('res.cloudinary.com');

const isExternalOrInlineImage = (value) =>
  /^data:image\//i.test(value) ||
  /^blob:/i.test(value) ||
  /^https?:\/\//i.test(value) ||
  /^\/assets\//i.test(value) ||
  /^assets\//i.test(value);

export const normalizeBannerRef = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return '';
  }

  if (trimmed.startsWith('banner:')) {
    return BANNER_LIBRARY[trimmed.replace('banner:', '')] ? trimmed : '';
  }

  const knownAsset = resolveKnownAsset(trimmed);

  if (knownAsset === BANNER_LIBRARY.banner1) {
    return 'banner:banner1';
  }

  if (knownAsset === BANNER_LIBRARY.banner2) {
    return 'banner:banner2';
  }

  const bareName = trimmed.toLowerCase();

  if (bareName === 'banner1' || bareName === 'banner1.png') {
    return 'banner:banner1';
  }

  if (bareName === 'banner2' || bareName === 'banner2.png') {
    return 'banner:banner2';
  }

  if (!isExternalOrInlineImage(trimmed)) {
    return '';
  }

  return trimmed;
};

export const resolveBannerRef = (value) => {
  const normalized = normalizeBannerRef(value);

  if (!normalized) {
    return banner1Image;
  }

  if (normalized.startsWith('banner:')) {
    const key = normalized.replace('banner:', '');
    return BANNER_LIBRARY[key] ?? banner1Image;
  }

  const knownAsset = resolveKnownAsset(normalized);

  if (knownAsset) {
    return knownAsset;
  }

  // Cloudinary URL — already optimized via BNR constant, return as-is
  if (isCloudinaryUrl(normalized)) {
    return normalized;
  }

  if (!isExternalOrInlineImage(normalized)) {
    return BANNER_LIBRARY.banner1;
  }

  return normalized;
};

const pickImageKey = (name, sectionKey) => {
  const value = name.toLowerCase();

  if (value.includes('potato') || value.includes('aloo')) return 'potato';
  if (value.includes('beetroot') || value.includes('chukandar')) return 'beetroot';
  if (value.includes('peas') || value.includes('matar')) return 'peas';
  if (value.includes('lettuce') || value.includes('salad patta')) return 'lettuce';
  if (value.includes('gawar') || value.includes('cluster beans')) return 'gawarBeans';
  if (value.includes('beans') || value.includes('phali') || value.includes('farasbi') || value.includes('barbati') || value.includes('valor')) return 'beans';
  if (value.includes('cucumber') || value.includes('kheera')) return 'cucumber';
  if (value.includes('radish') || value.includes('mooli')) return 'radish';
  if (value.includes('ginger') || value.includes('adrak')) return 'ginger';
  if (value.includes('garlic') || value.includes('lahsun')) return 'garlic';
  if (value.includes('tomato') || value.includes('tamatar')) return 'tomato';
  if (value.includes('chilli') || value.includes('chili') || value.includes('hari mirch')) return 'chili';
  if (value.includes('capsicum')) return 'capsicum';
  if (value.includes('onion') || value.includes('pyaaz')) return 'onion';
  if (value.includes('okra') || value.includes('bhindi')) return 'okra';
  if (value.includes('brinjal') || value.includes('baingan') || value.includes('eggplant')) return 'brinjal';
  if (value.includes('coriander') || value.includes('dhaniya') || value.includes('cilantro')) return 'coriander';
  if (value.includes('lemon') || value.includes('nimbu')) return 'lemon';
  if (value.includes('spinach') || value.includes('palak')) return 'palak';
  if (value.includes('cabbage') || value.includes('patta gobhi')) return 'cabbage';
  if (value.includes('cauliflower') || value.includes('phool gobhi')) return 'cauliflower';

  if (
    value.includes('carrot') ||
    value.includes('beet') ||
    value.includes('turnip') ||
    value.includes('potato') ||
    value.includes('onion') ||
    value.includes('garlic') ||
    value.includes('ginger') ||
    value.includes('arbi') ||
    value.includes('yam') ||
    value.includes('turmeric')
  ) {
    return 'carrot';
  }

  if (sectionKey === 'leafy-greens' || sectionKey === 'beans-and-peas') return 'palak';

  return 'carrot';
};

const pickBgColor = (sectionKey, index) => {
  const palette = {
    'daily-essentials': ['#fff2e6', '#ffeae1', '#eef7dd', '#f9ecff'],
    'leafy-greens': ['#eaf7d8', '#edf9df', '#e4f4d0'],
    'root-vegetables': ['#fff0df', '#f7ebff', '#ffe9e0'],
    'fruit-vegetables': ['#ffe9e9', '#eef9df', '#fff2d8', '#f8ebff'],
    'beans-and-peas': ['#eaf7d9', '#edf8df', '#f0f9e7'],
    'salad-picks': ['#e8f7de', '#fff0e3', '#f8ecff']
  };

  return palette[sectionKey][index % palette[sectionKey].length];
};

export const buildDefaultCatalog = () =>
  SECTION_ORDER.map((sectionKey) => {
    const config = SECTION_META[sectionKey];

    return {
      id: sectionKey,
      title: config.title,
      subtitle: config.subtitle,
      unit: config.unit,
      items: config.items.map((name, index) => ({
        id: `${sectionKey}-${index + 1}`,
        name,
        weight: config.unit,
        price: Number((1.4 + (index % 6) * 0.37 + (sectionKey.length % 3) * 0.21).toFixed(2)),
        discount: 8 + ((index * 3 + sectionKey.length) % 26),
        imageRef: `preset:${pickImageKey(name, sectionKey)}`,
        bgColor: pickBgColor(sectionKey, index)
      }))
    };
  });

export const resolveImageRef = (imageRef) => {
  if (!imageRef) {
    return IMAGE_LIBRARY.carrot;
  }

  // Cloudinary URL — already has f_auto,q_auto,w_600 from IMG constant, return as-is
  if (isCloudinaryUrl(imageRef)) {
    return imageRef;
  }

  const knownAsset = resolveKnownAsset(imageRef);

  if (knownAsset) {
    return knownAsset;
  }

  if (imageRef.startsWith('preset:')) {
    const key = imageRef.replace('preset:', '');
    return IMAGE_LIBRARY[key] || IMAGE_LIBRARY.carrot;
  }

  return imageRef;
};

export const createEmptyProduct = () => ({
  id: `product-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  name: 'New Vegetable',
  weight: 'fresh, 1 kg',
  price: 2.99,
  discount: 10,
  imageRef: 'preset:carrot',
  bgColor: '#fff2e6'
});

export const createEmptySection = () => ({
  id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  title: 'New Section',
  subtitle: 'Describe this section here.',
  unit: 'fresh pack, 1 kg',
  items: []
});
