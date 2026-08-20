export function mokpClass(...classes) {
  return classes.filter(Boolean).join(" ");
}
