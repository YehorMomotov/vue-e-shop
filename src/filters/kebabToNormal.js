export default function kebabToNormal(value) {
  let parts = value.toString().split("-");
  parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  return parts.join(" ");
}
