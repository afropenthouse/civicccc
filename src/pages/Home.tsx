import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Category } from "../App";

type Step = "pick" | "form" | "done";

type HomeProps = {
  categories: readonly Category[];
  howItWorks: readonly { label: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[];
};

function Home({ categories, howItWorks }: HomeProps) {
  const navigate = useNavigate();

  function pickCategory(id: string) {
    navigate(`/report/${id}`);
  }

  return (
    <section>
      <div className="pt-10 pb-6 text-center sm:pt-14">
        <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-black sm:text-5xl">
          Report an issue.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base text-black/55 sm:text-lg">
          Help make Nigeria better by reporting daily issues you
          encounter so the authorities can fix them.
        </p>
      </div>

      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {howItWorks.map(({ label, Icon }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-black" strokeWidth={2.2} />
            <span className="text-xs font-semibold text-black/70 sm:text-sm">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
            Pick an issue to report
          </h2>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-black/35 sm:inline">
            Step 1 of 2
          </span>
        </div>
        <p className="mt-1.5 flex items-center gap-1 text-sm font-medium text-black/45">
          Tap a category below to get started
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {categories.map(({ id, name, Icon }) => (
            <button
              type="button"
              key={id}
              onClick={() => pickCategory(id)}
              className="group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-black bg-white p-5 text-center transition-colors active:bg-black/[0.08] hover:bg-black/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-black sm:gap-4 sm:p-8"
            >
              <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white sm:hidden">
                <ChevronRight className="h-3 w-3" strokeWidth={2.5} />
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-black bg-white text-black sm:h-14 sm:w-14">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} />
              </div>
              <p className="text-sm font-bold text-black sm:text-base">{name}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
