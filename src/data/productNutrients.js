/** Research-based nutrient names; not brand-specific lab results or quantity claims.
 * Brassicas: https://www.ars.usda.gov/research/publications/publication/?seqNo115=324529
 * Radish, cabbage, coriander, amaranth: https://www.ars.usda.gov/oc/fnrb/fnrb0714/
 * Pea, sunflower: https://pmc.ncbi.nlm.nih.gov/articles/PMC11842852/
 * Fenugreek: https://www.sciencedirect.com/science/article/pii/S0889157525016461
 * Wheatgrass: https://pmc.ncbi.nlm.nih.gov/articles/PMC6112624/
 * Dill and parsley: https://pmc.ncbi.nlm.nih.gov/articles/PMC9695664/
 * Unconfirmed varieties remain empty rather than inherit mature-plant nutrition.
 */
const brassicaMinerals = ['Potassium', 'Calcium', 'Iron', 'Zinc'];
export const NUTRIENT_NOTE = 'Nutrient highlights are based on published research, not lab tests of our products. Actual amounts vary with the variety and growing conditions. Mix highlights are based on their ingredients.';
export const NUTRITION_FAQ = 'Our catalogue and variety pages show nutrient names based on published research. These are general highlights, not product-specific lab results or measured amounts. Mix highlights are based on their ingredients. Where research has not been confirmed, the profile is marked as pending.';
export const productNutrients = {
  'broccoli-microgreens': brassicaMinerals,
  'radish-microgreens': ['Vitamin C', 'Vitamin E', 'Potassium'],
  'mustard-microgreens': brassicaMinerals,
  'sunflower-microgreens': ['Potassium', 'Magnesium', 'Calcium'],
  'pea-shoots': ['Potassium', 'Magnesium', 'Calcium'],
  'kale-microgreens': brassicaMinerals,
  'red-cabbage-microgreens': ['Vitamin C', 'Calcium', 'Potassium'],
  'kohlrabi-microgreens': brassicaMinerals,
  'pak-choi-microgreens': brassicaMinerals,
  'cauliflower-microgreens': brassicaMinerals,
  'methi-microgreens': ['Vitamin C', 'Iron'],
  'coriander-microgreens': ['Vitamin C', 'Vitamin K', 'Beta-carotene'],
  'amaranth-microgreens': ['Vitamin C', 'Vitamin K', 'Beta-carotene'],
  'wheatgrass': ['Iron', 'Zinc', 'Magnesium'],
  'wheatgrass-live-tray': ['Iron', 'Zinc', 'Magnesium'],
  'dill-microgreens': ['Vitamin C', 'Potassium', 'Magnesium'],
  'parsley-microgreens': ['Potassium', 'Magnesium'],
};

// Mix highlights are a union of the listed ingredients, not an assay of the blend.
const mixIngredients = {
  'starter-mix': ['broccoli-microgreens', 'sunflower-microgreens', 'pea-shoots'],
  'salad-mix': ['radish-microgreens', 'red-cabbage-microgreens', 'sunflower-microgreens', 'pea-shoots'],
  'chefs-mix': ['amaranth-microgreens', 'radish-microgreens', 'red-cabbage-microgreens'],
  'wellness-mix': ['wheatgrass', 'broccoli-microgreens', 'kale-microgreens', 'sunflower-microgreens'],
  'desi-tadka-mix': ['methi-microgreens', 'coriander-microgreens', 'mustard-microgreens'],
};

export function getNutrientHighlights(product) {
  if (mixIngredients[product.id]) {
    return [...new Set(mixIngredients[product.id].flatMap((id) => productNutrients[id] ?? []))].slice(0, 4);
  }
  return productNutrients[product.id] ?? [];
}
