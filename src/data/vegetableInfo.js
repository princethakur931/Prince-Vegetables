const VEGETABLE_PROFILES = [
  {
    matchers: ['green chilli', 'hari mirch', 'mirch', 'chilli'],
    englishName: 'Green Chilli',
    hindiName: 'Hari Mirch',
    shortTagline: 'Fresh heat, bright aroma, and a sharp finishing kick for Indian cooking.',
    nutrition: { calories: 40, protein: 2.0, fiber: 1.5, water: 88 },
    benefits: ['Supports metabolism', 'May help digestion in small amounts', 'Rich in vitamin C', 'Adds flavor with minimal calories'],
    famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
    production: ['North India kitchen markets', 'South Indian spice belts', 'Local mandi supply through the year'],
    bestFor: ['Mild congestion', 'Appetite support', 'Low-calorie flavoring'],
    caution: ['Avoid excess if you have acidity or mouth ulcers'],
    imageSearchQuery: 'green chilli hari mirch',
    description:
      'Green chilli is used as a finishing ingredient and is known for its bright pungency, aroma, and instant freshness in Indian curries and chutneys.'
  },
  {
    matchers: ['ginger', 'adrak'],
    englishName: 'Ginger',
    hindiName: 'Adrak',
    shortTagline: 'A warming root with a strong aroma and a classic home-remedy reputation.',
    nutrition: { calories: 80, protein: 1.8, fiber: 2.0, water: 79 },
    benefits: ['May ease nausea', 'Supports digestion', 'Anti-inflammatory tradition', 'Warming during cold weather'],
    famousFor: ['Kerala', 'Karnataka', 'Odisha', 'Meghalaya'],
    production: ['Western Ghats farms', 'Hill regions', 'Smallholder spice cultivation'],
    bestFor: ['Digestion', 'Motion sickness', 'Seasonal cold comfort'],
    caution: ['Keep intake moderate if you are on blood-thinning medicine'],
    imageSearchQuery: 'ginger adrak',
    description:
      'Ginger is widely used in tea, curries, pickles, and medicinal preparations because of its warming taste and digestive support.'
  },
  {
    matchers: ['garlic', 'lahsun'],
    englishName: 'Garlic',
    hindiName: 'Lahsun',
    shortTagline: 'Bold, aromatic, and one of the most versatile base ingredients in Indian kitchens.',
    nutrition: { calories: 149, protein: 6.4, fiber: 2.1, water: 59 },
    benefits: ['Heart-friendly kitchen staple', 'Supports immunity', 'May help cholesterol balance', 'Strong antimicrobial reputation'],
    famousFor: ['Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Uttar Pradesh'],
    production: ['Dry-land farming belts', 'Stored and traded widely across India', 'Year-round kitchen demand'],
    bestFor: ['Heart health support', 'Seasonal immunity routines', 'Flavoring without heavy fat'],
    caution: ['May irritate sensitive stomachs when eaten raw'],
    imageSearchQuery: 'garlic lahsun',
    description:
      'Garlic is valued for its aroma and is often used early in cooking to build a strong base for gravies, dals, and stir-fries.'
  },
  {
    matchers: ['potato', 'aloo'],
    englishName: 'Potato',
    hindiName: 'Aloo',
    shortTagline: 'The everyday comfort vegetable, loved for its versatility and filling texture.',
    nutrition: { calories: 77, protein: 2.0, fiber: 2.2, water: 79 },
    benefits: ['Good energy source', 'Contains potassium', 'Works in many cuisines', 'Comforting and budget friendly'],
    famousFor: ['Uttar Pradesh', 'West Bengal', 'Punjab', 'Bihar'],
    production: ['Indo-Gangetic plains', 'Storage-based supply chains', 'Major winter harvests'],
    bestFor: ['Extra energy needs', 'Recovery meals', 'Mixed vegetable dishes'],
    caution: ['Keep portions moderate if managing blood sugar'],
    imageSearchQuery: 'potato aloo',
    description:
      'Potato is the most flexible household vegetable and is used for curries, snacks, parathas, and festival cooking.'
  },
  {
    matchers: ['onion', 'pyaaz', 'pyaz'],
    englishName: 'Onion',
    hindiName: 'Pyaaz',
    shortTagline: 'A foundational vegetable that builds sweetness, depth, and aroma in almost every meal.',
    nutrition: { calories: 40, protein: 1.1, fiber: 1.7, water: 89 },
    benefits: ['Prebiotic fiber', 'Supports heart health', 'Adds natural sweetness', 'Common in raw salads and cooked dishes'],
    famousFor: ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat'],
    production: ['Large-scale mandi supply', 'Storage and season-sensitive pricing', 'Used throughout India'],
    bestFor: ['Digestion support', 'Heart-friendly meals', 'Raw salad plates'],
    caution: ['Raw onion may be harsh for sensitive digestion'],
    imageSearchQuery: 'onion pyaaz',
    description:
      'Onion is usually one of the first ingredients in Indian cooking because it creates the base flavor for gravies, sabzis, and biryani-style dishes.'
  },
  {
    matchers: ['tomato', 'tamatar'],
    englishName: 'Tomato',
    hindiName: 'Tamatar',
    shortTagline: 'Tangy, juicy, and packed with color for gravies, salads, and sauces.',
    nutrition: { calories: 18, protein: 0.9, fiber: 1.2, water: 95 },
    benefits: ['Rich in lycopene', 'Good for hydration', 'Supports skin and heart health', 'Low-calorie flavor booster'],
    famousFor: ['Karnataka', 'Andhra Pradesh', 'Madhya Pradesh', 'Odisha'],
    production: ['Open-field farms', 'Polyhouse cultivation', 'Year-round kitchen demand'],
    bestFor: ['Heart-friendly diet', 'Hydration', 'Sauces and fresh salads'],
    caution: ['Acidity-sensitive people may prefer cooked tomato'],
    imageSearchQuery: 'tomato tamatar',
    description:
      'Tomato gives a bright sour-sweet balance and is central to curry bases, ketchup, chutneys, and fresh salads.'
  },
  {
    matchers: ['carrot', 'gajar'],
    englishName: 'Carrot',
    hindiName: 'Gajar',
    shortTagline: 'Crunchy, colorful, and widely used in winter salads, juices, and halwa.',
    nutrition: { calories: 41, protein: 0.9, fiber: 2.8, water: 88 },
    benefits: ['Vitamin A support', 'Good for eye health', 'Crunchy and filling', 'Works raw or cooked'],
    famousFor: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra'],
    production: ['Winter harvest markets', 'Salad and juice supply chains', 'Root-crop regions'],
    bestFor: ['Eye support', 'Children-friendly snacks', 'Winter eating'],
    caution: ['Juices can raise sugar quickly compared with whole carrot'],
    imageSearchQuery: 'carrot gajar',
    description:
      'Carrot is known for its bright orange color and is popular as a raw snack, salad ingredient, and dessert vegetable.'
  },
  {
    matchers: ['spinach', 'palak'],
    englishName: 'Spinach',
    hindiName: 'Palak',
    shortTagline: 'A leafy green powerhouse with iron, folate, and a soft, versatile texture.',
    nutrition: { calories: 23, protein: 2.9, fiber: 2.2, water: 91 },
    benefits: ['Leafy iron support', 'Good folate source', 'Low calorie density', 'Works in dals, saag, and soups'],
    famousFor: ['Punjab', 'Haryana', 'Karnataka', 'Maharashtra'],
    production: ['Cool-season farms', 'Urban market gardens', 'Fresh bunch supply'],
    bestFor: ['Anemia-supportive meals', 'Weight-conscious diets', 'Iron and folate intake'],
    caution: ['People prone to kidney stones should follow medical advice on oxalate intake'],
    imageSearchQuery: 'spinach palak',
    description:
      'Spinach is a common winter leafy green and is often used for saag, mixed sabzi, paratha stuffing, and soups.'
  },
  {
    matchers: ['cucumber', 'kheera'],
    englishName: 'Cucumber',
    hindiName: 'Kheera',
    shortTagline: 'Cool, crisp, and hydration-friendly for salads and quick snacking.',
    nutrition: { calories: 15, protein: 0.7, fiber: 0.5, water: 96 },
    benefits: ['High water content', 'Cooling feel', 'Great for salads', 'Light on calories'],
    famousFor: ['Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Gujarat'],
    production: ['Salad belts near cities', 'Summer markets', 'Household demand rises in hot weather'],
    bestFor: ['Hydration', 'Light meals', 'Summer diet'],
    caution: ['Very cold cucumber may bother sensitive throats in some people'],
    imageSearchQuery: 'cucumber kheera',
    description:
      'Cucumber is mostly eaten fresh and is one of the easiest vegetables to use for quick salads and cooling plates.'
  },
  {
    matchers: ['beetroot', 'chukandar'],
    englishName: 'Beetroot',
    hindiName: 'Chukandar',
    shortTagline: 'Deep red, earthy, and popular for juices, salads, and wellness bowls.',
    nutrition: { calories: 43, protein: 1.6, fiber: 2.8, water: 87 },
    benefits: ['May support stamina', 'Supports circulation', 'Natural color and sweetness', 'Great raw, roasted, or juiced'],
    famousFor: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh'],
    production: ['Cool-weather roots', 'Juice and salad demand', 'Local vegetable markets'],
    bestFor: ['Stamina routines', 'Pre-workout meals', 'Salads and detox-style diets'],
    caution: ['Can stain and may raise oxalate intake in some people'],
    imageSearchQuery: 'beetroot chukandar',
    description:
      'Beetroot is known for its deep color and is used in salads, juices, tikkis, and nutritious vegetarian dishes.'
  },
  {
    matchers: ['cauliflower', 'phool gobhi', 'gobhi'],
    englishName: 'Cauliflower',
    hindiName: 'Phool Gobhi',
    shortTagline: 'A winter favorite for aloo-gobhi, sabzi, and low-carb meals.',
    nutrition: { calories: 25, protein: 1.9, fiber: 2.0, water: 92 },
    benefits: ['Low calorie', 'Good fiber source', 'Works as rice or mash substitute', 'Popular in winter recipes'],
    famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh'],
    production: ['Cool-season fields', 'Winter supply chains', 'Household and restaurant demand'],
    bestFor: ['Weight-aware meals', 'Fiber intake', 'Winter cooking'],
    caution: ['Can cause bloating for some people if overcooked or overused'],
    imageSearchQuery: 'cauliflower phool gobhi',
    description:
      'Cauliflower is a major winter vegetable used in Indian households for dry sabzis, curries, pickles, and snacks.'
  },
  {
    matchers: ['cabbage', 'patta gobhi'],
    englishName: 'Cabbage',
    hindiName: 'Patta Gobhi',
    shortTagline: 'Crunchy, versatile, and used in sabzi, slaw, paratha stuffing, and rolls.',
    nutrition: { calories: 25, protein: 1.3, fiber: 2.5, water: 92 },
    benefits: ['Fiber for digestion', 'Low calorie', 'Budget-friendly', 'Good for salads and stir-fry'],
    famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Maharashtra'],
    production: ['Cool-weather vegetable belts', 'Local market farms', 'Large household demand'],
    bestFor: ['Digestion', 'Light meals', 'Budget cooking'],
    caution: ['May trigger gas in sensitive stomachs'],
    imageSearchQuery: 'cabbage patta gobhi',
    description:
      'Cabbage is common in both Indian and continental-style cooking because it stays crisp and holds flavor very well.'
  },
  {
    matchers: ['okra', 'bhindi'],
    englishName: 'Okra',
    hindiName: 'Bhindi',
    shortTagline: 'Soft inside, crisp outside, and a staple for dry sabzi lovers.',
    nutrition: { calories: 33, protein: 1.9, fiber: 3.2, water: 89 },
    benefits: ['Good fiber source', 'May help blood sugar management', 'Popular in Indian cooking', 'Contains folate and vitamin C'],
    famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
    production: ['Warm-weather farms', 'Kitchen-garden staple', 'High daily fresh demand'],
    bestFor: ['Digestion', 'Blood sugar mindful meals', 'Fiber intake'],
    caution: ['Can become slimy if overcooked'],
    imageSearchQuery: 'okra bhindi',
    description:
      'Okra is one of the most loved everyday vegetables in India and is often cooked dry with spices, onions, and tomatoes.'
  },
  {
    matchers: ['brinjal', 'baingan', 'eggplant'],
    englishName: 'Brinjal',
    hindiName: 'Baingan',
    shortTagline: 'Smoky, soft, and famous for bharta, curry, and stuffing recipes.',
    nutrition: { calories: 25, protein: 1.0, fiber: 3.0, water: 92 },
    benefits: ['Fiber-rich', 'Absorbs flavors well', 'Good for roasted dishes', 'Low calorie'],
    famousFor: ['Maharashtra', 'West Bengal', 'Bihar', 'Karnataka'],
    production: ['Warm-season vegetable farms', 'Village and peri-urban supply', 'Used across India'],
    bestFor: ['Fiber intake', 'Bharta-style dishes', 'Low-calorie meals'],
    caution: ['Sensitive people may prefer well-cooked brinjal'],
    imageSearchQuery: 'brinjal baingan eggplant',
    description:
      'Brinjal is a classic Indian vegetable and is prized for roasting, stuffing, and rich gravies.'
  }
];

const DEFAULT_PROFILE = {
  englishName: 'Seasonal Vegetable',
  shortTagline: 'Fresh from the market and best enjoyed as part of a balanced meal.',
  nutrition: { calories: 30, protein: 1.5, fiber: 2.0, water: 88 },
  benefits: ['Fresh seasonal nutrition', 'Supports balanced eating', 'Easy to pair with Indian meals', 'Good source of plant compounds'],
  famousFor: ['Regional vegetable markets', 'Local farm belts', 'Seasonal supply across India'],
  production: ['Commonly grown in multiple Indian states', 'Local mandi supply chains', 'Seasonal kitchen demand'],
  bestFor: ['General wellness', 'Balanced meals', 'Seasonal eating'],
  caution: ['Match portion sizes to your personal health needs'],
  imageSearchQuery: 'fresh vegetable',
  description: 'Fresh vegetables are best enjoyed seasonally and rotated across meals for variety.'
};

const LOCALIZED_VEGETABLE_CONTENT = {
  hi: {
    'Green Chilli': {
      title: 'हरी मिर्च',
      description: 'हरी मिर्च का इस्तेमाल तड़के और फिनिशिंग के लिए होता है। इसकी तेज़ खुशबू और तीखापन खाने में तुरंत ताज़गी लाता है।',
      benefits: ['मेटाबॉलिज़्म को सपोर्ट कर सकती है', 'थोड़ी मात्रा में पाचन में मदद', 'विटामिन C से भरपूर', 'कम कैलोरी में स्वाद बढ़ाती है'],
      famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
      production: ['उत्तर भारत के किचन बाज़ार', 'दक्षिण भारत के मसाला क्षेत्र', 'साल भर मंडी सप्लाई'],
      bestFor: ['हल्की जुकाम/भारीपन', 'भूख बढ़ाने में मदद', 'कम कैलोरी स्वाद'],
      caution: ['एसिडिटी या मुँह के छालों में ज़्यादा न लें'],
      imageAlt: 'हरी मिर्च सब्ज़ी',
      searchQuery: 'हरी मिर्च'
    },
    Ginger: {
      title: 'अदरक',
      description: 'अदरक चाय, करी, अचार और घरेलू नुस्खों में बहुत इस्तेमाल होती है। इसका गर्म स्वाद और खुशबू इसे खास बनाते हैं।',
      benefits: ['मतली कम करने में मदद कर सकती है', 'पाचन को सपोर्ट करती है', 'सूजन-रोधी परंपरा', 'सर्द मौसम में गर्माहट देती है'],
      famousFor: ['Kerala', 'Karnataka', 'Odisha', 'Meghalaya'],
      production: ['Western Ghats farms', 'Hill regions', 'Smallholder spice cultivation'],
      bestFor: ['पाचन', 'मोशन सिकनेस', 'सर्दी में आराम'],
      caution: ['ब्लड थिनर दवा लेने पर मात्रा सीमित रखें'],
      imageAlt: 'अदरक सब्ज़ी',
      searchQuery: 'अदरक'
    },
    Garlic: {
      title: 'लहसुन',
      description: 'लहसुन भारतीय रसोई का बेहद उपयोगी आधार है। इसकी तेज़ सुगंध ग्रेवी, दाल और तड़के का स्वाद गहरा करती है।',
      benefits: ['दिल के लिए उपयोगी किचन स्टेपल', 'इम्यूनिटी को सपोर्ट', 'कोलेस्ट्रॉल बैलेंस में मदद कर सकती है', 'मजबूत antimicrobial प्रतिष्ठा'],
      famousFor: ['Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Uttar Pradesh'],
      production: ['Dry-land farming belts', 'Stored and traded widely across India', 'Year-round kitchen demand'],
      bestFor: ['दिल की सेहत सपोर्ट', 'मौसमी इम्यूनिटी', 'कम फैट में फ्लेवर'],
      caution: ['कच्चा खाने पर संवेदनशील पेट को परेशान कर सकती है'],
      imageAlt: 'लहसुन सब्ज़ी',
      searchQuery: 'लहसुन'
    },
    Potato: {
      title: 'आलू',
      description: 'आलू घर की सबसे बहुमुखी सब्ज़ी है। इसे सब्ज़ी, स्नैक्स, पराठे और त्योहारों के पकवानों में बहुत पसंद किया जाता है।',
      benefits: ['अच्छी ऊर्जा का स्रोत', 'पोटैशियम देता है', 'कई रसोइयों में काम आता है', 'संतुष्ट करने वाला और बजट-फ्रेंडली'],
      famousFor: ['Uttar Pradesh', 'West Bengal', 'Punjab', 'Bihar'],
      production: ['Indo-Gangetic plains', 'Storage-based supply chains', 'Major winter harvests'],
      bestFor: ['अतिरिक्त ऊर्जा', 'रिकवरी मील्स', 'मिक्स वेज डिशेज़'],
      caution: ['ब्लड शुगर संभाल रहे हों तो मात्रा संतुलित रखें'],
      imageAlt: 'आलू सब्ज़ी',
      searchQuery: 'आलू'
    },
    Onion: {
      title: 'प्याज़',
      description: 'प्याज़ लगभग हर भारतीय खाने की नींव है। यह स्वाद में मिठास, गहराई और सुगंध जोड़ता है।',
      benefits: ['प्रीबायोटिक फाइबर', 'दिल की सेहत में मदद', 'प्राकृतिक मिठास', 'कच्चे और पके दोनों व्यंजनों में काम आता है'],
      famousFor: ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat'],
      production: ['Large-scale mandi supply', 'Storage and season-sensitive pricing', 'Used throughout India'],
      bestFor: ['पाचन सपोर्ट', 'हार्ट-फ्रेंडली मील्स', 'कच्चे सलाद'],
      caution: ['संवेदनशील पाचन में कच्चा प्याज़ भारी लग सकता है'],
      imageAlt: 'प्याज़ सब्ज़ी',
      searchQuery: 'प्याज़'
    },
    Tomato: {
      title: 'टमाटर',
      description: 'टमाटर में खट्टा-मीठा संतुलन होता है। यह ग्रेवी, चटनी, सॉस और ताज़े सलाद की जान है।',
      benefits: ['लाइकोपीन से भरपूर', 'हाइड्रेशन में मदद', 'त्वचा और दिल की सेहत को सपोर्ट', 'कम कैलोरी में स्वाद बढ़ाता है'],
      famousFor: ['Karnataka', 'Andhra Pradesh', 'Madhya Pradesh', 'Odisha'],
      production: ['Open-field farms', 'Polyhouse cultivation', 'Year-round kitchen demand'],
      bestFor: ['दिल के लिए बेहतर डाइट', 'हाइड्रेशन', 'सॉस और ताज़े सलाद'],
      caution: ['एसिडिटी वाले लोग पका हुआ टमाटर बेहतर पाते हैं'],
      imageAlt: 'टमाटर सब्ज़ी',
      searchQuery: 'टमाटर'
    },
    Carrot: {
      title: 'गाजर',
      description: 'गाजर अपनी चमकीली नारंगी रंगत के लिए जानी जाती है। इसे कच्चा, जूस, सलाद और हलवे में खूब इस्तेमाल किया जाता है।',
      benefits: ['विटामिन A का सपोर्ट', 'आँखों की सेहत के लिए अच्छा', 'क्रंची और भरने वाला', 'कच्चा या पका दोनों तरह से उपयोगी'],
      famousFor: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra'],
      production: ['Winter harvest markets', 'Salad and juice supply chains', 'Root-crop regions'],
      bestFor: ['आँखों का सपोर्ट', 'बच्चों के लिए स्नैक्स', 'सर्दियों का खाना'],
      caution: ['जूस whole carrot की तुलना में शुगर जल्दी बढ़ा सकता है'],
      imageAlt: 'गाजर सब्ज़ी',
      searchQuery: 'गाजर'
    },
    Spinach: {
      title: 'पालक',
      description: 'पालक एक पत्तेदार हरी सब्ज़ी है जिसमें आयरन और फोलेट अच्छी मात्रा में होते हैं। यह दाल, साग और सूप में बढ़िया लगती है।',
      benefits: ['पत्तेदार आयरन सपोर्ट', 'फोलेट का अच्छा स्रोत', 'कम कैलोरी घनत्व', 'दाल, साग और सूप में उपयोगी'],
      famousFor: ['Punjab', 'Haryana', 'Karnataka', 'Maharashtra'],
      production: ['Cool-season farms', 'Urban market gardens', 'Fresh bunch supply'],
      bestFor: ['एनीमिया-सपोर्टिव मील्स', 'वज़न नियंत्रित डाइट', 'आयरन और फोलेट'],
      caution: ['किडनी स्टोन की प्रवृत्ति हो तो ऑक्सालेट पर डॉक्टर की सलाह लें'],
      imageAlt: 'पालक सब्ज़ी',
      searchQuery: 'पालक'
    },
    Cucumber: {
      title: 'खीरा',
      description: 'खीरा ठंडा, कुरकुरा और हाइड्रेशन-फ्रेंडली होता है। यह सलाद और जल्दी स्नैक के लिए बहुत अच्छा है।',
      benefits: ['पानी की मात्रा बहुत अधिक', 'ठंडक का एहसास', 'सलाद के लिए बढ़िया', 'कैलोरी कम'],
      famousFor: ['Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Gujarat'],
      production: ['Salad belts near cities', 'Summer markets', 'Household demand rises in hot weather'],
      bestFor: ['हाइड्रेशन', 'हल्के भोजन', 'गर्मी की डाइट'],
      caution: ['बहुत ठंडा खीरा संवेदनशील गले को परेशान कर सकता है'],
      imageAlt: 'खीरा सब्ज़ी',
      searchQuery: 'खीरा'
    },
    Beetroot: {
      title: 'चुकंदर',
      description: 'चुकंदर अपनी गहरी लाल रंगत, मिट्टी जैसे स्वाद और जूस, सलाद तथा वेलनेस बाउल में इस्तेमाल के लिए जाना जाता है।',
      benefits: ['स्टैमिना सपोर्ट कर सकता है', 'संचार को सपोर्ट', 'प्राकृतिक रंग और मिठास', 'कच्चा, रोस्टेड या जूस के रूप में अच्छा'],
      famousFor: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh'],
      production: ['Cool-weather roots', 'Juice and salad demand', 'Local vegetable markets'],
      bestFor: ['स्टैमिना रूटीन', 'वर्कआउट से पहले', 'सलाद और डिटॉक्स-स्टाइल डाइट'],
      caution: ['दाग छोड़ सकता है और कुछ लोगों में ऑक्सालेट बढ़ा सकता है'],
      imageAlt: 'चुकंदर सब्ज़ी',
      searchQuery: 'चुकंदर'
    },
    Cauliflower: {
      title: 'फूलगोभी',
      description: 'फूलगोभी सर्दियों की पसंदीदा सब्ज़ी है। आलू-गोभी, सूखी सब्ज़ी और लो-कार्ब मील्स में यह खूब इस्तेमाल होती है।',
      benefits: ['कम कैलोरी', 'फाइबर का अच्छा स्रोत', 'चावल या मैश का विकल्प', 'सर्दियों की रेसिपीज़ में लोकप्रिय'],
      famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh'],
      production: ['Cool-season fields', 'Winter supply chains', 'Household and restaurant demand'],
      bestFor: ['वज़न-aware meals', 'फाइबर intake', 'सर्दियों का खाना'],
      caution: ['कुछ लोगों में ज़्यादा पकाने या ज़्यादा खाने पर गैस बन सकती है'],
      imageAlt: 'फूलगोभी सब्ज़ी',
      searchQuery: 'फूलगोभी'
    },
    Cabbage: {
      title: 'पत्ता गोभी',
      description: 'पत्ता गोभी कुरकुरी और बहुउपयोगी सब्ज़ी है। इसे सब्ज़ी, स्लॉ, पराठा स्टफिंग और रोल्स में इस्तेमाल किया जाता है।',
      benefits: ['पाचन के लिए फाइबर', 'कम कैलोरी', 'बजट-फ्रेंडली', 'सलाद और स्टिर-फ्राई के लिए अच्छा'],
      famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Maharashtra'],
      production: ['Cool-weather vegetable belts', 'Local market farms', 'Large household demand'],
      bestFor: ['पाचन', 'हल्के भोजन', 'बजट कुकिंग'],
      caution: ['संवेदनशील पेट में गैस कर सकती है'],
      imageAlt: 'पत्ता गोभी सब्ज़ी',
      searchQuery: 'पत्ता गोभी'
    },
    Okra: {
      title: 'भिंडी',
      description: 'भिंडी भारतीय रसोई की बहुत पसंदीदा रोज़मर्रा की सब्ज़ी है। इसे सूखी सब्ज़ी, प्याज़ और टमाटर के साथ खूब पकाया जाता है।',
      benefits: ['अच्छा फाइबर स्रोत', 'ब्लड शुगर मैनेजमेंट में मदद कर सकती है', 'भारतीय खाना में लोकप्रिय', 'फोलेट और विटामिन C देती है'],
      famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
      production: ['Warm-weather farms', 'Kitchen-garden staple', 'High daily fresh demand'],
      bestFor: ['पाचन', 'ब्लड शुगर mindful meals', 'फाइबर intake'],
      caution: ['ज़्यादा पकाने पर चिपचिपी हो सकती है'],
      imageAlt: 'भिंडी सब्ज़ी',
      searchQuery: 'भिंडी'
    },
    Brinjal: {
      title: 'बैंगन',
      description: 'बैंगन का स्वाद smoky और मुलायम होता है। यह भर्ता, करी और स्टफ्ड रेसिपीज़ में बहुत लोकप्रिय है।',
      benefits: ['फाइबर से भरपूर', 'स्वाद को अच्छी तरह सोखता है', 'रोस्टेड डिशेज़ के लिए अच्छा', 'कम कैलोरी'],
      famousFor: ['Maharashtra', 'West Bengal', 'Bihar', 'Karnataka'],
      production: ['Warm-season vegetable farms', 'Village and peri-urban supply', 'Used across India'],
      bestFor: ['फाइबर intake', 'भर्ता-स्टाइल डिशेज़', 'लो-कैलोरी मील्स'],
      caution: ['संवेदनशील लोगों को अच्छी तरह पका बैंगन बेहतर लगता है'],
      imageAlt: 'बैंगन सब्ज़ी',
      searchQuery: 'बैंगन'
    }
  },
  mr: {
    'Green Chilli': {
      title: 'हिरवी मिरची',
      description: 'हिरवी मिरची फोडणी आणि शेवटचा तिखट स्पर्श देण्यासाठी वापरली जाते. तिचा सुगंध आणि तिखटपणा जेवण ताजं करतो.',
      benefits: ['मेटाबॉलिझमला मदत करू शकते', 'थोड्या प्रमाणात पचनाला मदत', 'व्हिटॅमिन C ने समृद्ध', 'कमी कॅलरीत चव वाढवते'],
      famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
      production: ['उत्तर भारतातील मार्केट्स', 'दक्षिण भारतातील मसाला पट्टे', 'सालभर मंडी पुरवठा'],
      bestFor: ['हलकी सर्दी/गर्दी', 'भूक वाढवणे', 'लो-कॅलरी फ्लेवरिंग'],
      caution: ['अॅसिडिटी किंवा तोंडातील जखमा असतील तर जास्त खाऊ नका'],
      imageAlt: 'हिरवी मिरची',
      searchQuery: 'हिरवी मिरची'
    },
    Ginger: {
      title: 'आले',
      description: 'आले चहा, भाजी, लोणचे आणि घरगुती उपायांमध्ये वापरले जाते. त्याचा उबदार स्वाद आणि सुगंध यासाठी ते प्रसिद्ध आहे.',
      benefits: ['मळमळ कमी करण्यास मदत', 'पचनाला पाठबळ', 'दाह-रोधी परंपरा', 'थंडीमध्ये उबदारपणा देते'],
      famousFor: ['Kerala', 'Karnataka', 'Odisha', 'Meghalaya'],
      production: ['Western Ghats farms', 'Hill regions', 'Smallholder spice cultivation'],
      bestFor: ['पचन', 'मोशन सिकनेस', 'हिवाळ्यात आराम'],
      caution: ['ब्लड-थिनर औषध घेत असाल तर प्रमाण मर्यादित ठेवा'],
      imageAlt: 'आले',
      searchQuery: 'आले'
    },
    Garlic: {
      title: 'लसूण',
      description: 'लसूण भारतीय स्वयंपाकातील महत्त्वाचा बेस आहे. त्याचा वास ग्रेव्ही, डाळ आणि फोडणीला खोल चव देतो.',
      benefits: ['हृदयासाठी उपयुक्त किचन स्टेपल', 'इम्युनिटीला मदत', 'कोलेस्ट्रॉल बॅलन्समध्ये मदत करू शकते', 'जंतुनाशक गुणांसाठी ओळख'],
      famousFor: ['Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Uttar Pradesh'],
      production: ['Dry-land farming belts', 'Stored and traded widely across India', 'Year-round kitchen demand'],
      bestFor: ['हृदय आरोग्य', 'सिजनल इम्युनिटी', 'कमी फॅटमध्ये फ्लेवर'],
      caution: ['कच्चे खाल्ल्यास संवेदनशील पोटाला त्रास होऊ शकतो'],
      imageAlt: 'लसूण',
      searchQuery: 'लसूण'
    },
    Potato: {
      title: 'बटाटा',
      description: 'बटाटा घरगुती स्वयंपाकात सर्वात बहुगुणी भाजी आहे. तो भाजी, स्नॅक्स, पराठे आणि सणासुदीच्या पदार्थात आवडीने वापरला जातो.',
      benefits: ['चांगला ऊर्जा स्रोत', 'पोटॅशियम देतो', 'अनेक पाककृतींमध्ये उपयोगी', 'पोटभर आणि बजेट-फ्रेंडली'],
      famousFor: ['Uttar Pradesh', 'West Bengal', 'Punjab', 'Bihar'],
      production: ['Indo-Gangetic plains', 'Storage-based supply chains', 'Major winter harvests'],
      bestFor: ['जास्त ऊर्जा', 'रिकव्हरी जेवण', 'मिक्स भाजी पदार्थ'],
      caution: ['रक्तातील साखर सांभाळत असाल तर प्रमाण योग्य ठेवा'],
      imageAlt: 'बटाटा',
      searchQuery: 'बटाटा'
    },
    Onion: {
      title: 'कांदा',
      description: 'कांदा जवळपास प्रत्येक भारतीय जेवणाचा पाया आहे. तो गोडवा, खोली आणि सुगंध वाढवतो.',
      benefits: ['प्रीबायोटिक फायबर', 'हृदय आरोग्यास मदत', 'नैसर्गिक गोडवा', 'कच्च्या आणि शिजवलेल्या दोन्ही पदार्थांत उपयोगी'],
      famousFor: ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat'],
      production: ['Large-scale mandi supply', 'Storage and season-sensitive pricing', 'Used throughout India'],
      bestFor: ['पचनाला मदत', 'हार्ट-फ्रेंडली जेवण', 'कच्चे सलाड'],
      caution: ['संवेदनशील पचनासाठी कच्चा कांदा जड वाटू शकतो'],
      imageAlt: 'कांदा',
      searchQuery: 'कांदा'
    },
    Tomato: {
      title: 'टोमॅटो',
      description: 'टोमॅटोमध्ये आंबट-गोड समतोल असतो. ग्रेवी, चटणी, सॉस आणि ताज्या सलाडसाठी तो महत्त्वाचा आहे.',
      benefits: ['लायकोपीनने समृद्ध', 'हायड्रेशनला मदत', 'त्वचा आणि हृदय आरोग्यास पाठबळ', 'कमी कॅलरीत चव वाढवतो'],
      famousFor: ['Karnataka', 'Andhra Pradesh', 'Madhya Pradesh', 'Odisha'],
      production: ['Open-field farms', 'Polyhouse cultivation', 'Year-round kitchen demand'],
      bestFor: ['हृदयाला अनुकूल आहार', 'हायड्रेशन', 'सॉस आणि ताजे सलाड'],
      caution: ['अॅसिडिटी असल्यास शिजवलेला टोमॅटो चांगला'],
      imageAlt: 'टोमॅटो',
      searchQuery: 'टोमॅटो'
    },
    Carrot: {
      title: 'गाजर',
      description: 'गाजर त्याच्या चमकदार केशरी रंगासाठी ओळखली जाते. ती कच्ची, ज्यूस, सलाड आणि हलव्यात लोकप्रिय आहे.',
      benefits: ['व्हिटॅमिन A सपोर्ट', 'डोळ्यांसाठी चांगली', 'कुरकुरीत आणि पोटभर', 'कच्ची किंवा शिजवून दोन्ही प्रकारे उपयोगी'],
      famousFor: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra'],
      production: ['Winter harvest markets', 'Salad and juice supply chains', 'Root-crop regions'],
      bestFor: ['डोळ्यांचे आरोग्य', 'मुलांसाठी स्नॅक्स', 'हिवाळ्यातील खाणे'],
      caution: ['ज्यूसमुळे साखर whole carrot पेक्षा पटकन वाढू शकते'],
      imageAlt: 'गाजर',
      searchQuery: 'गाजर'
    },
    Spinach: {
      title: 'पालक',
      description: 'पालक ही पानांची हिरवी भाजी आहे ज्यात आयर्न आणि फोलेट चांगले असते. ती डाळ, साग आणि सूपमध्ये खूप छान लागते.',
      benefits: ['पानांमधून आयर्न सपोर्ट', 'फोलेटचा चांगला स्रोत', 'कमी कॅलरी घनता', 'दाळ, साग आणि सूपमध्ये उपयोगी'],
      famousFor: ['Punjab', 'Haryana', 'Karnataka', 'Maharashtra'],
      production: ['Cool-season farms', 'Urban market gardens', 'Fresh bunch supply'],
      bestFor: ['अॅनिमिया-सपोर्टिव जेवण', 'वजन नियंत्रित आहार', 'आयर्न आणि फोलेट'],
      caution: ['किडनी स्टोनचा धोका असेल तर ऑक्सलेटबाबत डॉक्टरांचा सल्ला घ्या'],
      imageAlt: 'पालक',
      searchQuery: 'पालक'
    },
    Cucumber: {
      title: 'काकडी',
      description: 'काकडी थंड, कुरकुरीत आणि हायड्रेशनसाठी उत्तम आहे. सलाड आणि झटपट स्नॅक्ससाठी ती सोपी निवड आहे.',
      benefits: ['पाण्याचे प्रमाण खूप जास्त', 'थंडावा देते', 'सलाडसाठी उत्तम', 'कॅलरी कमी'],
      famousFor: ['Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Gujarat'],
      production: ['Salad belts near cities', 'Summer markets', 'Household demand rises in hot weather'],
      bestFor: ['हायड्रेशन', 'हलके जेवण', 'उन्हाळ्याचा आहार'],
      caution: ['अतिशय थंड काकडी संवेदनशील घशाला त्रास देऊ शकते'],
      imageAlt: 'काकडी',
      searchQuery: 'काकडी'
    },
    Beetroot: {
      title: 'बीट',
      description: 'बीट त्याच्या खोल लाल रंगासाठी, मातीसारख्या चवीसाठी आणि ज्यूस, सलाड व वेलनेस बाऊल्समध्ये वापरासाठी ओळखले जाते.',
      benefits: ['स्टॅमिना सपोर्ट करू शकते', 'रक्ताभिसरणाला मदत', 'नैसर्गिक रंग आणि गोडवा', 'कच्ची, रोस्टेड किंवा ज्यूसमध्ये उत्तम'],
      famousFor: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh'],
      production: ['Cool-weather roots', 'Juice and salad demand', 'Local vegetable markets'],
      bestFor: ['स्टॅमिना रूटीन', 'वर्कआउटपूर्व जेवण', 'सलाड आणि डिटॉक्स-स्टाइल आहार'],
      caution: ['डाग लागू शकतात आणि काही लोकांमध्ये ऑक्सलेट वाढू शकते'],
      imageAlt: 'बीट',
      searchQuery: 'बीट'
    },
    Cauliflower: {
      title: 'फुलकोबी',
      description: 'फुलकोबी ही हिवाळ्यातली आवडती भाजी आहे. आलू-फुलकोबी, सुकी भाजी आणि लो-कार्ब जेवणात ती खूप वापरली जाते.',
      benefits: ['कमी कॅलरी', 'फायबरचा चांगला स्रोत', 'भात किंवा मॅशचा पर्याय', 'हिवाळ्यातील रेसिपींमध्ये लोकप्रिय'],
      famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh'],
      production: ['Cool-season fields', 'Winter supply chains', 'Household and restaurant demand'],
      bestFor: ['वजन-जागरूक जेवण', 'फायबर intake', 'हिवाळ्यात स्वयंपाक'],
      caution: ['जास्त शिजवल्यास किंवा जास्त खाल्ल्यास काहींना फुगवटा होऊ शकतो'],
      imageAlt: 'फुलकोबी',
      searchQuery: 'फुलकोबी'
    },
    Cabbage: {
      title: 'कोबी',
      description: 'कोबी कुरकुरीत आणि बहुउपयोगी आहे. ती भाजी, स्लॉ, पराठा स्टफिंग आणि रोल्समध्ये वापरली जाते.',
      benefits: ['पचनासाठी फायबर', 'कमी कॅलरी', 'बजेट-फ्रेंडली', 'सलाड आणि स्टिर-फ्रायसाठी चांगली'],
      famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Maharashtra'],
      production: ['Cool-weather vegetable belts', 'Local market farms', 'Large household demand'],
      bestFor: ['पचन', 'हलके जेवण', 'बजेट कुकिंग'],
      caution: ['संवेदनशील पोटात गॅस करू शकते'],
      imageAlt: 'कोबी',
      searchQuery: 'कोबी'
    },
    Okra: {
      title: 'भेंडी',
      description: 'भेंडी भारतीय जेवणातील खूप आवडती रोजची भाजी आहे. ती सुक्या भाजीमध्ये, कांदा आणि टोमॅटोसह मस्त लागते.',
      benefits: ['चांगला फायबर स्रोत', 'रक्तातील साखर सांभाळण्यास मदत करू शकते', 'भारतीय स्वयंपाकात लोकप्रिय', 'फोलेट आणि व्हिटॅमिन C देते'],
      famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
      production: ['Warm-weather farms', 'Kitchen-garden staple', 'High daily fresh demand'],
      bestFor: ['पचन', 'ब्लड शुगर mindful meals', 'फायबर intake'],
      caution: ['जास्त शिजवल्यास चिकट होऊ शकते'],
      imageAlt: 'भेंडी',
      searchQuery: 'भेंडी'
    },
    Brinjal: {
      title: 'वांगी',
      description: 'वांग्याचा स्वाद smoky आणि मऊ असतो. भरलं वांगं, भरीत आणि करी यासाठी ते फार आवडतं.',
      benefits: ['फायबरने समृद्ध', 'स्वाद चांगला शोषतो', 'रोस्टेड पदार्थांसाठी चांगले', 'कमी कॅलरी'],
      famousFor: ['Maharashtra', 'West Bengal', 'Bihar', 'Karnataka'],
      production: ['Warm-season vegetable farms', 'Village and peri-urban supply', 'Used across India'],
      bestFor: ['फायबर intake', 'भरीत-स्टाइल डिशेस', 'लो-कॅलरी जेवण'],
      caution: ['संवेदनशील लोकांना नीट शिजवलेले वांगे जास्त चांगले'],
      imageAlt: 'वांगी',
      searchQuery: 'वांगी'
    }
  },
  gu: {
    'Green Chilli': {
      title: 'લીલી મરચી',
      description: 'લીલી મરચી તડકા અને છેલ્લો તીખો સ્પર્શ આપવા માટે વપરાય છે. એની સુગંધ અને તીખાશ ખોરાકને તાજગી આપે છે.',
      benefits: ['મેટાબોલિઝમને સપોર્ટ કરી શકે છે', 'થોડી માત્રામાં પાચનમાં મદદ', 'વિટામિન C થી ભરપૂર', 'ઓછી કેલરીમાં સ્વાદ વધારશે'],
      famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
      production: ['North India kitchen markets', 'South Indian spice belts', 'Local mandi supply through the year'],
      bestFor: ['હળવો ઠંડાપણો/જામાવટ', 'ભૂખ વધારવા', 'ઓછી કેલરીનું સ્વાદ'],
      caution: ['એસિડિટી અથવા મોઢાના છાલાં હોય તો વધારે ન લો'],
      imageAlt: 'લીલી મરચી',
      searchQuery: 'લીલી મરચી'
    },
    Ginger: {
      title: 'આદુ',
      description: 'આદુ ચા, કઢી, અથાણાં અને ઘરેલુ ઉપચારમાં ઘણી વપરાય છે. એની ગરમ સુગંધ અને સ્વાદ તેને ખાસ બનાવે છે.',
      benefits: ['ઊબકા ઓછા કરવામાં મદદ', 'પાચનને સપોર્ટ કરે છે', 'સૂજન-વિરોધી પરંપરા', 'ઠંડીમાં ગરમાહટ આપે છે'],
      famousFor: ['Kerala', 'Karnataka', 'Odisha', 'Meghalaya'],
      production: ['Western Ghats farms', 'Hill regions', 'Smallholder spice cultivation'],
      bestFor: ['પાચન', 'મોશન સિકનેસ', 'શિયાળામાં આરામ'],
      caution: ['બ્લડ-થિનર દવા લેતા હો તો માત્રા મર્યાદિત રાખો'],
      imageAlt: 'આદુ',
      searchQuery: 'આદુ'
    },
    Garlic: {
      title: 'લસણ',
      description: 'લસણ ભારતીય રસોડાનું બહુ ઉપયોગી આધાર છે. એની સુગંધ ગ્રેવી, દાળ અને તડકામાં ઊંડો સ્વાદ લાવે છે.',
      benefits: ['હૃદયમિત્ર કિચન સ્ટેપલ', 'ઇમ્યુનિટી સપોર્ટ કરે છે', 'કોલેસ્ટ્રોલ બેલેન્સમાં મદદ કરી શકે છે', 'મજબૂત antimicrobial પ્રતિષ્ઠા'],
      famousFor: ['Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Uttar Pradesh'],
      production: ['Dry-land farming belts', 'Stored and traded widely across India', 'Year-round kitchen demand'],
      bestFor: ['હૃદય આરોગ્ય સપોર્ટ', 'મોસમી ઇમ્યુનિટી', 'ઓછી ચરબીમાં સ્વાદ'],
      caution: ['કાચું ખાવાથી સંવેદનશીલ પેટને પરેશાની થઈ શકે છે'],
      imageAlt: 'લસણ',
      searchQuery: 'લસણ'
    },
    Potato: {
      title: 'બટાકા',
      description: 'બટાકા ઘરની સૌથી બહુમુખી શાકભાજી છે. તે ભાજી, નાસ્તા, પરાઠા અને તહેવારી વાનગીઓમાં ખૂબ લોકપ્રિય છે.',
      benefits: ['સારી ઊર્જા આપે છે', 'પોટેશિયમનો સ્ત્રોત', 'ઘણી રસોઈમાં કામ આવે છે', 'પેટ ભરનાર અને બજેટ-ફ્રેન્ડલી'],
      famousFor: ['Uttar Pradesh', 'West Bengal', 'Punjab', 'Bihar'],
      production: ['Indo-Gangetic plains', 'Storage-based supply chains', 'Major winter harvests'],
      bestFor: ['વધુ ઊર્જા', 'રિકવરી મીલ્સ', 'મિક્સ વેજ ડિશ'],
      caution: ['બ્લડ શુગર સંભાળી રહ્યા હો તો માત્રા સંતુલિત રાખો'],
      imageAlt: 'બટાકા',
      searchQuery: 'બટાકા'
    },
    Onion: {
      title: 'ડુંગળી',
      description: 'ડુંગળી લગભગ દરેક ભારતીય ભોજનનો આધાર છે. તે મીઠાશ, ઊંડાણ અને સુગંધ ઉમેરે છે.',
      benefits: ['પ્રીબાયોટિક ફાઇબર', 'હૃદય આરોગ્યને સપોર્ટ કરે છે', 'પ્રાકૃતિક મીઠાશ', 'કાચા અને શેકેલા બંનેમાં ઉપયોગી'],
      famousFor: ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat'],
      production: ['Large-scale mandi supply', 'Storage and season-sensitive pricing', 'Used throughout India'],
      bestFor: ['પાચન સપોર્ટ', 'હાર્ટ-ફ્રેન્ડલી મીલ્સ', 'કાચા સલાડ'],
      caution: ['સંવેદનશીલ પાચનમાં કાચી ડુંગળી ભારે લાગી શકે છે'],
      imageAlt: 'ડુંગળી',
      searchQuery: 'ડુંગળી'
    },
    Tomato: {
      title: 'ટમેટાં',
      description: 'ટમેટાંમાં ખાટો-મીઠો સંતુલન હોય છે. ગ્રેવી, ચટણી, સોસ અને તાજા સલાડ માટે તે મુખ્ય ઘટક છે.',
      benefits: ['લાઇકોપીનથી ભરપૂર', 'હાઇડ્રેશનમાં મદદ', 'ત્વચા અને હૃદય આરોગ્યને સપોર્ટ', 'ઓછી કેલરીમાં સ્વાદ વધારશે'],
      famousFor: ['Karnataka', 'Andhra Pradesh', 'Madhya Pradesh', 'Odisha'],
      production: ['Open-field farms', 'Polyhouse cultivation', 'Year-round kitchen demand'],
      bestFor: ['હૃદય-મિત્ર આહાર', 'હાઇડ્રેશન', 'સોસ અને તાજા સલાડ'],
      caution: ['એસિડિટી હોય તો શેકેલા ટમેટાં વધુ સારાં લાગે છે'],
      imageAlt: 'ટમેટાં',
      searchQuery: 'ટમેટાં'
    },
    Carrot: {
      title: 'ગાજર',
      description: 'ગાજર તેના તેજસ્વી કેસરિયા રંગ માટે જાણીતી છે. તે કાચી, જ્યુસ, સલાડ અને હલવામાં લોકપ્રિય છે.',
      benefits: ['વિટામિન A સપોર્ટ', 'આંખોની તંદુરસ્તી માટે સારી', 'કુરકુરી અને પેટભરી', 'કાચી કે શેકેલી બંને રીતે ઉપયોગી'],
      famousFor: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra'],
      production: ['Winter harvest markets', 'Salad and juice supply chains', 'Root-crop regions'],
      bestFor: ['આંખોનો સપોર્ટ', 'બાળકો માટે નાસ્તો', 'શિયાળાનું ખાવાનું'],
      caution: ['જ્યુસ whole carrot કરતા ખાંડ વધુ ઝડપથી વધારી શકે છે'],
      imageAlt: 'ગાજર',
      searchQuery: 'ગાજર'
    },
    Spinach: {
      title: 'પાલક',
      description: 'પાલક પાંદડાવાળી લીલી શાકભાજી છે જેમાં આયર્ન અને ફોલેટ સારી માત્રામાં હોય છે. તે દાળ, સાગ અને સૂપમાં સરસ લાગે છે.',
      benefits: ['પાંદડામાંથી આયર્ન સપોર્ટ', 'ફોલેટનો સારો સ્ત્રોત', 'ઓછી કૅલરી ઘનતા', 'દાળ, સાગ અને સૂપમાં ઉપયોગી'],
      famousFor: ['Punjab', 'Haryana', 'Karnataka', 'Maharashtra'],
      production: ['Cool-season farms', 'Urban market gardens', 'Fresh bunch supply'],
      bestFor: ['એનિમિયા-સપોર્ટિવ મીલ્સ', 'વજન-જાગૃત આહાર', 'આયર્ન અને ફોલેટ intake'],
      caution: ['કિડની સ્ટોનની શક્યતા હોય તો ઓક્સાલેટ અંગે ડૉક્ટરની સલાહ લો'],
      imageAlt: 'પાલક',
      searchQuery: 'પાલક'
    },
    Cucumber: {
      title: 'કાકડી',
      description: 'કાકડી ઠંડી, કુરકુરું અને હાઇડ્રેશન-ફ્રેન્ડલી છે. સલાડ અને ઝડપી નાસ્તા માટે તે ઉત્તમ છે.',
      benefits: ['પાણીનું પ્રમાણ ખૂબ વધારે', 'ઠંડક આપે છે', 'સલાડ માટે ઉત્તમ', 'કૅલરી ઓછી'],
      famousFor: ['Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Gujarat'],
      production: ['Salad belts near cities', 'Summer markets', 'Household demand rises in hot weather'],
      bestFor: ['હાઇડ્રેશન', 'હળવું ભોજન', 'ઉનાળાનો આહાર'],
      caution: ['ખૂબ ઠંડી કાકડી સંવેદનશીલ ગળાને તકલીફ આપી શકે છે'],
      imageAlt: 'કાકડી',
      searchQuery: 'કાકડી'
    },
    Beetroot: {
      title: 'ચુકંદર',
      description: 'ચુકંદર તેના ઊંડા લાલ રંગ, માટી જેવા સ્વાદ અને જ્યૂસ, સલાડ અને વેલનેસ બાઉલ્સમાં ઉપયોગ માટે ઓળખાય છે.',
      benefits: ['સ્ટેમિના સપોર્ટ કરી શકે છે', 'રક્તપ્રવાહને સપોર્ટ કરે છે', 'પ્રાકૃતિક રંગ અને મીઠાશ', 'કાચું, રોસ્ટેડ અથવા જ્યૂસ તરીકે સારું'],
      famousFor: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh'],
      production: ['Cool-weather roots', 'Juice and salad demand', 'Local vegetable markets'],
      bestFor: ['સ્ટેમિના રૂટીન્સ', 'વર્કઆઉટ પહેલાં', 'સલાડ અને ડિટોક્સ-સ્ટાઇલ આહાર'],
      caution: ['ડાઘ પડે છે અને કેટલાક લોકોમાં ઓક્સાલેટ વધારી શકે છે'],
      imageAlt: 'ચુકંદર',
      searchQuery: 'ચુકંદર'
    },
    Cauliflower: {
      title: 'ફૂલકોબી',
      description: 'ફૂલકોબી શિયાળાની મનપસંદ શાકભાજી છે. આલૂ-ફૂલકોબી, સુકી ભાજી અને લો-કાર્બ મીલ્સમાં તે ખૂબ વપરાય છે.',
      benefits: ['ઓછી કૅલરી', 'ફાઇબરનો સારો સ્ત્રોત', 'ચોખા અથવા મેશનો વિકલ્પ', 'શિયાળાની રેસિપીઓમાં લોકપ્રિય'],
      famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh'],
      production: ['Cool-season fields', 'Winter supply chains', 'Household and restaurant demand'],
      bestFor: ['વજન-જાગૃત મીલ્સ', 'ફાઇબર intake', 'શિયાળાનો રસોઈ'],
      caution: ['વધારે પકાવવાથી અથવા વધારે ખાવાથી કેટલાકને ગેસ થઈ શકે છે'],
      imageAlt: 'ફૂલકોબી',
      searchQuery: 'ફૂલકોબી'
    },
    Cabbage: {
      title: 'પત્તાગોભી',
      description: 'પત્તાગોભી કુરકુરી અને બહુઉપયોગી છે. તે ભાજી, સ્લૉ, પરાઠા સ્ટફિંગ અને રોલ્સમાં વપરાય છે.',
      benefits: ['પાચન માટે ફાઇબર', 'ઓછી કૅલરી', 'બજેટ-ફ્રેન્ડલી', 'સલાડ અને સ્ટિર-ફ્રાય માટે સારી'],
      famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Maharashtra'],
      production: ['Cool-weather vegetable belts', 'Local market farms', 'Large household demand'],
      bestFor: ['પાચન', 'હળવું ભોજન', 'બજેટ કુકિંગ'],
      caution: ['સંવેદનશીલ પેટમાં ગેસ કરી શકે છે'],
      imageAlt: 'પત્તાગોભી',
      searchQuery: 'પત્તાગોભી'
    },
    Okra: {
      title: 'ભીંડા',
      description: 'ભીંડા ભારતીય રસોઈની ખૂબ પસંદગીની રોજિંદી શાકભાજી છે. તે સુકી ભાજીમાં અને ડુંગળી-ટમેટા સાથે સરસ લાગે છે.',
      benefits: ['સારો ફાઇબર સ્ત્રોત', 'બ્લડ શુગર મેનેજમેન્ટમાં મદદ કરી શકે છે', 'ભારતીય રસોઈમાં લોકપ્રિય', 'ફોલેટ અને વિટામિન C આપે છે'],
      famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
      production: ['Warm-weather farms', 'Kitchen-garden staple', 'High daily fresh demand'],
      bestFor: ['પાચન', 'બ્લડ શુગર mindful meals', 'ફાઇબર intake'],
      caution: ['વધારે પકાવવાથી ચીકણી થઈ શકે છે'],
      imageAlt: 'ભીંડા',
      searchQuery: 'ભીંડા'
    },
    Brinjal: {
      title: 'રીંગણ',
      description: 'રીંગણ smoky અને નરમ સ્વાદ ધરાવે છે. ભરેલું રીંગણ, ભરથું અને કરીમાં તે બહુ લોકપ્રિય છે.',
      benefits: ['ફાઇબરથી ભરપૂર', 'સ્વાદને સારી રીતે શોષે છે', 'રોસ્ટેડ ડિશ માટે સારું', 'ઓછી કૅલરી'],
      famousFor: ['Maharashtra', 'West Bengal', 'Bihar', 'Karnataka'],
      production: ['Warm-season vegetable farms', 'Village and peri-urban supply', 'Used across India'],
      bestFor: ['ફાઇબર intake', 'ભરથું-સ્ટાઇલ ડિશ', 'લો-કૅલરી મીલ્સ'],
      caution: ['સંવેદનશીલ લોકોને સારી રીતે રાંધેલું રીંગણ વધુ સારું લાગે છે'],
      imageAlt: 'રીંગણ',
      searchQuery: 'રીંગણ'
    }
  },
  ta: {
    'Green Chilli': {
      title: 'பச்சை மிளகாய்',
      description: 'பச்சை மிளகாய் தாளிப்பு மற்றும் இறுதி காரம் சேர்க்க பயன்படுகிறது. அதன் மணமும் காரமும் உணவுக்கு உடனடி تازத்தன்மை தருகிறது.',
      benefits: ['மெட்டபாலிசத்தை ஆதரிக்கலாம்', 'சிறிதளவில் செரிமானத்துக்கு உதவும்', 'வைட்டமின் C அதிகம்', 'குறைந்த கலோரியில் சுவை சேர்க்கும்'],
      famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
      production: ['North India kitchen markets', 'South Indian spice belts', 'Local mandi supply through the year'],
      bestFor: ['லேசான சளி/மூச்சுத்திணறல்', 'பசியை ஆதரிக்க', 'குறைந்த கலோரி சுவை'],
      caution: ['அமிலத்தன்மை அல்லது வாய்ப்புண் இருந்தால் அதிகம் எடுத்துக்கொள்ள வேண்டாம்'],
      imageAlt: 'பச்சை மிளகாய்',
      searchQuery: 'பச்சை மிளகாய்'
    },
    Ginger: {
      title: 'இஞ்சி',
      description: 'இஞ்சி தேநீர், குழம்பு, ஊறுகாய் மற்றும் வீட்டு மருத்துவத்தில் அதிகம் பயன்படுத்தப்படுகிறது. இதன் சூடான வாசனையும் சுவையும் சிறப்பு.',
      benefits: ['குமட்டலை குறைக்க உதவும்', 'செரிமானத்தை ஆதரிக்கும்', 'அழற்சி-எதிர்ப்பு பாரம்பரியம்', 'குளிர்காலத்தில் உடலை சூடாக்கும்'],
      famousFor: ['Kerala', 'Karnataka', 'Odisha', 'Meghalaya'],
      production: ['Western Ghats farms', 'Hill regions', 'Smallholder spice cultivation'],
      bestFor: ['செரிமானம்', 'Motion sickness', 'குளிர்கால ஆறுதல்'],
      caution: ['இரத்தத்தை மெல்லச் செய்யும் மருந்துகள் எடுத்தால் அளவைக் குறைக்கவும்'],
      imageAlt: 'இஞ்சி',
      searchQuery: 'இஞ்சி'
    },
    Garlic: {
      title: 'பூண்டு',
      description: 'பூண்டு இந்திய சமையலின் முக்கிய அடிப்படை. இதன் வாசனை கிரேவி, பருப்பு மற்றும் தாளிப்புக்கு ஆழமான சுவை கொடுக்கிறது.',
      benefits: ['இதயத்திற்கு உதவும் kitchen staple', 'நோய் எதிர்ப்பு சக்தியை ஆதரிக்கும்', 'கொலஸ்ட்ரால் சமநிலைக்கு உதவலாம்', 'வலுவான antimicrobial புகழ்'],
      famousFor: ['Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Uttar Pradesh'],
      production: ['Dry-land farming belts', 'Stored and traded widely across India', 'Year-round kitchen demand'],
      bestFor: ['இதய ஆரோக்கியம்', 'மौசுமை நோய் எதிர்ப்பு', 'குறைந்த கொழுப்பில் சுவை'],
      caution: ['பச்சையாக எடுத்தால் செரிமானம் சென்சிடிவாக இருப்பவர்களுக்கு தொந்தரவு தரலாம்'],
      imageAlt: 'பூண்டு',
      searchQuery: 'பூண்டு'
    },
    Potato: {
      title: 'உருளைக்கிழங்கு',
      description: 'உருளைக்கிழங்கு வீட்டுச் சமையலின் மிகப் பல்துறை காய்கறி. குழம்பு, ஸ்நாக்ஸ், பராத்தா மற்றும் பண்டிகை உணவுகளில் இது முக்கியம்.',
      benefits: ['சிறந்த ஆற்றல் மூலம்', 'பொட்டாசியம் தருகிறது', 'பல சமையல்களில் பயன்படும்', 'வயிறு நிறைக்கும் மற்றும் பொருளாதாரமானது'],
      famousFor: ['Uttar Pradesh', 'West Bengal', 'Punjab', 'Bihar'],
      production: ['Indo-Gangetic plains', 'Storage-based supply chains', 'Major winter harvests'],
      bestFor: ['கூடுதல் ஆற்றல்', 'மீட்பு உணவுகள்', 'கலவை காய்கறி உணவுகள்'],
      caution: ['ரத்த சர்க்கரையை கவனிக்கிறீர்கள் என்றால் அளவைக் கட்டுப்படுத்தவும்'],
      imageAlt: 'உருளைக்கிழங்கு',
      searchQuery: 'உருளைக்கிழங்கு'
    },
    Onion: {
      title: 'வெங்காயம்',
      description: 'வெங்காயம் כמעט every இந்திய உணவின் அடிப்படை. இது இனிப்பு, ஆழம் மற்றும் மணத்தை சேர்க்கிறது.',
      benefits: ['ப்ரீபயாடிக் நார்ச்சத்து', 'இதய ஆரோக்கியத்தை ஆதரிக்கும்', 'இயற்கை இனிப்பு', 'பச்சையாகவும் சமைத்தும் பயன்படும்'],
      famousFor: ['Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Gujarat'],
      production: ['Large-scale mandi supply', 'Storage and season-sensitive pricing', 'Used throughout India'],
      bestFor: ['செரிமான ஆதரவு', 'இதய-நட்பு உணவுகள்', 'பச்சை சாலட் தட்டுகள்'],
      caution: ['சென்சிடிவ் செரிமானத்திற்கு பச்சை வெங்காயம் கடினமாக இருக்கலாம்'],
      imageAlt: 'வெங்காயம்',
      searchQuery: 'வெங்காயம்'
    },
    Tomato: {
      title: 'தக்காளி',
      description: 'தக்காளி புளிப்பு-இனிப்பு சமநிலையைக் கொடுக்கும். கிரேவி, சட்னி, சாஸ் மற்றும் பசுமை சாலட்களுக்கு இது அத்தியாவசியம்.',
      benefits: ['லைகோபீன் நிறைந்தது', 'நீர்ப்பூர்த்திக்கு உதவும்', 'தோல் மற்றும் இதய ஆரோக்கியத்தை ஆதரிக்கும்', 'குறைந்த கலோரியில் சுவை கூட்டும்'],
      famousFor: ['Karnataka', 'Andhra Pradesh', 'Madhya Pradesh', 'Odisha'],
      production: ['Open-field farms', 'Polyhouse cultivation', 'Year-round kitchen demand'],
      bestFor: ['இதய-நட்பு diet', 'நீர்ப்பூர்த்தி', 'சாஸ் மற்றும் fresh salads'],
      caution: ['அமிலத்தன்மை உள்ளவர்கள் சமைத்த தக்காளியை விரும்பலாம்'],
      imageAlt: 'தக்காளி',
      searchQuery: 'தக்காளி'
    },
    Carrot: {
      title: 'கேரட்',
      description: 'கேரட் அதன் ஆரஞ்சு நிறத்திற்காக அறியப்படுகிறது. இது பச்சையாக, ஜூஸாக, சாலட்டாக மற்றும் ஹல்வாவாகப் பயன்படுகிறது.',
      benefits: ['வைட்டமின் A ஆதரவு', 'கண் ஆரோக்கியத்திற்கு நல்லது', 'கிரஞ்சியானதும் நிறைவானதும்', 'பச்சையாகவும் சமைத்தும் பயன்படுத்தலாம்'],
      famousFor: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra'],
      production: ['Winter harvest markets', 'Salad and juice supply chains', 'Root-crop regions'],
      bestFor: ['கண் ஆரோக்கியம்', 'குழந்தைகளுக்கான ஸ்நாக்ஸ்', 'குளிர்கால உணவு'],
      caution: ['ஜூஸ் whole carrot-ஐ விட சர்க்கரையை விரைவாக உயர்த்தலாம்'],
      imageAlt: 'கேரட்',
      searchQuery: 'கேரட்'
    },
    Spinach: {
      title: 'பசலைக்கீரை',
      description: 'பசலைக்கீரை இரும்பும் folate-மும் நிறைந்த இலைகீரை. இது பருப்பு, சாக் மற்றும் சூப்பில் அருமையாக இருக்கும்.',
      benefits: ['இலை இரும்பு ஆதரவு', 'ஃபோலேட் நல்ல மூலம்', 'குறைந்த கலோரி அடர்த்தி', 'பருப்பு, சாக், சூப்பில் பயன்படும்'],
      famousFor: ['Punjab', 'Haryana', 'Karnataka', 'Maharashtra'],
      production: ['Cool-season farms', 'Urban market gardens', 'Fresh bunch supply'],
      bestFor: ['அனீமியா-ஆதரவு உணவுகள்', 'எடை கவனமான உணவு', 'இரும்பு மற்றும் folate'],
      caution: ['கிட்னி ஸ்டோன் பிரச்சனை இருந்தால் oxalate குறித்து மருத்துவரை கேளுங்கள்'],
      imageAlt: 'பசலைக்கீரை',
      searchQuery: 'பசலைக்கீரை'
    },
    Cucumber: {
      title: 'வெள்ளரிக்காய்',
      description: 'வெள்ளரிக்காய் குளிர்ச்சியானது, மொறுமொறுப்பானது, நீர்ப்பூர்த்திக்கு நல்லது. சாலட்கள் மற்றும் விரைவு ஸ்நாக்ஸுக்கு சிறந்தது.',
      benefits: ['நீர் அளவு அதிகம்', 'குளிர்ச்சி தரும்', 'சாலட்களுக்கு சிறப்பு', 'குறைந்த கலோரி'],
      famousFor: ['Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Gujarat'],
      production: ['Salad belts near cities', 'Summer markets', 'Household demand rises in hot weather'],
      bestFor: ['நீர்ப்பூர்த்தி', 'லேசான உணவுகள்', 'கோடை diet'],
      caution: ['மிகக் குளிர்ந்த வெள்ளரிக்காய் சென்சிடிவ் throat-ஐ தொந்தரவு செய்யலாம்'],
      imageAlt: 'வெள்ளரிக்காய்',
      searchQuery: 'வெள்ளரிக்காய்'
    },
    Beetroot: {
      title: 'பீட்ரூட்',
      description: 'பீட்ரூட் அதன் ஆழமான சிவப்பு நிறம், மண் வாசனை, ஜூஸ் மற்றும் சாலட்களில் பயன்பாடு ஆகியவற்றால் அறியப்படுகிறது.',
      benefits: ['ஸ்டாமினாவை ஆதரிக்கலாம்', 'இரத்த ஓட்டத்தை ஆதரிக்கும்', 'இயற்கை நிறம் மற்றும் இனிப்பு', 'பச்சையாகவும், ரோஸ்ட் செய்தும், ஜூஸாகவும் நல்லது'],
      famousFor: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh'],
      production: ['Cool-weather roots', 'Juice and salad demand', 'Local vegetable markets'],
      bestFor: ['ஸ்டாமினா routines', 'Workout முன் உணவு', 'சாலட்கள் மற்றும் detox-style meals'],
      caution: ['கறை படிந்துவிடும், சிலருக்கு oxalate அதிகரிக்கலாம்'],
      imageAlt: 'பீட்ரூட்',
      searchQuery: 'பீட்ரூட்'
    },
    Cauliflower: {
      title: 'பூக்கோசு',
      description: 'பூக்கோசு குளிர்காலத்தின் மிகவும் விருப்பமான காய்கறி. ஆலு-பூக்கோசு, dry sabzi, low-carb meals-ல் அதிகம் பயன்படும்.',
      benefits: ['குறைந்த கலோரி', 'நல்ல நார்ச்சத்து மூலம்', 'அரிசி அல்லது மாஷ் மாற்றாக பயன்படும்', 'குளிர்கால சமையல்களில் பிரபலம்'],
      famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Uttar Pradesh'],
      production: ['Cool-season fields', 'Winter supply chains', 'Household and restaurant demand'],
      bestFor: ['எடை கவனமான உணவு', 'நார்ச்சத்து intake', 'குளிர்கால cooking'],
      caution: ['அதிகமாக சமைத்தால் சிலருக்கு bloating வரலாம்'],
      imageAlt: 'பூக்கோசு',
      searchQuery: 'பூக்கோசு'
    },
    Cabbage: {
      title: 'முட்டைக்கோஸ்',
      description: 'முட்டைக்கோஸ் மொறுமொறுப்பானதும் பல்துறை பயன்பாட்டுடையதும். இது sabzi, slaw, paratha stuffing மற்றும் rolls-ல் பயன்படும்.',
      benefits: ['செரிமானத்துக்கான நார்ச்சத்து', 'குறைந்த கலோரி', 'பட்ஜெட்-நட்பு', 'சாலட் மற்றும் stir-fry-க்கு சிறப்பு'],
      famousFor: ['Punjab', 'Haryana', 'West Bengal', 'Maharashtra'],
      production: ['Cool-weather vegetable belts', 'Local market farms', 'Large household demand'],
      bestFor: ['செரிமானம்', 'லேசான உணவு', 'பட்ஜெட் cooking'],
      caution: ['சென்சிடிவ் வயிற்றில் gas வரலாம்'],
      imageAlt: 'முட்டைக்கோஸ்',
      searchQuery: 'முட்டைக்கோஸ்'
    },
    Okra: {
      title: 'வெண்டைக்காய்',
      description: 'வெண்டைக்காய் இந்திய வீட்டு சமையலில் மிகவும் பிடித்த தினசரி காய்கறி. இது dry sabzi-யில் சிறப்பாக இருக்கும்.',
      benefits: ['நல்ல நார்ச்சத்து மூலம்', 'ரத்த சர்க்கரை மேலாண்மைக்கு உதவலாம்', 'இந்திய சமையலில் பிரபலம்', 'ஃபோலேட் மற்றும் வைட்டமின் C உள்ளது'],
      famousFor: ['Gujarat', 'Maharashtra', 'Andhra Pradesh', 'Karnataka'],
      production: ['Warm-weather farms', 'Kitchen-garden staple', 'High daily fresh demand'],
      bestFor: ['செரிமானம்', 'blood sugar mindful meals', 'நார்ச்சத்து intake'],
      caution: ['அதிகமாக சமைத்தால் slime ஆகலாம்'],
      imageAlt: 'வெண்டைக்காய்',
      searchQuery: 'வெண்டைக்காய்'
    },
    Brinjal: {
      title: 'கத்திரிக்காய்',
      description: 'கத்திரிக்காய் smoky மற்றும் மென்மையான சுவை கொண்டது. bharta, curry மற்றும் stuffed recipes-ல் இது மிகவும் பிரபலம்.',
      benefits: ['நார்ச்சத்து நிறைந்தது', 'சுவையை நன்றாக உறிஞ்சும்', 'ரோஸ்ட் செய்யப்பட்ட dishes-க்கு நல்லது', 'குறைந்த கலோரி'],
      famousFor: ['Maharashtra', 'West Bengal', 'Bihar', 'Karnataka'],
      production: ['Warm-season vegetable farms', 'Village and peri-urban supply', 'Used across India'],
      bestFor: ['நார்ச்சத்து intake', 'Bharta-style dishes', 'low-calorie meals'],
      caution: ['சென்சிடிவ் people-க்கு நன்றாக சமைத்த கத்திரிக்காய் சிறந்தது'],
      imageAlt: 'கத்திரிக்காய்',
      searchQuery: 'கத்திரிக்காய்'
    }
  }
};

const normalizeText = (value) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9\s]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getProfile = (productName) => {
  const source = normalizeText(productName);

  return (
    VEGETABLE_PROFILES.find((profile) => profile.matchers.some((matcher) => source.includes(matcher))) ??
    DEFAULT_PROFILE
  );
};

export const buildGoogleImagesUrl = (productName) => {
  const query = `${String(productName ?? '').trim() || DEFAULT_PROFILE.englishName} vegetable`;
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(query)}`;
};

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'mr', label: 'Marathi' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'ta', label: 'Tamil' }
];

export const MODAL_TRANSLATIONS = {
  en: {
    commandLabel: 'AI Veg Info',
    languageLabel: 'Language',
    packSize: 'Pack size',
    freshSelection: 'Fresh market selection',
    snapshot: 'Vegetable Snapshot',
    quickNotes: 'Quick Notes',
    health: 'Health',
    bestFor: 'Best For',
    bestForHint: 'Who should eat this more often',
    generalKnowledge: 'General Knowledge',
    famousIn: 'Famous in',
    production: 'Major production / supply',
    googleImages: 'Open Google Images',
    calories: 'Calories',
    protein: 'Protein',
    fiber: 'Fiber',
    water: 'Water',
    per100g: 'per 100 g',
    approx: 'approx.',
  },
  hi: {
    commandLabel: 'एआई वेज इन्फो',
    languageLabel: 'भाषा',
    packSize: 'पैक साइज',
    freshSelection: 'ताज़ा बाजार चयन',
    snapshot: 'सब्ज़ी की जानकारी',
    quickNotes: 'त्वरित नोट्स',
    health: 'सेहत',
    bestFor: 'किसके लिए अच्छा है',
    bestForHint: 'इसे किन लोगों को ज्यादा खाना चाहिए',
    generalKnowledge: 'सामान्य जानकारी',
    famousIn: 'कहां प्रसिद्ध है',
    production: 'मुख्य उत्पादन / आपूर्ति',
    googleImages: 'Google Images खोलें',
    calories: 'कैलोरी',
    protein: 'प्रोटीन',
    fiber: 'फाइबर',
    water: 'पानी',
    per100g: '100 ग्राम में',
    approx: 'लगभग',
  },
  mr: {
    commandLabel: 'एआय भाजी माहिती',
    languageLabel: 'भाषा',
    packSize: 'पॅक साइज',
    freshSelection: 'ताज्या बाजारातील निवड',
    snapshot: 'भाजी माहिती',
    quickNotes: 'त्वरित नोंदी',
    health: 'आरोग्य',
    bestFor: 'कोणासाठी योग्य',
    bestForHint: 'हे कोणाला जास्त खावे',
    generalKnowledge: 'सामान्य माहिती',
    famousIn: 'कुठे प्रसिद्ध आहे',
    production: 'मुख्य उत्पादन / पुरवठा',
    googleImages: 'Google Images उघडा',
    calories: 'कॅलरी',
    protein: 'प्रथिने',
    fiber: 'तंतू',
    water: 'पाणी',
    per100g: '100 ग्रॅममध्ये',
    approx: 'अंदाजे',
  },
  gu: {
    commandLabel: 'એઆઈ શાકભાજી માહિતી',
    languageLabel: 'ભાષા',
    packSize: 'પૅક સાઇઝ',
    freshSelection: 'તાજું બજાર પસંદગી',
    snapshot: 'શાકભાજી માહિતી',
    quickNotes: 'ઝડપી નોંધો',
    health: 'આરોગ્ય',
    bestFor: 'કેમ માટે યોગ્ય',
    bestForHint: 'આ કોને વધુ ખાવું જોઈએ',
    generalKnowledge: 'સામાન્ય જાણકારી',
    famousIn: 'ક્યાં પ્રસિદ્ધ છે',
    production: 'મુખ્ય ઉત્પાદન / પુરવઠો',
    googleImages: 'Google Images ખોલો',
    calories: 'કૅલરી',
    protein: 'પ્રોટીન',
    fiber: 'ફાઈબર',
    water: 'પાણી',
    per100g: '100 ગ્રામમાં',
    approx: 'આશરે',
  },
  ta: {
    commandLabel: 'AI காய்கறி தகவல்',
    languageLabel: 'மொழி',
    packSize: 'பேக் அளவு',
    freshSelection: 'புதிய சந்தைத் தேர்வு',
    snapshot: 'காய்கறி தகவல்',
    quickNotes: 'விரைவு குறிப்புகள்',
    health: 'ஆரோக்கியம்',
    bestFor: 'யாருக்கு நல்லது',
    bestForHint: 'யார் இதை அதிகம் சாப்பிட வேண்டும்',
    generalKnowledge: 'பொது தகவல்',
    famousIn: 'எங்கு பிரபலமாக உள்ளது',
    production: 'முக்கிய உற்பத்தி / வழங்கல்',
    googleImages: 'Google Images திறக்கவும்',
    calories: 'கலோரி',
    protein: 'புரதம்',
    fiber: 'நார்ச்சத்து',
    water: 'நீர்',
    per100g: '100 கிராமுக்கு',
    approx: 'சுமார்',
  }
};

export const getVegetableInfo = (product, language = 'en') => {
  const profile = getProfile(product?.name);
  const copy = MODAL_TRANSLATIONS[language] ?? MODAL_TRANSLATIONS.en;
  const localizedProfile = LOCALIZED_VEGETABLE_CONTENT[language]?.[profile.englishName] ?? {};
  const displayTitle = localizedProfile.title ?? profile.hindiName ?? profile.englishName;
  const searchQuery = localizedProfile.searchQuery ?? profile.imageSearchQuery ?? product?.name;
  const googleImagesUrl = buildGoogleImagesUrl(searchQuery);

  return {
    ...DEFAULT_PROFILE,
    ...profile,
    ...localizedProfile,
    googleImagesUrl,
    displayTitle,
    subtitle: product?.weight ? `${copy.packSize}: ${product.weight}` : copy.freshSelection,
    productName: product?.name ?? displayTitle,
    imageAlt: localizedProfile.imageAlt ?? `${displayTitle} vegetable`,
    stats: [
      { label: copy.calories, value: `${profile.nutrition.calories} kcal`, hint: copy.per100g },
      { label: copy.protein, value: `${profile.nutrition.protein} g`, hint: copy.per100g },
      { label: copy.fiber, value: `${profile.nutrition.fiber} g`, hint: copy.per100g },
      { label: copy.water, value: `${profile.nutrition.water}%`, hint: copy.approx }
    ]
  };
};