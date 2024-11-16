import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "o9zetie0",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true,
});
