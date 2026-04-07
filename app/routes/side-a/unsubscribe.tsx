import { useFetcher, useLoaderData } from "react-router";
import { getSanityClient } from "~/lib/client";
import Page from "~/components/Page";
import Container from "~/components/Container";
import type { Route } from "./+types/unsubscribe";

interface LoaderData {
  email: string | null;
  found: boolean;
  error?: string;
}

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?.trim() || null;

  if (!email) {
    return { email: null, found: false, error: "No email address provided." };
  }

  try {
    const client = getSanityClient();
    const result = await client.fetch<{ _id: string } | null>(
      `*[_type == "wrestlingEmailList" && email == $email][0]{ _id }`,
      { email },
    );

    if (!result) {
      return { email, found: false, error: "This email is not subscribed to our mailing list." };
    }

    return { email, found: true };
  } catch {
    return { email, found: false, error: "Something went wrong. Please try again later." };
  }
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return Response.json({ error: "No email provided." }, { status: 400 });
  }

  const token = process.env.SANITY_STUDIO_API_TOKEN;
  if (!token) {
    return Response.json({ error: "Server misconfiguration." }, { status: 500 });
  }

  try {
    const client = getSanityClient({ token });
    const doc = await client.fetch<{ _id: string } | null>(
      `*[_type == "wrestlingEmailList" && email == $email][0]{ _id }`,
      { email },
    );

    if (!doc) {
      return Response.json(
        { error: "This email is not subscribed to our mailing list." },
        { status: 404 },
      );
    }

    await client.delete(doc._id);
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to unsubscribe. Please try again." }, { status: 500 });
  }
}

export default function Unsubscribe() {
  const { email, found, error } = useLoaderData<LoaderData>();
  const fetcher = useFetcher<{ success?: boolean; error?: string }>();
  const isSubmitting = fetcher.state !== "idle";
  const isSuccess = fetcher.data?.success === true;
  const actionError = fetcher.data?.error;

  return (
    <Page className="flex items-center justify-center">
      <Container className="max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold">Unsubscribe</h1>

        {!found && <p className="text-sm text-red-600">{error}</p>}

        {found && !isSuccess && (
          <>
            <p className="text-sm text-slate-600">
              Are you sure you want to unsubscribe <strong>{email}</strong> from the mailing list?
            </p>
            <fetcher.Form method="post">
              <input type="hidden" name="email" value={email!} />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-slate-900 px-6 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
              >
                {isSubmitting ? "Unsubscribing..." : "Unsubscribe"}
              </button>
            </fetcher.Form>
            {actionError && <p className="text-xs text-red-600">{actionError}</p>}
          </>
        )}

        {isSuccess && (
          <p className="text-sm text-green-600">
            You have been successfully unsubscribed from the mailing list.
          </p>
        )}
      </Container>
    </Page>
  );
}
