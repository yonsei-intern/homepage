import { useEffect, useState } from "react";

export type SiteImages = Record<string, string | null>;

export function useSiteImages() {
  const [images, setImages] = useState<SiteImages>({});

  useEffect(() => {
    const controller = new AbortController();

    const loadImages = async () => {
      try {
        const response = await fetch("/api/site-images", { signal: controller.signal });
        if (!response.ok) return;
        setImages(await response.json());
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setImages({});
        }
      }
    };

    loadImages();
    return () => controller.abort();
  }, []);

  return images;
}
