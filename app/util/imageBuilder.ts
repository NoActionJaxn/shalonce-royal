import { createImageUrlBuilder } from "@sanity/image-url";
import { validateEnvVar } from "~/lib/client";

export function imageBuilder(source: string) {
  const projectId = validateEnvVar(
    "VITE_SANITY_PROJECT_ID",
    import.meta.env.VITE_SANITY_PROJECT_ID,
  );
  const dataset = validateEnvVar("VITE_SANITY_DATASET", import.meta.env.VITE_SANITY_DATASET);

  return createImageUrlBuilder({
    projectId,
    dataset,
  }).image(source);
}
