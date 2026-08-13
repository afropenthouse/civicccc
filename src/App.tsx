import {
  ArrowLeft,
  Building2,
  Camera,
  Car,
  Check,
  ChevronRight,
  CircleHelp,
  Droplets,
  Landmark,
  Leaf,
  Megaphone,
  Radar,
  Shield,
  Siren,
  Upload,
  Zap,
} from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Success from "./pages/Success";

export type Category = {
  id: string;
  name: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  subcategories: readonly string[];
};

const CATEGORIES = [
  {
    id: "safety",
    name: "Safety",
    Icon: Shield,
    subcategories: ["Crime", "Suspicious activity", "Dangerous locations", "Public safety hazards"],
  },
  {
    id: "roads",
    name: "Roads",
    Icon: Car,
    subcategories: ["Bad roads / potholes", "Dangerous driving", "Unroadworthy vehicles", "Broken traffic lights", "Illegal parking", "Public transport issues"],
  },
  {
    id: "buildings",
    name: "Buildings",
    Icon: Building2,
    subcategories: ["Unsafe/damaged buildings", "Collapsed structures", "Construction hazards", "Illegal construction"],
  },
  {
    id: "utilities",
    name: "Utilities",
    Icon: Zap,
    subcategories: ["Exposed electrical wires", "Broken streetlights", "Water infrastructure", "Damaged public infrastructure"],
  },
  {
    id: "flooding",
    name: "Flooding",
    Icon: Droplets,
    subcategories: ["Blocked drainage", "Flooding", "Open manholes", "Erosion"],
  },
  {
    id: "environment",
    name: "Environment",
    Icon: Leaf,
    subcategories: ["Illegal dumping", "Pollution", "Burning waste", "Oil/chemical spills"],
  },
  {
    id: "emergencies",
    name: "Emergency",
    Icon: Siren,
    subcategories: ["Fire", "Accident", "Medical emergency", "Other immediate danger"],
  },
  {
    id: "public-services",
    name: "Public",
    Icon: Landmark,
    subcategories: ["Government facility problems", "Public toilets", "Schools", "Hospitals", "Other public infrastructure"],
  },
  {
    id: "other",
    name: "Other",
    Icon: CircleHelp,
    subcategories: ["Something not listed above"],
  },
] as const;

const HOW_IT_WORKS = [
  { label: "Take a picture", Icon: Camera },
  { label: "Upload it", Icon: Upload },
  { label: "Authority acts", Icon: Radar },
] as const;

function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <header className="sticky top-0 z-50 border-b-2 border-black/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black">
              <Megaphone className="h-4.5 w-4.5 text-white" strokeWidth={2.2} />
            </div>
            <p className="text-lg font-bold tracking-tight text-black">CivRes</p>
          </Link>
          <div className="hidden items-center gap-2 rounded-full border-2 border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-black/60 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            Live &amp; anonymous
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-28">
        <Routes>
          <Route path="/" element={<Home categories={CATEGORIES} howItWorks={HOW_IT_WORKS} />} />
          <Route path="/report/:categoryId" element={<Report categories={CATEGORIES} />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>

      <footer className="border-t-2 border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-black/45">
          <p className="font-bold text-black">CivRes</p>
          <p className="mt-1">Built for Nigerian cities</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
