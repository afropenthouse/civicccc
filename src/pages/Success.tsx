import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

function Success() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-lg pt-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black">
        <Check className="h-9 w-9 text-white" strokeWidth={2.5} />
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-black sm:text-5xl">
        Report submitted.
      </h1>

      <p className="mx-auto mt-6 max-w-sm text-black/55">
        Your report has been received and is now visible to the
        relevant authority in real time.
      </p>

      <button
        type="button"
        onClick={() => navigate("/")}
        className="mt-8 rounded-full border-2 border-black px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-black hover:text-white"
      >
        Report another issue
        {/* report */}
      </button>
    </section>
  );
}

export default Success;
