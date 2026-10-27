export type Inquiry = {
  name: string;
  phone: string;
  email: string;
  villa: string;
  date: string;
  duration: string;
  guests: string;
  message: string;
  consent: boolean;
};
export function today() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export function validate(d: Inquiry, now = today()) {
  const errors: string[] = [];
  if (d.name.trim().length < 2 || d.name.trim().length > 100)
    errors.push("name");
  if (!/^\+[1-9]\d{7,14}$/.test(d.phone.replace(/[\s()-]/g, "")))
    errors.push("phone");
  if (
    d.email &&
    (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || d.email.length > 254)
  )
    errors.push("email");
  if (!["a", "b", "c"].includes(d.villa)) errors.push("villa");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(d.date) ||
    !Number.isFinite(Date.parse(d.date)) ||
    new Date(d.date).toISOString().slice(0, 10) !== d.date ||
    d.date < now
  )
    errors.push("date");
  if (!["monthly", "yearly", "flexible"].includes(d.duration))
    errors.push("duration");
  if (
    !Number.isInteger(Number(d.guests)) ||
    Number(d.guests) < 1 ||
    Number(d.guests) > (d.villa === "c" ? 6 : 4)
  )
    errors.push("guests");
  if (d.message.length > 1500) errors.push("message");
  if (!d.consent) errors.push("consent");
  return errors;
}
export function summary(d: Inquiry, lang: string) {
  const id = lang === "id";
  return [
    id
      ? "Halo Kamaniyaloka, saya ingin mengajukan inquiry sewa."
      : "Hello Kamaniyaloka, I would like to inquire about renting.",
    `${id ? "Nama" : "Name"}: ${d.name.trim()}`,
    `WhatsApp: ${d.phone.trim()}`,
    d.email ? `Email: ${d.email.trim()}` : "",
    `Villa: ${d.villa.toUpperCase()}`,
    `${id ? "Tanggal mulai" : "Start date"}: ${d.date}`,
    `${id ? "Durasi" : "Duration"}: ${{ monthly: id ? "Bulanan" : "Monthly", yearly: id ? "Tahunan" : "Yearly", flexible: id ? "Fleksibel" : "Flexible" }[d.duration]}`,
    `${id ? "Penghuni" : "Residents"}: ${d.guests}`,
    d.message.trim(),
    id
      ? "Mohon informasi harga dan ketersediaan."
      : "Please share pricing and availability.",
  ]
    .filter(Boolean)
    .join("\n");
}
export function whatsapp(text: string) {
  return `https://wa.me/6285965932071?text=${encodeURIComponent(text)}`;
}
