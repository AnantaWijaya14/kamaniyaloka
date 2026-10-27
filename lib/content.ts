export type Lang = "id" | "en";
export const address =
  "Jl. Pengubengan Kauh, Gg. Tualen, Kerobokan Kelod, Kuta Utara, Kabupaten Badung, Bali 80363, Indonesia";
export const pages = [
  "",
  "about",
  "villas",
  "facilities",
  "gallery",
  "inquiry",
  "location",
  "contact",
];
export const navigation = {
  id: [
    "Beranda",
    "Tentang",
    "Villa Kami",
    "Fasilitas",
    "Galeri",
    "Inquiry Sewa",
    "Lokasi",
    "Kontak",
  ],
  en: [
    "Home",
    "About",
    "Our Villas",
    "Amenities",
    "Gallery",
    "Rental Inquiry",
    "Location",
    "Contact",
  ],
};
const common = [
  ["Kolam renang pribadi", "Private swimming pool"],
  ["AC", "Air conditioning"],
  ["Water heater", "Water heater"],
  ["Shower", "Shower"],
  ["Taman", "Garden"],
  ["Kompor", "Stove"],
  ["Parkir pribadi", "Private parking"],
];
export const villas = [
  {
    id: "a",
    beds: 2,
    guests: 4,
    furnished: true,
    amenities: [
      ...common,
      ["Sofa & ruang tamu", "Sofa & living room"],
      ["Lemari pakaian", "Wardrobe"],
      ["Peralatan masak & makan", "Cookware & tableware"],
      ["Housekeeping 1 kali seminggu", "Weekly housekeeping"],
      ["Wi-Fi", "Wi-Fi"],
      ["Smart TV / TV", "Smart TV / TV"],
      ["Tempat tidur & kasur", "Beds & mattresses"],
      ["Dapur lengkap", "Fully equipped kitchen"],
      ["Kulkas", "Refrigerator"],
      ["Meja makan", "Dining table"],
    ],
  },
  {
    id: "b",
    beds: 2,
    guests: 4,
    furnished: false,
    amenities: [
      ...common,
      ["Kitchen set / kabinet dapur", "Kitchen cabinets"],
      ["Sumber air / pompa air", "Water supply / pump"],
      ["Dapur kosong", "Unfurnished kitchen area"],
      ["Ruang tamu", "Living room"],
      ["Balkon / teras", "Balcony / terrace"],
      ["Meteran listrik sendiri", "Individual electricity meter"],
      ["Gudang", "Storage"],
    ],
  },
  {
    id: "c",
    beds: 3,
    guests: 6,
    furnished: false,
    amenities: [
      ...common,
      ["Kitchen set / kabinet dapur", "Kitchen cabinets"],
      ["Wi-Fi", "Wi-Fi"],
      ["Ruang makan", "Dining room"],
      ["Pagar & gerbang pribadi", "Private fence & gate"],
      ["Sumber air / pompa air", "Water supply / pump"],
      ["Dapur kosong", "Unfurnished kitchen area"],
      ["Ruang tamu", "Living room"],
      ["Balkon / teras", "Balcony / terrace"],
      ["Meteran listrik sendiri", "Individual electricity meter"],
      ["Gudang", "Storage"],
    ],
  },
];
export type Villa = (typeof villas)[number];
export function pick(lang: Lang, id: string, en: string) {
  return lang === "id" ? id : en;
}
