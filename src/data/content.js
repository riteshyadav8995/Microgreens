/**
 * Editorial content for storytelling pages (Home, Our Farm, Why Us, About).
 * VERIFY: process and brand statements describe a typical microgreen operation — confirm each with
 * the business before launch (BRD §4: claims must reflect the real business).
 */

import { products } from './products';

const farm = (name) => `/images/farm/${name}.webp`;
const recipe = (name) => `/images/recipes/${name}.webp`;

/**
 * Seed-to-table process (Awareness BRD §6–7). Timings are an EDUCATIONAL RANGE only — each product
 * shows its own variety-specific period. VERIFY every step against the real growing process.
 * `phase` drives the Seed → Germination → Growth → Harvest progress animation.
 */
export const growingSteps = [
  {
    id: 'seed-selection',
    title: 'Seed Selection',
    timing: 'Day 0',
    phase: 'seed',
    icon: 'Wheat',
    image: '/images/products/sunflower-seeds.webp',
    whatHappens: 'Suitable seeds are selected and prepared for the chosen variety.',
    explanation: 'Different varieties have different taste, colour and growth characteristics.',
    details: [
      'Every microgreen starts as a seed chosen for that crop — broccoli, radish, methi, sunflower and so on. We use seed lots meant for sprouting/microgreen growing rather than garden seed.',
      'Variety matters: it decides the flavour (mild broccoli vs peppery radish), the colour (green pea shoots vs magenta amaranth) and how long the crop takes to reach harvest.',
      'Larger seeds such as pea and sunflower are usually soaked for a few hours before sowing to help them start evenly.',
    ],
  },
  {
    id: 'seeding',
    title: 'Seeding',
    timing: 'Day 0',
    phase: 'seed',
    icon: 'LayoutGrid',
    image: farm('sowing'),
    whatHappens: 'Seeds are spread over the growing medium in trays.',
    explanation: 'Good, even distribution supports consistent growth.',
    details: [
      'Shallow trays are filled with a clean growing medium and lightly moistened.',
      'Seeds are spread densely but evenly across the surface. Too thick and they crowd each other; too thin and the tray looks patchy.',
      'Each tray is labelled with the variety and sowing date so it can be tracked all the way to harvest.',
    ],
  },
  {
    id: 'germination',
    title: 'Germination',
    timing: 'Day 1–3',
    phase: 'germination',
    icon: 'Droplets',
    image: farm('germination'),
    whatHappens: 'Seeds absorb moisture and begin to germinate.',
    explanation: 'Roots and shoots begin developing.',
    details: [
      'The seed soaks up water and swells. Its outer coat softens and splits.',
      'A tiny root (radicle) comes out first and anchors into the growing medium.',
      'Soon after, a pale shoot starts pushing upward. At this point it looks like a sprout — it is not yet a microgreen.',
    ],
  },
  {
    id: 'blackout',
    title: 'Early Growth / Blackout',
    timing: 'Day 2–5',
    phase: 'germination',
    icon: 'Moon',
    image: farm('blackout'),
    whatHappens: 'Some systems keep trays covered or in low light for a short time.',
    explanation: 'Young plants establish roots and stretch upward.',
    details: [
      'Where applicable, trays are covered or stacked for a short "blackout" period.',
      'In the dark, seedlings stretch upward looking for light, which gives straighter, taller stems that are easier to harvest.',
      'Covering also keeps humidity steady during this delicate stage. Not every variety or system uses this step.',
    ],
  },
  {
    id: 'light-growth',
    title: 'Light & Growth',
    timing: 'Day 4–10+',
    phase: 'growth',
    icon: 'Sun',
    image: farm('tray-row'),
    whatHappens: 'Plants receive suitable light, air and moisture.',
    explanation: 'Leaves open, turn green and develop colour and structure.',
    details: [
      'Once uncovered, seedlings are moved into light. Within a day or two the pale leaves turn green (or purple/red for varieties like radish and amaranth).',
      'Gentle airflow keeps the crop healthy, and watering from below keeps the leaves dry and clean.',
      'The first pair of leaves — the cotyledons — opens fully. For many varieties this is when flavour is at its best.',
    ],
  },
  {
    id: 'monitoring',
    title: 'Daily Monitoring',
    timing: 'Throughout',
    phase: 'growth',
    icon: 'ClipboardCheck',
    image: farm('tray-care'),
    whatHappens: 'Moisture, environment, cleanliness and crop condition are checked.',
    explanation: 'Quality is managed during the whole cycle, not just at the end.',
    details: ['Every tray is checked through the whole cycle, from sowing to harvest. A typical daily checklist:'],
    checklist: [
      'Moisture — growing medium damp, not waterlogged',
      'Environment — light, temperature and airflow in range',
      'Cleanliness — trays, racks and tools clean',
      'Crop health — even growth, colour and no signs of mould',
      'Harvest readiness — first leaves open for that variety',
    ],
  },
  {
    id: 'harvest',
    title: 'Harvest',
    timing: 'Often 7–21 days',
    phase: 'harvest',
    icon: 'Scissors',
    image: farm('harvest'),
    whatHappens: 'The crop is cut at the target stage for that variety.',
    explanation: 'Harvest timing affects texture, flavour and appearance.',
    details: [
      'There is no single harvest day. Radish may be ready in about a week, while coriander can take close to three weeks.',
      'Microgreens are cut just above the growing medium with clean tools — you eat the stem and leaves, not the root or seed.',
      'Harvesting too early gives weak flavour; too late and the leaves get tougher. Each variety has its own target stage.',
    ],
  },
  {
    id: 'post-harvest',
    title: 'Post-Harvest',
    timing: 'After harvest',
    phase: 'harvest',
    icon: 'Package',
    image: farm('packing'),
    whatHappens: 'Cut greens are handled, checked and packed.',
    explanation: 'Correct handling supports freshness.',
    details: [
      'Freshly cut greens are handled gently to avoid bruising.',
      'They are checked for quality, weighed and packed into ventilated boxes labelled with the harvest date.',
      'Keeping packed greens cool helps preserve freshness before they reach the kitchen. Handling instructions depend on the packaging and variety.',
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery',
    timing: 'After packing',
    phase: 'harvest',
    icon: 'Truck',
    image: farm('clamshell'),
    whatHappens: 'The order moves from the growing facility to your kitchen.',
    explanation: 'The seed-to-table journey is complete.',
    details: [
      'After packing, greens are transported with care. Availability and delivery arrangements should be confirmed before ordering.',
      'When your box arrives, refrigerate it straight away and rinse the greens gently just before eating.',
      'From seed to your table — usually in one to three weeks, depending on the variety.',
    ],
  },
];

export const PROCESS_PHASES = [
  { id: 'seed', label: 'Seed' },
  { id: 'germination', label: 'Germination' },
  { id: 'growth', label: 'Growth' },
  { id: 'harvest', label: 'Harvest' },
];

/** Awareness BRD §5 — Seed → Sprout → Microgreen → Mature plant. */
export const microgreenStages = [
  {
    id: 'seed',
    title: 'Seed',
    hindi: 'बीज',
    image: '/images/products/sunflower-seeds.webp',
    when: 'Day 0',
    points: [
      'Starting stage of the plant',
      'Prepared for germination'
    ],
  },
  {
    id: 'sprout',
    title: 'Sprout',
    hindi: 'अंकुर',
    image: '/images/products/pea-4.webp',
    when: 'About 2–5 days',
    points: [
      'Seed has just germinated',
      'Root and shoot begin to appear',
      'Earlier stage than a microgreen'
    ],
  },
  {
    id: 'microgreen',
    title: 'Microgreen',
    hindi: 'माइक्रोग्रीन',
    image: '/images/products/radish-1.webp',
    when: 'Often 7–21 days',
    points: [
      'Young leafy plant',
      'First leaves have developed',
      'Harvested before full maturity'
    ],
    highlight: true,
  },
  {
    id: 'mature',
    title: 'Mature plant',
    hindi: 'पूरा पौधा',
    image: '/images/products/mature-kale.webp',
    when: 'Weeks to months',
    points: [
      'Fully grown vegetable/herb stage',
      'Harvested much later'
    ],
  },
];

/** General value — deliberately no medical or disease-related claims (BRD §4, §20). */
export const whyMicrogreens = [
  { icon: 'Sparkles', title: 'Big flavour, tiny size', body: 'A small handful adds noticeable taste — peppery, nutty, fresh or herby — to everyday food.' },
  { icon: 'Palette', title: 'Colour & crunch', body: 'Green, purple and magenta leaves with a crisp bite make simple meals look and feel special.' },
  { icon: 'Timer', title: 'Ready to use', body: 'No cleaning big bunches or chopping. Rinse gently and add — perfect for busy weekdays.' },
  { icon: 'ChefHat', title: 'Fits Indian meals', body: 'Top dal, chaat, poha, parathas, rolls and rice bowls — not just western salads.' },
  { icon: 'Leaf', title: 'A fresh-greens habit', body: 'An easy way to add more fresh vegetables and herbs to what you already eat.' },
  { icon: 'Sprout', title: 'Many varieties', body: 'From methi and dhania to broccoli and sunflower — there is a flavour for every palate.' },
];

/**
 * Everyday cooking in India (BRD §9). `productIds` link to shop pages; `recipeMeal` filters /recipes.
 * Arugula from the BRD list is not in our catalogue, so it is omitted.
 */
export const useCases = [
  { id: 'breakfast', title: 'Breakfast', icon: 'Coffee', image: recipe('besan-chilla'), idea: 'Toast, sandwiches, chilla and breakfast bowls.', how: 'Pile on top of toast or fold into a chilla or paratha just before serving.', productIds: ['broccoli-microgreens', 'sunflower-microgreens', 'pea-shoots'], recipeMeal: 'breakfast' },
  { id: 'salad', title: 'Salad', icon: 'Salad', image: recipe('garden-salad'), idea: 'Simple 5–10 minute salads.', how: 'Toss with cucumber, tomato, lemon and salt. Dress right before eating.', productIds: ['radish-microgreens', 'broccoli-microgreens', 'kale-microgreens'], recipeMeal: 'salad' },
  { id: 'dal', title: 'Dal & Indian meals', icon: 'Soup', image: recipe('dal-tadka'), idea: 'A fresh topping for dal, kadhi and sabzi.', how: 'Turn off the heat, then stir in or sprinkle on top — no long cooking.', productIds: ['mustard-microgreens', 'methi-microgreens', 'coriander-microgreens'], recipeMeal: 'dinner' },
  { id: 'wrap', title: 'Roti & Wraps', icon: 'Sandwich', image: recipe('paneer-wrap'), idea: 'Rolls with vegetables or paneer.', how: 'Add a big handful inside kathi rolls and roti wraps for crunch.', productIds: ['radish-microgreens', 'sunflower-microgreens', 'pea-shoots'], recipeMeal: 'wrap' },
  { id: 'chaat', title: 'Chaat', icon: 'Flame', image: recipe('papdi-chaat'), idea: 'Microgreen chaat with familiar Indian ingredients.', how: 'Sprinkle over papdi chaat, bhel or chana chaat at the very end.', productIds: ['radish-microgreens', 'coriander-microgreens', 'mustard-microgreens'], recipeMeal: 'chaat' },
  { id: 'bowl', title: 'Rice & Grain bowls', icon: 'CookingPot', image: recipe('dal-chawal'), idea: 'A fresh topping after cooking.', how: 'Crown dal-chawal, pulao, khichdi or quinoa bowls once they are served.', productIds: ['broccoli-microgreens', 'pea-shoots', 'sunflower-microgreens'], recipeMeal: 'bowl' },
  { id: 'smoothie', title: 'Smoothies', icon: 'CupSoda', image: recipe('green-smoothie'), idea: 'Mild-flavour green combinations.', how: 'Blend mild greens with banana, apple, amla or coconut water.', productIds: ['broccoli-microgreens', 'wheatgrass', 'kale-microgreens'], recipeMeal: 'smoothie' },
  { id: 'soup', title: 'Soup', icon: 'Soup', image: recipe('pumpkin-soup'), idea: 'Topping and finishing ideas.', how: 'Add a small pinch on each bowl at the table so the leaves stay perky.', productIds: ['pea-shoots', 'parsley-microgreens', 'pak-choi-microgreens'], recipeMeal: 'dinner' },
  { id: 'garnish', title: 'Garnish', icon: 'Sparkles', image: recipe('idli-chutney'), idea: 'Simple plating ideas.', how: 'A few colourful sprigs on dosa, idli, raita or starters.', productIds: ['radish-microgreens', 'mustard-microgreens', 'coriander-microgreens', 'amaranth-microgreens'], recipeMeal: 'all' },
];

/** Basic handling guidance (BRD §10). VERIFY against the actual packaging instructions. */
export const handlingGuide = [
  { icon: 'Refrigerator', title: 'Refrigerate on arrival', body: 'Keep the box closed in the fridge at 2–5 °C.' },
  { icon: 'Droplets', title: 'Rinse just before eating', body: 'Rinse gently in cold water, then pat or spin dry. Washing before storing makes them wilt.' },
  { icon: 'Hand', title: 'Handle gently', body: 'Hold by the stems and avoid crushing the leaves.' },
  { icon: 'Flame', title: 'Raw or lightly warmed', body: 'Most are best raw. For hot food, add after cooking so they keep their crunch.' },
  { icon: 'CalendarClock', title: 'Use within shelf life', body: 'Each product page shows its shelf life. Discard if slimy or off-smelling.' },
];

export const MEAL_TYPES = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
  garnish: 'Garnish',
  smoothie: 'Smoothie',
};

export const whyPillars = [
  {
    icon: 'Sparkles',
    title: 'Choose by flavour',
    body: 'Explore mild broccoli, peppery radish, nutty sunflower and more, with taste notes for each variety.',
  },
  {
    icon: 'Sprout',
    title: 'Understand the growing journey',
    body: 'Our growing guide explains each stage, from choosing seeds to harvesting the young leaves.',
  },
  {
    icon: 'Leaf',
    title: 'Familiar greens, new possibilities',
    body: 'Discover methi, dhania, sarson and chaulai alongside broccoli, kale and sunflower.',
  },
  {
    icon: 'Sparkles',
    title: 'Help finding your first variety',
    body: 'Our three-question guide suggests microgreens based on your taste, meals and experience.',
  },
  {
    icon: 'ChefHat',
    title: 'Made for Indian meals',
    body: 'Methi, dhania, sarson and chaulai sit alongside global favourites, with simple ideas for dal, chaat and more.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Honest information',
    body: 'Read variety-specific taste, growing-time and storage guidance, with research-based nutrient highlights and clear notes on verification.',
  },
];

export const comparison = {
  columns: ['Sprouts', 'Microgreens', 'Mature plants'],
  rows: [
    { label: 'Harvested after', values: ['About 2–7 days', 'Often 7–21 days (varies by variety)', 'Several weeks to months'] },
    { label: 'How they grow', values: ['Usually in water, often without light', 'In a growing medium, with light', 'In soil, in fields or gardens'] },
    { label: 'What you eat', values: ['Seed, root and shoot', 'Stem and first leaves — cut above the root', 'Leaves, stems, flowers or roots'] },
    { label: 'Leaves', values: ['None or barely visible', 'First leaves open (sometimes first true leaves)', 'Fully developed leaves'] },
    { label: 'Texture', values: ['Crunchy, watery', 'Tender and crisp', 'Varies — often needs chopping or cooking'] },
    { label: 'Typical use', values: ['Chaat, salads, cooked dishes', 'Toppings, salads, wraps, garnish', 'Everyday cooking — sabzi, dal, curries'] },
  ],
};

export const farmGallery = [
  { src: farm('tray-row'), alt: 'Young microgreens with their first leaves open, growing in trays' },
  { src: farm('tending'), alt: 'Grower in gloves checking a tray of microgreens' },
  { src: farm('harvest-2'), alt: 'Microgreens being cut by hand with scissors' },
  { src: farm('trays'), alt: 'Close-up of trays of young microgreens' },
  { src: farm('clamshell'), alt: 'Freshly packed microgreens in a clear box' },
  { src: farm('tray-care'), alt: 'Grower adjusting a tray of microgreens' },
];

export const farmPractices = [
  { icon: 'Droplets', title: 'Careful watering', body: 'Moisture supports germination and growth. Bottom watering supplies the roots while helping keep leaves dry.' },
  { icon: 'Sun', title: 'Light and airflow', body: 'Suitable light and gentle airflow support the young plants as their first leaves open.' },
  { icon: 'ClipboardCheck', title: 'Daily checks', body: 'Checking moisture, cleanliness and crop condition is part of the growing journey.' },
  { icon: 'Scissors', title: 'Harvest young', body: 'Clean tools cut the stems above the roots when the variety reaches its target stage.' },
];

// Counts come from the catalogue and growing guide, rather than sample business metrics.
export const farmStats = [
  { value: String(products.length), label: 'varieties & mixes to explore' },
  { value: '7–21', label: 'typical days to harvest' },
  { value: String(growingSteps.length), label: 'steps in the growing guide' },
  { value: String(PROCESS_PHASES.length), label: 'growing phases explained' },
];

export const about = {
  story: [
    'Mini\'s Greens is about making microgreens easy to understand and easy to bring into everyday Indian meals.',
    'Familiar flavours such as methi, dhania and mustard sit alongside broccoli, radish, sunflower and pea shoots. The catalogue explains what each variety tastes like and where it fits on your plate.',
    'From the first seed to young leaves, our guides explain the growing journey, handling and simple serving ideas. You can explore a variety, learn about it and ask us questions before choosing.',
  ],
  mission:
    'To make fresh, flavourful greens an easy everyday habit in Indian kitchens — with simple meal ideas and clear, honest information.',
  vision: 'A plate of fresh greens in every Indian meal — from dal-chawal to dosa.',
  values: [
    { icon: 'Leaf', title: 'Freshness first', body: 'Every decision starts with how the greens will taste on your plate.' },
    { icon: 'BadgeCheck', title: 'Honesty', body: 'Clear information, no exaggerated claims. If we are not sure, we say so.' },
    { icon: 'HeartHandshake', title: 'Care', body: 'For the plants, for the people who grow them and for the customers who eat them.' },
    { icon: 'Sprout', title: 'Always learning', body: 'Questions and feedback help us make variety information and meal ideas more useful.' },
  ],
  journey: [
    { stage: 'Get to know them', body: 'See how microgreens differ from sprouts and mature vegetables.' },
    { stage: 'Follow the growing journey', body: 'Explore sowing, germination, growth and harvest in our nine-step guide.' },
    { stage: 'Find your variety', body: 'Compare flavours and nutrient highlights, or try the three-question finder.' },
    { stage: 'Bring them to your plate', body: 'Use the eating and storage guides for a fresh finish to everyday meals.' },
  ],
};

export const subscriptionPlans = [
  { id: 'weekly-starter', name: 'Starter', packs: 3, price: 449, description: '3 packs a week — ideal for 1–2 people.' },
  { id: 'weekly-family', name: 'Family', packs: 5, price: 699, description: '5 packs a week for a family of 3–4.', popular: true },
  { id: 'weekly-chef', name: 'Home Chef', packs: 8, price: 1049, description: '8 packs a week for serious cooks and hosts.' },
];
