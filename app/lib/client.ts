import { createClient } from "@sanity/client";

const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? "2025-12-29";

interface SanityClientOptions {
  token?: string;
  useCdn?: boolean;
}

export function validateEnvVar(name: string, value: unknown) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `Invalid Sanity config: ${name} is missing. Set it in your env (e.g., .env.local).`,
    );
  }
  const isValid = /^[a-z0-9-]+$/.test(value);
  if (!isValid) {
    throw new Error(
      `Invalid Sanity config: ${name} must match /^[a-z0-9-]+$/. Received: "${value}"`,
    );
  }
  return value;
}

export function getSanityClient(opts?: SanityClientOptions) {
  const hasToken = Boolean(opts?.token);

  const projectId = validateEnvVar(
    "VITE_SANITY_PROJECT_ID",
    import.meta.env.VITE_SANITY_PROJECT_ID,
  );
  const dataset = validateEnvVar("VITE_SANITY_DATASET", import.meta.env.VITE_SANITY_DATASET);

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: opts?.useCdn ?? !hasToken,
    token: opts?.token,
    perspective: hasToken ? "drafts" : "published",
  });
}
