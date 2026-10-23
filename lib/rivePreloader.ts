import { RuntimeLoader } from "@rive-app/canvas";

let cachedBuffer: ArrayBuffer | null = null;
let loadPromise: Promise<ArrayBuffer> | null = null;

export function preloadRiveCompanion(): Promise<ArrayBuffer> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SSR"));
  }

  // Pre-initialize WASM runtime in parallel with fetching the binary asset
  RuntimeLoader.awaitInstance().catch(() => { });

  if (cachedBuffer) {
    return Promise.resolve(cachedBuffer);
  }

  if (!loadPromise) {
    loadPromise = fetch("/ai_companion.riv")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load /ai_companion.riv: ${res.statusText}`);
        }
        return res.arrayBuffer();
      })
      .then((buf) => {
        cachedBuffer = buf;
        return buf;
      })
      .catch((err) => {
        console.error("Error preloading Rive companion:", err);
        loadPromise = null;
        throw err;
      });
  }

  return loadPromise;
}

export function getCachedRiveBuffer(): ArrayBuffer | null {
  return cachedBuffer;
}

// Automatically trigger preload and WASM runtime load when module evaluates on the client
if (typeof window !== "undefined") {
  RuntimeLoader.awaitInstance().catch(() => { });
  preloadRiveCompanion().catch(() => {
    // Non-fatal, will retry on component mount
  });
}
