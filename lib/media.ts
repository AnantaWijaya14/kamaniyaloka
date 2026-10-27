// Add only owner-approved property photographs stored in public/images/.
export type Photo = {
  src: string;
  villa: "a" | "b" | "c";
  category: "bedroom" | "pool" | "living" | "exterior";
  alt: { id: string; en: string };
  width: number;
  height: number;
};
export const photos: Photo[] = [];
