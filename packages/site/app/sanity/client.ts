import type { ClientConfig } from "@sanity/client";
import { createClient } from "@sanity/client";

const clientConfig: ClientConfig = import.meta.env.DEV
  ? {
      projectId: "e63pgpnq",
      dataset: "production",
      apiVersion: "2024-01-01",
      useCdn: true,
      token: import.meta.env.VITE_SANITY_DRAFTS,
      ignoreBrowserTokenWarning: true,
    }
  : {
      projectId: "e63pgpnq",
      dataset: "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    };

export const client = createClient(clientConfig);
