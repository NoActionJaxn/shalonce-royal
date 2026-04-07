import React from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import CloseButton from "~/components/CloseButton";

const COOKIE_NAME = "mailing_list_dismissed";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

interface MailingListFormValues {
  email: string;
}

const MailingListBanner: React.FC = () => {
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<MailingListFormValues>();

  const handleClose = () => {
    setCookie(COOKIE_NAME, "true", { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax" });
  };

  const onSubmit = (data: MailingListFormValues) => {
    // Replace with real submission logic
    console.log("Mailing list submitted", data);
    reset();
  };

  if (cookies[COOKIE_NAME]) {
    return null;
  }

  return (
    <div className="z-50 fixed bottom-0 left-0 right-0 min-h-72 container-fluid px-6 sm:px-8 lg:px-16 border-t border-neutral-300/80 bg-white/80 backdrop-blur-md">
      <CloseButton
        onClick={handleClose}
        className="top-4 right-4 text-black! bg-transparent! hover:bg-black/10!"
      />
      <div className="h-full container px-6 sm:px-8 lg:px-16 mx-auto py-12">
        <div className="pb-8 space-y-4">
          <h2 className="text-2xl font-bold">Join the mailing list.</h2>
          <p>
            Be the first to know about our latest updates, sales, exclusive offers and special
            events.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-md border bg-white border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />

            <button
              type="submit"
              className="rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Subscribe
            </button>
          </div>
        </form>
        {errors.email && <p className="text-xs text-red-600 mt-2">{errors.email.message}</p>}
        {isSubmitSuccessful && (
          <p className="text-sm text-green-600 mt-2">Thanks for subscribing to our mailing list!</p>
        )}
      </div>
    </div>
  );
};

MailingListBanner.displayName = "MailingListBanner";

export default MailingListBanner;
