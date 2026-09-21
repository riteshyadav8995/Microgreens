import {
  BadgeCheck,
  CalendarClock,
  ChefHat,
  ClipboardCheck,
  Coffee,
  CookingPot,
  CupSoda,
  Droplets,
  Flame,
  Hand,
  HeartHandshake,
  LayoutGrid,
  Leaf,
  MapPin,
  Moon,
  Package,
  Palette,
  Recycle,
  Refrigerator,
  Salad,
  Sandwich,
  Scissors,
  ShieldCheck,
  Snowflake,
  Soup,
  Sparkles,
  Sprout,
  Sun,
  Timer,
  Truck,
  Wheat,
} from 'lucide-react';

// Data files reference icons by name; this explicit map keeps the bundle tree-shaken.
const ICONS = {
  BadgeCheck, CalendarClock, ChefHat, ClipboardCheck, Coffee, CookingPot, CupSoda, Droplets, Flame, Hand, HeartHandshake,
  LayoutGrid, Leaf, MapPin, Moon, Package, Palette, Recycle, Refrigerator, Salad, Sandwich, Scissors, ShieldCheck, Snowflake,
  Soup, Sparkles, Sprout, Sun, Timer, Truck, Wheat,
};

export default function Icon({ name, ...props }) {
  const Component = ICONS[name] || Leaf;
  return <Component aria-hidden {...props} />;
}
