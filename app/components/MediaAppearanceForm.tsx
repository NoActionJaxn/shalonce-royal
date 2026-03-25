import { useForm } from "react-hook-form";

interface MediaAppearanceFormValues {
  name: string;
  email: string;
  outlet: string;
  appearanceType?: string;
  recordingDate?: string;
  details: string;
}

export default function MediaAppearanceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<MediaAppearanceFormValues>();

  const onSubmit = (data: MediaAppearanceFormValues) => {
    // Replace with real submission logic

    console.log("Media appearance submitted", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Media appearances</h2>
        <p className="text-sm text-slate-600">
          <strong>Rates:</strong> Inquire for rates. Fees depend on usage, distribution, and time
          commitment.
        </p>
      </div>

      {isSubmitSuccessful && (
        <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">
          Thanks for reaching out! Well get back to you shortly.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="ma-name">
            Your name
          </label>
          <input
            id="ma-name"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="ma-email">
            Email
          </label>
          <input
            id="ma-email"
            type="email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "Enter a valid email address",
              },
            })}
          />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700" htmlFor="ma-outlet">
          Outlet / organization
        </label>
        <input
          id="ma-outlet"
          type="text"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          {...register("outlet", { required: "Outlet is required" })}
        />
        {errors.outlet && <p className="text-xs text-red-600">{errors.outlet.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="ma-type">
            Appearance type (optional)
          </label>
          <input
            id="ma-type"
            type="text"
            placeholder="e.g. interview, podcast, TV, print"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("appearanceType")}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="ma-date">
            Recording / air date (optional)
          </label>
          <input
            id="ma-date"
            type="date"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("recordingDate")}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700" htmlFor="ma-details">
          Project details
        </label>
        <textarea
          id="ma-details"
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="Tell us about the project, topics, format, and timing."
          {...register("details", { required: "Please provide project details" })}
        />
        {errors.details && <p className="text-xs text-red-600">{errors.details.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Submit media inquiry
      </button>
    </form>
  );
}
