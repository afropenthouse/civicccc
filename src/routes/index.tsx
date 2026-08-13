import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type ChangeEvent } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
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

const CATEGORIES = [
  {
    id: "safety",
    name: "Safety & Security",
    Icon: Shield,
    subcategories: ["Crime", "Suspicious activity", "Dangerous locations", "Public safety hazards"],
  },
  {
    id: "roads",
    name: "Roads & Transport",
    Icon: Car,
    subcategories: [
      "Bad roads / potholes",
      "Dangerous driving",
      "Unroadworthy / unsafe vehicles",
      "Broken traffic lights",
      "Illegal parking",
      "Public transport issues",
    ],
  },
  {
    id: "buildings",
    name: "Buildings & Structures",
    Icon: Building2,
    subcategories: ["Unsafe/damaged buildings", "Collapsed structures", "Construction hazards", "Illegal construction"],
  },
  {
    id: "utilities",
    name: "Utilities & Infrastructure",
    Icon: Zap,
    subcategories: ["Exposed electrical wires", "Broken streetlights", "Water infrastructure", "Damaged public infrastructure"],
  },
  {
    id: "flooding",
    name: "Flooding & Drainage",
    Icon: Droplets,
    subcategories: ["Blocked drainage", "Flooding", "Open manholes", "Erosion"],
  },
  {
    id: "environment",
    name: "Environment & Waste",
    Icon: Leaf,
    subcategories: ["Illegal dumping", "Pollution", "Burning waste", "Oil/chemical spills"],
  },
  {
    id: "emergencies",
    name: "Emergencies",
    Icon: Siren,
    subcategories: ["Fire", "Accident", "Medical emergency", "Other immediate danger"],
  },
  {
    id: "public-services",
    name: "Public Services",
    Icon: Landmark,
    subcategories: ["Government facility problems", "Public toilets", "Schools", "Hospitals", "Other public infrastructure"],
  },
  {
    id: "other",
    name: "Other",
    Icon: CircleHelp,
    blurb: "Something is wrong but none of these categories fit.",
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
  {
    step: "01",
    title: "Take a picture",
    description: "Snap a photo of the issue right where it's happening — no account needed.",
    Icon: Camera,
  },
  {
    step: "02",
    title: "Upload it",
    description: "Add a short description, drop a pin, and send it in under a minute.",
    Icon: Upload,
  },
  {
    step: "03",
    title: "Authority sees it live",
    description: "Your report reaches the right desk in real time, tagged with a reference number.",
    Icon: Radar,
  },
] as const;

type Step = "pick" | "form" | "done";

function makeRef() {
  return `CR-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Signature motif — a thin diagonal purple zigzag, used sparingly as a top
// marker and a quiet divider. Everything else stays flat white / ink / one
// purple, no gradients.
function ZigzagBar({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-[5px] w-full ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, #6D28D9 0px, #6D28D9 7px, #E9E4FB 7px, #E9E4FB 14px)",
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

  const severityStyle: Record<string, string> = {
    Low: "border-[#0F172A]/15 text-[#0F172A]/70 bg-[#F8F9FC]",
    Medium: "border-[#6D28D9] text-[#6D28D9] bg-[#6D28D9]/5",
    Urgent: "border-[#B91C1C] text-[#B91C1C] bg-[#B91C1C]/5",
  };

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased">
      <ZigzagBar />

      <header className="sticky top-0 z-50 border-b border-[#0F172A]/[0.06] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6D28D9]">
              <AlertTriangle className="h-5 w-5 text-white" strokeWidth={2.2} />
            </div>
            <p className="text-lg font-bold tracking-tight text-[#0F172A]">
              Civic Res
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[#0F172A]/[0.08] bg-[#F8F9FC] px-3.5 py-1.5 text-xs font-medium text-[#0F172A]/50 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6D28D9]" />
            Live &amp; anonymous
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-28">
        {step === "pick" && (
          <section>
            {/* Hero — flat, quiet, one accent */}
            <div className="pt-16 pb-4 text-center sm:pt-24">
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#6D28D9]/25 px-4 py-1.5 text-xs font-semibold text-[#6D28D9]">
                Step 1 of 2 · Choose a category
              </div>
              <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#0F172A] sm:text-6xl">
                Report an issue.
              </h1>
              <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-[#0F172A]/55">
                Help Nigeria become better — report the issues you
                encounter every day, and get them in front of the people
                who can fix them.
              </p>
            </div>

            {/* How it works */}
            <div className="mx-auto mt-16 max-w-4xl">
              <div className="grid gap-4 sm:grid-cols-3">
                {HOW_IT_WORKS.map(({ step: n, title, description: desc, Icon }, i) => (
                  <div key={n} className="relative">
                    <div className="h-full rounded-2xl border border-[#0F172A]/[0.07] bg-[#F8F9FC] p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6D28D9]">
                          <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                        </div>
                        <span className="text-2xl font-bold text-[#0F172A]/10">
                          {n}
                        </span>
                      </div>
                      <p className="mt-5 text-base font-semibold text-[#0F172A]">
                        {title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#0F172A]/50">
                        {desc}
                      </p>
                    </div>
                    {i < HOW_IT_WORKS.length - 1 && (
                      <ArrowRight
                        className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-[#0F172A]/15 sm:block"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Category picker */}
            <div className="mt-20">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.18em] text-[#0F172A]/35">
                Pick a category
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CATEGORIES.map(({ id, name, Icon, blurb }) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => pickCategory(id)}
                    className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#0F172A]/[0.07] bg-white p-7 text-center shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#6D28D9]/35 hover:shadow-[0_12px_28px_-12px_rgba(109,40,217,0.30)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6D28D9]"
                  >
                    <div className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#F8F9FC] text-[#6D28D9] transition-colors group-hover:bg-[#6D28D9] group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                    <p className="text-[15px] font-semibold leading-snug text-[#0F172A]">{name}</p>
                    {blurb && (
                      <p className="text-xs leading-snug text-[#0F172A]/45">{blurb}</p>
                    )}
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
              className="group flex items-center gap-2 text-sm font-medium text-[#0F172A]/45 transition-colors hover:text-[#0F172A]"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Change category
            </button>

            <div className="mt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#6D28D9]/25 px-4 py-1.5 text-xs font-semibold text-[#6D28D9]">
                Step 2 of 2 · {category.name}
              </div>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
                Tell us what happened.
              </h1>
              <p className="mt-3 text-[#0F172A]/55">
                Provide a clear description so the right authority can act quickly.
              </p>
            </div>

            <div className="mt-10 space-y-7 rounded-3xl border border-[#0F172A]/[0.07] bg-[#F8F9FC] p-8">
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Issue type</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.subcategories?.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSubcategory(s)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        subcategory === s
                          ? "border-[#6D28D9] bg-[#6D28D9] text-white"
                          : "border-[#0F172A]/15 bg-white text-[#0F172A] hover:border-[#6D28D9]/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {subcategory === null && (
                  <p className="mt-2 text-xs text-[#0F172A]/40">Select an issue type to continue.</p>
                )}
              </div>

              <div>
                <label htmlFor="desc" className="text-sm font-semibold text-[#0F172A]">
                  Description
                </label>
                <textarea
                  id="desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue as clearly as you can…"
                  className="mt-2 w-full resize-none rounded-xl border border-[#0F172A]/12 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[#0F172A]/35 focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="area" className="text-sm font-semibold text-[#0F172A]">
                    Area / landmark
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-[#0F172A]/12 bg-white px-3 focus-within:border-[#6D28D9] focus-within:ring-2 focus-within:ring-[#6D28D9]/15">
                    <MapPin className="h-4 w-4 text-[#0F172A]/35" />
                    <input
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Ojuelegba Bridge"
                      className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-[#0F172A]/35"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="state" className="text-sm font-semibold text-[#0F172A]">
                    State
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#0F172A]/12 bg-white px-3 py-3 text-sm outline-none transition-colors focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/15"
                  >
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#0F172A]">Severity</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {SEVERITIES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                        severity === s
                          ? severityStyle[s]
                          : "border-[#0F172A]/12 bg-white text-[#0F172A]/45 hover:border-[#0F172A]/25"
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
                  <div className="flex items-center gap-4 rounded-xl border border-[#6D28D9] bg-[#6D28D9]/5 p-3">
                    <img
                      src={photoPreview}
                      alt="Attached preview"
                      className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 text-sm font-medium text-[#6D28D9]">
                        <Check className="h-4 w-4 flex-shrink-0" />
                        Photo attached
                      </p>
                      <p className="truncate text-xs text-[#0F172A]/45">{photoName}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer rounded-full border border-[#6D28D9]/30 px-3 py-1.5 text-xs font-semibold text-[#6D28D9] transition-colors hover:bg-white"
                      >
                        Change
                      </label>
                      <button
                        type="button"
                        onClick={removePhoto}
                        aria-label="Remove photo"
                        className="rounded-full p-1.5 text-[#0F172A]/40 transition-colors hover:bg-white hover:text-[#B91C1C]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="photo-upload"
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#0F172A]/20 bg-white p-4 text-sm text-[#0F172A]/55 transition-colors hover:border-[#6D28D9]/40 hover:text-[#6D28D9]"
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
                  className="rounded-full bg-[#6D28D9] px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#5B21B6] disabled:opacity-30 disabled:hover:bg-[#6D28D9]"
                >
                  Submit report
                </button>
                <p className="text-xs text-[#0F172A]/40">
                  Reports are anonymous. No personal data required.
                </p>
              </div>
            </div>
          </section>
        )}

        {step === "done" && (
          <section className="mx-auto max-w-lg pt-20 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#6D28D9]">
              <Check className="h-9 w-9 text-white" strokeWidth={2.5} />
            </div>

            <h1 className="mt-8 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
              Report submitted.
            </h1>

            <ZigzagBar className="mx-auto mt-7 max-w-[160px] rounded-full" />

            <div className="mx-auto mt-7 inline-flex flex-col items-center rounded-2xl border border-[#0F172A]/[0.07] bg-[#F8F9FC] px-8 py-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F172A]/40">
                Reference
              </span>
              <span className="mt-1 font-mono text-2xl font-bold tracking-tight text-[#6D28D9]">
                {ref}
              </span>
            </div>

            <p className="mx-auto mt-6 max-w-sm text-[#0F172A]/55">
              Your report has been received and is now visible to the
              relevant authority in real time.
            </p>

            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-full border border-[#6D28D9] px-8 py-3.5 text-sm font-semibold text-[#6D28D9] transition-all hover:bg-[#6D28D9] hover:text-white"
            >
              Report another issue
            </button>
          </section>
        )}
      </main>

      <footer className="border-t border-[#0F172A]/[0.06] bg-[#F8F9FC]">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-[#0F172A]/45">
          <p className="font-semibold text-[#0F172A]">Civic Res</p>
          <p className="mt-1">Built for Nigerian cities</p>
        </div>
      </footer>
    </div>
  );
}