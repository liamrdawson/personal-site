import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "e63pgpnq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
