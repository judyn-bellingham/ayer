import type { Checkpoint, CheckpointCategory, Category, Experience } from './types';
import { CHECKPOINT_META } from './types';

const CATEGORY_MAP: Record<CheckpointCategory, Category> = {
  sunset: 'adventure',
  monkey: 'nature',
  restaurant: 'dining',
  photo: 'cultural',
  mosque: 'heritage',
  mangrove: 'nature',
};

export function checkpointToExperience(cp: Checkpoint): Experience {
  return {
    id: cp.id,
    name: cp.name,
    category: CATEGORY_MAP[cp.category],
    description: cp.description,
    short_desc: cp.description.slice(0, 80) + (cp.description.length > 80 ? '...' : ''),
    price: 0,
    duration_minutes: 60,
    rating: cp.rating,
    review_count: cp.review_count,
    image_url: cp.image_url,
    location_label: CHECKPOINT_META[cp.category].label,
    latitude: null,
    longitude: null,
    featured: false,
    popular: false,
    tags: [cp.category, 'checkpoint'],
    created_at: new Date().toISOString(),
  };
}

export const CHECKPOINTS: Checkpoint[] = [
  {
    id: 'cp-sunset',
    name: 'Riverside Sunset Deck',
    category: 'sunset',
    description:
      'The westernmost jetty offers an unobstructed view of the sun dipping below the water village. Golden light floods the stilt houses and the Brunei River turns to liquid amber. A favorite among locals and photographers alike.',
    best_time: '5:30 PM – 6:15 PM',
    rating: 4.9,
    review_count: 327,
    image_url:
      'https://images.pexels.com/photos/2406731/pexels-photo-2406731.jpeg?auto=compress&cs=tinysrgb&w=800',
    x: 18,
    y: 72,
  },
  {
    id: 'cp-monkey',
    name: 'Proboscis Point',
    category: 'monkey',
    description:
      'A quiet bend in the mangrove channel where proboscis monkeys gather in the early morning. Silvered leaf monkeys are also frequently spotted. Your guide knows the family groups by name and can identify the dominant male.',
    best_time: '6:00 AM – 8:00 AM',
    rating: 4.8,
    review_count: 198,
    image_url:
      'https://images.pexels.com/photos/158028/bellingham-forest-mangroves-nature-158028.jpeg?auto=compress&cs=tinysrgb&w=800',
    x: 72,
    y: 28,
  },
  {
    id: 'cp-restaurant',
    name: 'Haji Ali Floating Kitchen',
    category: 'restaurant',
    description:
      'A family-run floating restaurant serving fresh catch from the South China Sea. Grilled prawns, chili crab, and coconut rice as you watch the village life drift by. Vegetarian options available on request.',
    best_time: '6:00 PM – 9:00 PM',
    rating: 4.8,
    review_count: 241,
    image_url:
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    x: 42,
    y: 52,
  },
  {
    id: 'cp-photo',
    name: 'Boardwalk Lookout',
    category: 'photo',
    description:
      'An elevated wooden platform connecting two water village neighborhoods. Offers a sweeping view of the stilt house grid, the mosque dome, and the river traffic below. Best at dawn when mist rises off the water.',
    best_time: '6:30 AM – 7:30 AM',
    rating: 4.7,
    review_count: 156,
    image_url:
      'https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=800',
    x: 50,
    y: 38,
  },
  {
    id: 'cp-mosque',
    name: 'Sultan Omar Ali Saifuddien View',
    category: 'mosque',
    description:
      'The iconic golden dome and marble minarets of Brunei\'s most famous mosque, reflected in the lagoon. View it from the water for the full postcard perspective. The contrast of gold against deep navy is breathtaking at dusk.',
    best_time: '4:30 PM – 6:00 PM',
    rating: 4.9,
    review_count: 512,
    image_url:
      'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=800',
    x: 30,
    y: 30,
  },
  {
    id: 'cp-mangrove',
    name: 'Mangrove Tunnel',
    category: 'mangrove',
    description:
      'A narrow natural waterway carved through dense mangrove forest. The canopy closes overhead creating a green cathedral. Kingfishers dart between branches and the water is perfectly still. Accessible only by kayak or small boat.',
    best_time: '7:00 AM – 10:00 AM',
    rating: 4.8,
    review_count: 89,
    image_url:
      'https://images.pexels.com/photos/158028/bellingham-forest-mangroves-nature-158028.jpeg?auto=compress&cs=tinysrgb&w=800',
    x: 82,
    y: 58,
  },
];
