import carrotImg from '../assets/fresh_carrot_1775370917174.png';
import capsicumImg from '../assets/fresh_capsicum_1775370933456.png';
import potatoImg from '../assets/potato.png';
import tomatoImg from '../assets/tomato.png';
import chiliImg from '../assets/green chili.png';
import gingerImg from '../assets/Ginger.png';
import garlicImg from '../assets/Garlic bulbs with seasoning and parsley.png';
import lemonImg from '../assets/Bright lemon on green backdrop.png';
import corianderImg from '../assets/Fresh bunch of cilantro on green background.png';
import cabbageImg from '../assets/Fresh green cabbage on wood.png';
import cauliflowerImg from '../assets/Fresh cauliflower on rustic wood.png';
import palakImg from '../assets/Fresh desi palak on burlap cloth.png';
import okraImg from '../assets/Fresh okra with star-shaped seeds.png';
import brinjalImg from '../assets/Fresh eggplant on soft purple background.png';
import onionImg from '../assets/Fresh red onion and sliced beauty.png';
import beetrootImg from '../assets/Vibrant beetroot against soft pink backdrop.png';
import peasImg from '../assets/Fresh green peas on wooden surface.png';
import lettuceImg from '../assets/Fresh green lettuce on wooden surface.png';
import beansImg from '../assets/Fresh green beans on beige surface.png';
import gawarBeansImg from '../assets/Fresh green beans on slate background.png';
import cucumberImg from '../assets/Fresh cucumber with slices on green.png';
import radishImg from '../assets/Fresh daikon radish and slices.png';
import banner1Image from '../assets/banner1.png';
import banner2Image from '../assets/banner2.png';

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

export const DEFAULT_AD_BANNERS = [banner1Image, banner2Image];

export const IMAGE_LIBRARY = {
  carrot: carrotImg,
  capsicum: capsicumImg,
  potato: potatoImg,
  tomato: tomatoImg,
  chili: chiliImg,
  ginger: gingerImg,
  garlic: garlicImg,
  lemon: lemonImg,
  coriander: corianderImg,
  cabbage: cabbageImg,
  cauliflower: cauliflowerImg,
  palak: palakImg,
  okra: okraImg,
  brinjal: brinjalImg,
  onion: onionImg,
  beetroot: beetrootImg,
  peas: peasImg,
  lettuce: lettuceImg,
  beans: beansImg,
  gawarBeans: gawarBeansImg,
  cucumber: cucumberImg,
  radish: radishImg
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
