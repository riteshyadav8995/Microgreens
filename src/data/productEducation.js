/**
 * Product education fields (Awareness BRD §10, §15), merged into each product by services/api.js.
 * Kept separate so the business can review/replace this copy without touching catalogue data.
 *
 * - botanicalName: scientific name (combos have none — they list ingredients instead)
 * - texture:   how it feels to eat
 * - mealTypes: keys of MEAL_TYPES in content.js
 * - howToEat:  'raw' | 'raw-or-warm' — VERIFY against real brand guidance and packaging
 * - bestWays:  everyday Indian ways to use it
 */
const RAW = 'raw';
const BOTH = 'raw-or-warm';

export const productEducation = {
  'broccoli-microgreens': {
    botanicalName: 'Brassica oleracea var. italica',
    texture: 'Tender stems, soft leaves',
    mealTypes: ['breakfast', 'lunch', 'dinner', 'smoothie', 'garnish'],
    howToEat: BOTH,
    bestWays: ['On toast or in a sandwich', 'Blended into a green smoothie', 'On top of dal-chawal or khichdi', 'Folded into raita'],
  },
  'radish-microgreens': {
    botanicalName: 'Raphanus sativus',
    texture: 'Crisp and juicy',
    mealTypes: ['lunch', 'snack', 'garnish'],
    howToEat: RAW,
    bestWays: ['Sprinkled on papdi chaat or bhel', 'Inside kathi rolls and wraps', 'In a quick lemon salad', 'Garnish on dosa or starters'],
  },
  'mustard-microgreens': {
    botanicalName: 'Brassica juncea',
    texture: 'Soft leaves with a light crunch',
    mealTypes: ['lunch', 'dinner', 'snack', 'garnish'],
    howToEat: BOTH,
    bestWays: ['A pinch on dal or sarson-style sabzi after cooking', 'In bhel and chaat', 'With paneer or egg bhurji', 'In sandwiches for heat'],
  },
  'sunflower-microgreens': {
    botanicalName: 'Helianthus annuus',
    texture: 'Thick, juicy and crunchy',
    mealTypes: ['breakfast', 'lunch', 'snack', 'smoothie'],
    howToEat: RAW,
    bestWays: ['Folded into masala dosa', 'In roti wraps and sandwiches', 'As a salad base', 'Straight from the box as a snack'],
  },
  'pea-shoots': {
    botanicalName: 'Pisum sativum',
    texture: 'Tender with curly tendrils',
    mealTypes: ['breakfast', 'lunch', 'dinner'],
    howToEat: BOTH,
    bestWays: ['Inside besan chilla or paratha', 'Folded into pulao after cooking', 'Quick toss in stir-fries', 'In salads and sandwiches'],
  },
  'kale-microgreens': {
    botanicalName: 'Brassica oleracea var. sabellica',
    texture: 'Soft and delicate',
    mealTypes: ['breakfast', 'lunch', 'smoothie'],
    howToEat: RAW,
    bestWays: ['Blended into smoothies', 'In wraps and bowls', 'On top of khichdi or soup'],
  },
  'red-cabbage-microgreens': {
    botanicalName: 'Brassica oleracea var. capitata f. rubra',
    texture: 'Crisp stems, soft leaves',
    mealTypes: ['lunch', 'dinner', 'garnish'],
    howToEat: RAW,
    bestWays: ['Colourful topping on raita', 'In salads and sandwiches', 'On jeera rice or pulao'],
  },
  'kohlrabi-microgreens': {
    botanicalName: 'Brassica oleracea var. gongylodes',
    texture: 'Crisp with a clean snap',
    mealTypes: ['lunch', 'garnish'],
    howToEat: RAW,
    bestWays: ['In salads', 'In sandwiches', 'As a garnish on soups'],
  },
  'pak-choi-microgreens': {
    botanicalName: 'Brassica rapa subsp. chinensis',
    texture: 'Juicy and tender',
    mealTypes: ['lunch', 'dinner', 'garnish'],
    howToEat: BOTH,
    bestWays: ['Over hakka noodles or fried rice', 'On clear soups', 'In salads'],
  },
  'cauliflower-microgreens': {
    botanicalName: 'Brassica oleracea var. botrytis',
    texture: 'Tender with a light crunch',
    mealTypes: ['lunch', 'dinner', 'garnish'],
    howToEat: RAW,
    bestWays: ['In sandwiches', 'On raita', 'Over aloo-gobhi'],
  },
  'methi-microgreens': {
    botanicalName: 'Trigonella foenum-graecum',
    texture: 'Soft, delicate leaves',
    mealTypes: ['breakfast', 'lunch', 'dinner', 'garnish'],
    howToEat: BOTH,
    bestWays: ['Stirred into dal or kadhi after the tadka', 'Kneaded into thepla or paratha dough', 'In aloo methi', 'On raita'],
  },
  'coriander-microgreens': {
    botanicalName: 'Coriandrum sativum',
    texture: 'Very delicate',
    mealTypes: ['breakfast', 'lunch', 'dinner', 'snack', 'garnish'],
    howToEat: RAW,
    bestWays: ['On poha, upma and chaat', 'Blended into green chutney', 'Finishing dal and curries', 'On raita'],
  },
  'amaranth-microgreens': {
    botanicalName: 'Amaranthus tricolor',
    texture: 'Soft and delicate',
    mealTypes: ['lunch', 'dinner', 'garnish'],
    howToEat: RAW,
    bestWays: ['Folded into raita (it turns pink!)', 'On dosa and idli plates', 'In salads'],
  },
  'basil-microgreens': {
    botanicalName: 'Ocimum basilicum',
    texture: 'Soft, aromatic leaves',
    mealTypes: ['lunch', 'dinner', 'garnish', 'smoothie'],
    howToEat: RAW,
    bestWays: ['On pasta and pizza', 'In nimbu pani or coolers', 'In sandwiches'],
  },
  'dill-microgreens': {
    botanicalName: 'Anethum graveolens',
    texture: 'Feathery and soft',
    mealTypes: ['lunch', 'dinner', 'garnish'],
    howToEat: BOTH,
    bestWays: ['Stirred into moong dal', 'In suva-aloo', 'In raita and potato salad'],
  },
  'parsley-microgreens': {
    botanicalName: 'Petroselinum crispum',
    texture: 'Soft and fresh',
    mealTypes: ['lunch', 'dinner', 'garnish'],
    howToEat: RAW,
    bestWays: ['On soups', 'In grain bowls', 'In sandwiches and dips'],
  },
  'chives-microgreens': {
    botanicalName: 'Allium schoenoprasum',
    texture: 'Fine and grassy',
    mealTypes: ['breakfast', 'snack', 'garnish'],
    howToEat: RAW,
    bestWays: ['On chaat', 'In raita', 'On bhurji or omelettes', 'On cheese toast'],
  },
  wheatgrass: {
    botanicalName: 'Triticum aestivum',
    texture: 'Fibrous — best blended or juiced',
    mealTypes: ['breakfast', 'smoothie'],
    howToEat: RAW,
    bestWays: ['Blended with apple, amla or lemon', 'In green juices', 'As a small morning shot'],
  },
  'wheatgrass-live-tray': {
    botanicalName: 'Triticum aestivum',
    texture: 'Fibrous — best blended or juiced',
    mealTypes: ['breakfast', 'smoothie'],
    howToEat: RAW,
    bestWays: ['Cut fresh each morning for juices', 'In smoothies'],
  },
  'starter-mix': {
    texture: 'Mix of crunchy and tender',
    mealTypes: ['breakfast', 'lunch', 'dinner', 'smoothie'],
    howToEat: BOTH,
    bestWays: ['A different green each day of the week', 'Sandwiches, salads and smoothies', 'On top of dal-chawal'],
  },
  'salad-mix': {
    texture: 'Crunchy and colourful',
    mealTypes: ['lunch', 'dinner'],
    howToEat: RAW,
    bestWays: ['Ready-to-toss salads', 'Kathi rolls', 'Bowls'],
  },
  'chefs-mix': {
    texture: 'Delicate and colourful',
    mealTypes: ['dinner', 'snack', 'garnish'],
    howToEat: RAW,
    bestWays: ['Plating starters and chaat', 'Party platters', 'Pasta'],
  },
  'wellness-mix': {
    texture: 'Mix of fibrous and tender',
    mealTypes: ['breakfast', 'smoothie'],
    howToEat: RAW,
    bestWays: ['A week of smoothies', 'Green juices', 'Salads'],
  },
  'desi-tadka-mix': {
    texture: 'Soft leaves',
    mealTypes: ['breakfast', 'lunch', 'dinner', 'snack', 'garnish'],
    howToEat: BOTH,
    bestWays: ['Methi in dal, dhania on chaat, sarson for heat', 'On poha and parathas', 'Finishing sabzi'],
  },
};

export const HOW_TO_EAT_LABELS = {
  raw: 'Best eaten raw — add just before serving.',
  'raw-or-warm': 'Eat raw, or add to warm food after cooking. Avoid long cooking.',
};
