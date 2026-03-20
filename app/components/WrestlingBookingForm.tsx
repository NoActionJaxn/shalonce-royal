import { useForm } from "react-hook-form";

interface WrestlingBookingFormValues {
  name: string;
  email: string;
  promotion?: string;
  eventDate: string;
  eventLocation: string;
  matchDetails: string;
}

export default function WrestlingBookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<WrestlingBookingFormValues>();

  const onSubmit = (data: WrestlingBookingFormValues) => {
    // Replace with real submission logic (e.g., action or API)
    // For now, just reset after a successful submit

    console.log("Wrestling booking submitted", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Wrestling bookings</h2>
        <p className="text-sm text-slate-600">
          <strong>Rates:</strong> Inquire for rates. Pricing varies based on travel, event profile,
          and match requirements.
        </p>
      </div>

      {isSubmitSuccessful && (
        <p className="rounded-md bg-emerald-50 p-3 text-sm text-emerald-800">
          Thanks for reaching out! Well get back to you shortly.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="wb-name">
            Your name
          </label>
          <input
            id="wb-name"
            type="text"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="wb-email">
            Email
          </label>
          <input
            id="wb-email"
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
        <label className="block text-sm font-medium text-slate-700" htmlFor="wb-promotion">
          Promotion / company (optional)
        </label>
        <input
          id="wb-promotion"
          type="text"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          {...register("promotion")}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="wb-date">
            Event date
          </label>
          <input
            id="wb-date"
            type="date"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("eventDate", { required: "Event date is required" })}
          />
          {errors.eventDate && <p className="text-xs text-red-600">{errors.eventDate.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-slate-700" htmlFor="wb-location">
            Event location
          </label>
          <input
            id="wb-location"
            type="text"
            placeholder="City, state / country"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            {...register("eventLocation", { required: "Event location is required" })}
          />
          {errors.eventLocation && (
            <p className="text-xs text-red-600">{errors.eventLocation.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-slate-700" htmlFor="wb-details">
          Match details
        </label>
        <textarea
          id="wb-details"
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="Tell us about the event, opponent, match type, and any special requests."
          {...register("matchDetails", { required: "Please provide match details" })}
        />
        {errors.matchDetails && (
          <p className="text-xs text-red-600">{errors.matchDetails.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700"
      >
        Submit wrestling inquiry
      </button>
    </form>
  );
}
