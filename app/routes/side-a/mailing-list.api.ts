import { getSanityClient } from "~/lib/client";
import type { Route } from "./+types/mailing-list.api";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();

  if (!email || !/^\S+@\S+$/i.test(email)) {
    return Response.json({ error: "Please enter a valid email" }, { status: 400 });
  }

  const token = process.env.SANITY_STUDIO_API_TOKEN;
  if (!token) {
    return Response.json({ error: "'t wrong, please try again" }, { status: 500 });
  }

  try {
    const client = getSanityClient({ token });

    await client.create({
      _type: "wrestlingEmailList",
      email,
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
