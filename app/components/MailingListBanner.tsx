import React from "react";
import { useFetcher } from "react-router";
import { useCookies } from "react-cookie";
import CloseButton from "~/components/CloseButton";

const COOKIE_NAME = "mailing_list_dismissed";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

const MailingListBanner: React.FC = () => {
  const [cookies, setCookie] = useCookies([COOKIE_NAME]);
  const fetcher = useFetcher<{ success?: boolean; error?: string }>();
  const isSubmitting = fetcher.state !== "idle";
  const isSuccess = fetcher.data?.success === true;
  const serverError = fetcher.data?.error;

  const handleClose = () => {
    setCookie(COOKIE_NAME, "true", { path: "/", maxAge: COOKIE_MAX_AGE, sameSite: "lax" });
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

        <fetcher.Form method="post" action="/side-a/api/mailing-list">
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full rounded-md border bg-white border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </div>
        </fetcher.Form>
        {serverError ? (
          <p className="text-xs text-red-600 mt-2">{serverError}</p>
        ) : isSuccess ? (
          <p className="text-sm text-green-600 mt-2">Thank you for subscribing!</p>
        ) : null}
      </div>
    </div>
  );
};

MailingListBanner.displayName = "MailingListBanner";

export default MailingListBanner;
