import {
  Car, Droplets, Stethoscope, Scissors, Wind, Home, UtensilsCrossed,
  Bike, Package, Wrench, Sparkles, Dumbbell,
} from "lucide-react";

export const categories = [
  { id: "car-wash", name: "Car Wash", nameAr: "غسيل سيارات", icon: Droplets, count: 142, color: "from-blue-500/20 to-cyan-500/20" },
  { id: "oil-change", name: "Oil Change", nameAr: "تغيير زيت", icon: Car, count: 87, color: "from-amber-500/20 to-orange-500/20" },
  { id: "dentists", name: "Dentists", nameAr: "أطباء أسنان", icon: Stethoscope, count: 56, color: "from-rose-500/20 to-pink-500/20" },
  { id: "salons", name: "Beauty Salons", nameAr: "صالونات", icon: Scissors, count: 213, color: "from-fuchsia-500/20 to-purple-500/20" },
  { id: "ac-repair", name: "AC Repair", nameAr: "صيانة مكيفات", icon: Wind, count: 94, color: "from-sky-500/20 to-blue-500/20" },
  { id: "apartments", name: "Apartments", nameAr: "شقق", icon: Home, count: 312, color: "from-emerald-500/20 to-green-500/20" },
  { id: "restaurants", name: "Restaurants", nameAr: "مطاعم", icon: UtensilsCrossed, count: 487, color: "from-red-500/20 to-rose-500/20" },
  { id: "delivery", name: "Delivery", nameAr: "توصيل", icon: Bike, count: 198, color: "from-yellow-500/20 to-amber-500/20" },
  { id: "used-products", name: "Used Products", nameAr: "منتجات مستعملة", icon: Package, count: 624, color: "from-teal-500/20 to-emerald-500/20" },
  { id: "handyman", name: "Handyman", nameAr: "صيانة منزلية", icon: Wrench, count: 76, color: "from-slate-500/20 to-zinc-500/20" },
  { id: "cleaning", name: "Cleaning", nameAr: "تنظيف", icon: Sparkles, count: 134, color: "from-indigo-500/20 to-violet-500/20" },
  { id: "fitness", name: "Fitness", nameAr: "لياقة", icon: Dumbbell, count: 42, color: "from-lime-500/20 to-green-500/20" },
];

export const providers = [
  { id: "1", name: "ShineUp Auto Spa", category: "Car Wash", rating: 4.9, reviews: 312, distance: "0.8 km", open: true, image: "🚗", price: "$$" },
  { id: "2", name: "Dr. Layla Dental Clinic", category: "Dentists", rating: 4.8, reviews: 187, distance: "1.2 km", open: true, image: "🦷", price: "$$$" },
  { id: "3", name: "Glow Beauty Lounge", category: "Beauty Salons", rating: 4.7, reviews: 421, distance: "2.1 km", open: false, image: "💇", price: "$$" },
  { id: "4", name: "CoolFix AC Services", category: "AC Repair", rating: 4.9, reviews: 96, distance: "0.5 km", open: true, image: "❄️", price: "$" },
  { id: "5", name: "Bella Vista Restaurant", category: "Restaurants", rating: 4.6, reviews: 1024, distance: "1.5 km", open: true, image: "🍝", price: "$$$" },
  { id: "6", name: "QuickWheels Delivery", category: "Delivery", rating: 4.8, reviews: 532, distance: "0.3 km", open: true, image: "🛵", price: "$" },
];

export const testimonials = [
  { name: "Ahmed M.", role: "Customer", text: "Found a dentist within 30 seconds. Booked through WhatsApp instantly. Magical.", avatar: "AM" },
  { name: "Sara K.", role: "Salon Owner", text: "Botly tripled our weekly bookings. Customers just ask their phone — and we're there.", avatar: "SK" },
  { name: "Omar H.", role: "Customer", text: "I typed 'car wash open at midnight' — got 3 options nearby. This is the future.", avatar: "OH" },
];

export const faqs = [
  { q: "How does Botly find providers near me?", a: "We use your location and our AI matching engine to surface the best-rated, closest providers in real time." },
  { q: "Is it free to use?", a: "Yes — searching and connecting is 100% free for customers. Providers pay a small fee per qualified lead." },
  { q: "Do I need an account?", a: "No account needed to search. Just message our WhatsApp bot and start chatting." },
  { q: "Which cities are supported?", a: "We're live in Riyadh, Dubai, Cairo, Amman, and Casablanca — expanding monthly." },
  { q: "Can I list my business?", a: "Absolutely. Sign up as a provider in under 2 minutes from the dashboard." },
];
