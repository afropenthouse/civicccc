import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Camera,
  Car,
  Check,
  Droplets,
  Landmark,
  Leaf,
  MapPin,
  Shield,
  Siren,
  Upload,
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
    hint: "Crime, suspicious activity, hazards",
    Icon: Shield,
    subcategories: [
      "Crime",
      "Suspicious activity",
      "Dangerous locations",
      "Public safety hazards",
    ],
  },
  {
    id: "roads",
    name: "Roads & Transport",
    hint: "Potholes, vehicles, traffic lights",
    Icon: Car,
    subcategories: [
      "Bad roads / potholes",
      "Dangerous driving",
      "Unroadworthy vehicles",
      "Broken traffic lights",
      "Illegal parking",
      "Public transport issues",
    ],
  },
  {
    id: "buildings",
    name: "Buildings & Structures",
    hint: "Damaged buildings, construction",
    Icon: Building2,
    subcategories: [
      "Unsafe/damaged buildings",
      "Collapsed structures",
      "Construction hazards",
      "Illegal construction",
    ],
  },
  {
    id: "utilities",
    name: "Utilities & Infrastructure",
    hint: "Electrical, streetlights, water",
    Icon: Zap,
    subcategories: [
      "Exposed electrical wires",
      "Broken streetlights",
      "Water infrastructure",
      "Damaged public infrastructure",
    ],
  },
  {
    id: "flooding",
    name: "Flooding & Drainage",
    hint: "Blocked drains, flooding, manholes",
    Icon: Droplets,
    subcategories: [
      "Blocked drainage",
      "Flooding",
      "Open manholes",
      "Erosion",
    ],
  },
  {
    id: "environment",
    name: "Environment & Waste",
    hint: "Dumping, pollution, burning",
    Icon: Leaf,
    subcategories: [
      "Illegal dumping",
      "Pollution",
      "Burning waste",
      "Oil/chemical spills",
    ],
  },
  {
    id: "emergencies",
    name: "Emergencies",
    hint: "Fire, accidents, medical",
    Icon: Siren,
    subcategories: [
      "Fire",
      "Accident",
      "Medical emergency",
      "Other immediate danger",
    ],
  },
  {
    id: "public-services",
    name: "Public Services",
    hint: "Government facilities, schools, hospitals",
    Icon: Landmark,
    subcategories: [
      "Government facility problems",
      "Public toilets",
      "Schools",
      "Hospitals",
      "Other public infrastructure",
    ],
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

type Step = "pick" | "form" | "done";

function makeRef() {
  return `CR-${Math.floor(1000 + Math.random() * 9000)}`;
}

function Index() {
  const [step, setStep] = useState<Step>("pick");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [state, setState] = useState<string>(STATES[0]!);
  const [severity, setSeverity] = useState<string>("Medium");
  const [photo, setPhoto] = useState(false);
  const [ref, setRef] = useState<string | null>(null);

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
    setPhoto(false);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-soft">
              <AlertTriangle className="h-5 w-5 text-primary-foreground" strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <p className="font-display text-xl font-bold tracking-tight text-foreground">Civic Res</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Citizen reporting
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-12">
        {step === "pick" && (
          <section className="space-y-20">
            <div className="text-center">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Step 1 of 2
              </div>
              <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
                Help Nigeria become better.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
                Report issues you encounter on a daily basis and help authorities respond faster.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map(({ id, name, hint, Icon }) => (
                <button
                  key={id}
                  onClick={() => pickCategory(id)}
                  className="group relative flex flex-col items-start rounded-2xl border border-border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <p className="mt-4 font-display text-base font-semibold">{name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
                  <ArrowLeft className="absolute right-4 top-4 h-4 w-4 rotate-180 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>

            <div className="rounded-3xl bg-gradient-to-b from-blue-50/70 to-blue-50/30 px-6 py-16 sm:px-12">
              <div className="text-center">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  How it works
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-2xl font-bold text-foreground sm:text-3xl">
                  Three steps to a better community
                </p>
              </div>
              <div className="mt-12 grid gap-8 sm:grid-cols-3">
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                    <Camera className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <div className="mt-5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    1
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">Take a picture</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Snap a clear photo of the issue you see around you.
                  </p>
                </div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                    <Upload className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <div className="mt-5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">Upload the picture</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add details, location, and upload the report in seconds.
                  </p>
                </div>
                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
                    <Siren className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <div className="mt-5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    3
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">Authority sees it</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Relevant authorities view the report in real time.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {step === "form" && category && (
          <section className="mx-auto max-w-2xl">
            <button
              onClick={reset}
              className="group flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Change category
            </button>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Step 2 of 2 · {category.name}
              </p>
              <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Tell us what happened.</h1>
              <p className="mt-3 text-muted-foreground">
                Provide a clear description so the right authority can act quickly.
              </p>
            </div>

            <div className="mt-10 space-y-7">
              <div>
                <p className="text-sm font-semibold">Issue type</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {category.subcategories.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSubcategory(s)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                        subcategory === s
                          ? "border-primary bg-primary text-primary-foreground shadow-soft"
                          : "border-input bg-card text-foreground hover:border-primary/50 hover:bg-blue-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                {subcategory === null && (
                  <p className="mt-2 text-xs text-muted-foreground">Select an issue type to continue.</p>
                )}
              </div>

              <div>
                <label htmlFor="desc" className="text-sm font-semibold">
                  Description
                </label>
                <textarea
                  id="desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue as clearly as you can…"
                  className="mt-2 w-full resize-none rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="area" className="text-sm font-semibold">
                    Area / landmark
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-input bg-card px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <input
                      id="area"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="e.g. Ojuelegba Bridge"
                      className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="state" className="text-sm font-semibold">
                    State
                  </label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-input bg-card px-3 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
                  >
                    {STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold">Severity</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {SEVERITIES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                        severity === s
                          ? "border-primary bg-primary text-primary-foreground shadow-soft"
                          : "border-input bg-card text-foreground hover:border-primary/50 hover:bg-blue-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setPhoto((p) => !p)}
                className={`flex w-full items-center gap-3 rounded-xl border border-dashed p-4 text-sm transition-colors ${
                  photo
                    ? "border-primary bg-blue-50 text-primary"
                    : "border-input bg-card text-foreground hover:border-primary/50 hover:bg-blue-50"
                }`}
              >
                {photo ? <Check className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
                {photo ? "Photo attached" : "Attach a photo (optional)"}
              </button>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={submit}
                  disabled={!canSubmit}
                  className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-hard disabled:opacity-40 disabled:hover:shadow-none"
                >
                  Submit report
                </button>
                <p className="text-xs text-muted-foreground">
                  Reports are anonymous. No personal data required.
                </p>
              </div>
            </div>
          </section>
        )}

        {step === "done" && (
          <section className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-soft">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="mt-8 text-3xl font-bold sm:text-5xl">Report submitted.</h1>
            <p className="mt-4 text-muted-foreground">
              Reference <span className="font-mono text-foreground font-semibold">{ref}</span>. Your report has been received and will be visible to the relevant authority.
            </p>
            <button
              onClick={reset}
              className="mt-8 rounded-full border border-primary bg-transparent px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Report another issue
            </button>
          </section>
        )}
      </main>

      <footer className="border-t border-border/50 bg-blue-50/30">
        <div className="mx-auto max-w-5xl px-5 py-10 text-center text-sm text-muted-foreground">
          <p className="font-display font-semibold text-foreground">Civic Res</p>
          <p className="mt-1">Built for Nigerian cities</p>
        </div>
      </footer>
    </div>
  );
}
