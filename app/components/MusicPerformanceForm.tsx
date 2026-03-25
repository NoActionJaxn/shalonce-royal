import { useForm } from "react-hook-form";

interface MusicPerformanceFormValues {
  name: string;
  email: string;
  actName?: string;
  eventDate: string;
  venue: string;
  city: string;
  setLength?: string;
  technicalNeeds?: string;
}

export default function MusicPerformanceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<MusicPerformanceFormValues>();

  const onSubmit = (data: MusicPerformanceFormValues) => {
    // Replace with real submission logic

    console.log("Music performance submitted", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Music performances</h2>
        <p className="text-sm text-slate-600">
          <strong>Rates:</strong> Inquire for rates. Fees depend on set length, travel, and
          production needs. A deposit may be required to confirm dates.
        </p>
      </div>

      {isSubmitSuccessful && (
        <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">
          Thanks for reaching out! Well get back to you shortly.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="mp-name">
            Your name
          </label>
          <input
            id="mp-name"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="mp-email">
            Email
          </label>
          <input
            id="mp-email"
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
        <label className="block text-sm font-medium text-slate-700" htmlFor="mp-act">
          Artist / act name (optional)
        </label>
        <input
          id="mp-act"
          type="text"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          {...register("actName")}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="mp-date">
            Event date
          </label>
          <input
            id="mp-date"
            type="date"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("eventDate", { required: "Event date is required" })}
          />
          {errors.eventDate && <p className="text-xs text-red-600">{errors.eventDate.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="mp-venue">
            Venue
          </label>
          <input
            id="mp-venue"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("venue", { required: "Venue is required" })}
          />
          {errors.venue && <p className="text-xs text-red-600">{errors.venue.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="mp-city">
            City / region
          </label>
          <input
            id="mp-city"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p className="text-xs text-red-600">{errors.city.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="mp-length">
            Approx. set length (optional)
          </label>
          <input
            id="mp-length"
            type="text"
            placeholder="e.g. 30 minutes, 1 hour"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("setLength")}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700" htmlFor="mp-tech">
          Additional technical requirements (optional)
        </label>
        <textarea
          id="mp-tech"
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="Share any specific backline, monitoring, or production needs."
          {...register("technicalNeeds")}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Submit music inquiry
      </button>
    </form>
  );
}
