import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ChangeEvent } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Camera,
  Car,
  Check,
  CircleHelp,
  Droplets,
  Landmark,
  Leaf,
  MapPin,
  Radar,
  Shield,
  Siren,
  Upload,
  X,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Civic Res — Report issues, improve Nigeria" },
      {
        name: "description",
        content:
          "Help Nigeria become better by reporting safety, road, utility, flooding, waste, and public service issues in your community.",
      },
      { property: "og:title", content: "Civic Res — Report issues, improve Nigeria" },
      {
        property: "og:description",
        content:
          "Report everyday civic issues and help authorities respond faster.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Original category set, restored.
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

const STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Rivers",
  "Kano",
  "Oyo",
  "Enugu",
  "Kaduna",
  "Delta",
  "Anambra",
  "Ogun",
];

const SEVERITIES = ["Low", "Medium", "Urgent"] as const;

const HOW_IT_WORKS = [
  { label: "Take a picture", Icon: Camera },
  { label: "Upload it", Icon: Upload },
  { label: "Authority sees it live", Icon: Radar },
] as const;

type Step = "pick" | "form" | "done";

function makeRef() {
  return `CR-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Signature motif — thin diagonal black/green zigzag, used sparingly.
function ZigzagBar({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-[5px] w-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, #0B0F0D 0px, #0B0F0D 7px, #4ADE80 7px, #4ADE80 14px)",
      }}
    />
  );
}

function Index() {
  const [step, setStep] = useState<Step>("pick");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [state, setState] = useState<string>(STATES[0]!);
  const [severity, setSeverity] = useState<string>("Medium");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [ref, setRef] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const category = CATEGORIES.find((c) => c.id === categoryId);

  const canSubmit =
    subcategory !== null &&
    description.trim().length > 8 &&
    area.trim().length > 1;

  function reset() {
    setCategoryId(null);
    setSubcategory(null);
    setDescription("");
    setArea("");
    setSeverity("Medium");
    setPhotoPreview(null);
    setPhotoName(null);
    setRef(null);
    setStep("pick");
  }

  function pickCategory(id: string) {
    setCategoryId(id);
    setSubcategory(null);
    setStep("form");
  }

  function submit() {
    if (!canSubmit || !categoryId || !subcategory) return;
    setRef(makeRef());
    setStep("done");
  }

  function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhotoPreview(null);
    setPhotoName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const severityStyle: Record<string, string> = {
    Low: "border-black bg-black text-white",
    Medium: "border-black bg-[#4ADE80] text-black",
    Urgent: "border-black bg-black text-[#4ADE80]",
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased">
      <ZigzagBar />

      <header className="sticky top-0 z-50 border-b-2 border-black/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black">
              <AlertTriangle className="h-4.5 w-4.5 text-[#4ADE80]" strokeWidth={2.2} />
            </div>
            <p className="text-lg font-bold tracking-tight text-black">Civic Res</p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border-2 border-black/10 bg-[#F3FBF4] px-3.5 py-1.5 text-xs font-semibold text-black/60 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            Live &amp; anonymous
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-28">
        {step === "pick" && (
          <section>
            {/* Compact hero */}
            <div className="pt-10 pb-6 text-center sm:pt-14">
              <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-black sm:text-5xl">
                Report an issue.
              </h1>
              <p className="mx-auto mt-3 max-w-md text-base text-black/55 sm:text-lg">
                Help make Nigeria better by reporting the daily issues you
                encounter and getting through to the authorities who can
                fix them.
              </p>
            </div>

            {/* How it works — one slim strip, not a big section */}
            <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-3 rounded-full border-2 border-black/8 bg-[#F3FBF4] px-5 py-3">
              {HOW_IT_WORKS.map(({ label, Icon }, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[#4ADE80]">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </span>
                    <span className="text-xs font-semibold text-black/70 sm:text-sm">
                      {label}
                    </span>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <span className="mx-1 text-black/25">→</span>
                  )}
                </div>
              ))}
            </div>

            {/* Categories — the main event, front and center */}
            <div className="mt-10">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
                  Pick an issue to report
                </h2>
                <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-black/35 sm:inline">
                  Step 1 of 2
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {CATEGORIES.map(({ id, name, Icon }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => pickCategory(id)}
                    className="group relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-black/12 bg-white p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-black hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22C55E] sm:gap-4 sm:p-8"
                  >
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#4ADE80] transition-transform duration-200 group-hover:scale-x-100" />
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCFCE7] text-black transition-colors duration-200 group-hover:bg-black group-hover:text-[#4ADE80] sm:h-14 sm:w-14">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
                    </div>
                    <p className="text-sm font-bold text-black sm:text-base">{name}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {step === "form" && category && (
          <section className="mx-auto max-w-2xl pt-14">
            <button
              type="button"
              onClick={reset}
              className="group flex items-center gap-2 text-sm font-semibold text-black/45 transition-colors hover:text-black"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Change category
            </button>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#4ADE80] px-4 py-1.5 text-xs font-bold text-black">
                Step 2 of 2 · {category.name}
              </div>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-black sm:text-5xl">
                Tell us what happened.
              </h1>
              <p className="mt-3 text-black/55">
                Provide a clear description so the right authority can act quickly.
              </p>
            </div>

            <div className="mt-10 space-y-7 rounded-3xl border-2 border-black/10 bg-[#F9FBF9] p-8">
              <div>
                <p className="text-sm font-bold text-black">Issue type</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.subcategories?.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSubcategory(s)}
                      className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all ${
                        subcategory === s
                          ? "border-black bg-black text-[#4ADE80]"
                          : "border-black/15 bg-white text-black hover:border-black/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {subcategory === null && (
                  <p className="mt-2 text-xs text-black/40">Select an issue type to continue.</p>
                )}
              </div>

              <div>
                <label htmlFor="desc" className="text-sm font-bold text-black">
                  Description
                </label>
                <textarea
                  id="desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue as clearly as you can…"
                  className="mt-2 w-full resize-none rounded-xl border-2 border-black/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black focus:ring-2 focus:ring-[#4ADE80]/40"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="area" className="text-sm font-bold text-black">
                    Area / landmark
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border-2 border-black/15 bg-white px-3 focus-within:border-black focus-within:ring-2 focus-within:ring-[#4ADE80]/40">
                    <MapPin className="h-4 w-4 text-black/35" />
                    <input
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Ojuelegba Bridge"
                      className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-black/35"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="state" className="text-sm font-bold text-black">
                    State
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-2 w-full rounded-xl border-2 border-black/15 bg-white px-3 py-3 text-sm outline-none transition-colors focus:border-black focus:ring-2 focus:ring-[#4ADE80]/40"
                  >
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-black">Severity</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {SEVERITIES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`rounded-full border-2 px-5 py-2 text-sm font-bold transition-all ${
                        severity === s
                          ? severityStyle[s]
                          : "border-black/12 bg-white text-black/45 hover:border-black/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <input
                  ref={fileInputRef}
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                {photoPreview ? (
                  <div className="flex items-center gap-4 rounded-xl border-2 border-black bg-[#F3FBF4] p-3">
                    <img
                      src={photoPreview}
                      alt="Attached preview"
                      className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-sm font-bold text-black">
                        <Check className="h-4 w-4 flex-shrink-0 text-[#22C55E]" />
                        Photo attached
                      </p>
                      <p className="truncate text-xs text-black/45">{photoName}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer rounded-full border-2 border-black px-3 py-1.5 text-xs font-bold text-black transition-colors hover:bg-black hover:text-[#4ADE80]"
                      >
                        Change
                      </label>
                      <button
                        type="button"
                        onClick={removePhoto}
                        aria-label="Remove photo"
                        className="rounded-full p-1.5 text-black/40 transition-colors hover:bg-black/5 hover:text-black"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="photo-upload"
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-black/25 bg-white p-4 text-sm font-medium text-black/55 transition-colors hover:border-black hover:text-black"
                  >
                    <Camera className="h-5 w-5" />
                    Attach a photo (optional)
                  </label>
                )}
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={submit}
                  disabled={!canSubmit}
                  className="rounded-full bg-black px-8 py-3.5 text-sm font-bold text-[#4ADE80] transition-all hover:bg-[#16A34A] hover:text-black disabled:opacity-30 disabled:hover:bg-black disabled:hover:text-[#4ADE80]"
                >
                  Submit report
                </button>
                <p className="text-xs text-black/40">
                  Reports are anonymous. No personal data required.
                </p>
              </div>
            </div>
          </section>
        )}

        {step === "done" && (
          <section className="mx-auto max-w-lg pt-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black">
              <Check className="h-9 w-9 text-[#4ADE80]" strokeWidth={2.5} />
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight text-black sm:text-5xl">
              Report submitted.
            </h1>

            <ZigzagBar className="mx-auto mt-7 max-w-[160px] rounded-full" />

            <div className="mx-auto mt-7 inline-flex flex-col items-center rounded-2xl border-2 border-black/10 bg-[#F3FBF4] px-8 py-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                Reference
              </span>
              <span className="mt-1 font-mono text-2xl font-bold tracking-tight text-black">
                {ref}
              </span>
            </div>

            <p className="mx-auto mt-6 max-w-sm text-black/55">
              Your report has been received and is now visible to the
              relevant authority in real time.
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full border-2 border-black px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-black hover:text-[#4ADE80]"
            >
              Report another issue
            </button>
          </section>
        )}
      </main>

      <footer className="border-t-2 border-black/10 bg-[#F3FBF4]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-black/45">
          <p className="font-bold text-black">Civic Res</p>
          <p className="mt-1">Built for Nigerian cities</p>
        </div>
      </footer>
    </div>
  );
}