import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Cloudflare build config. Keep this separate from the Netlify config so each
// host uses its own adapter without plugin conflicts.
export default defineConfig({
  cloudflare: {},
  tanstackStart: {
    server: { entry: "server" },
  },
});
