export default function uniqueKey() {
  const r = (Math.random() + 1).toString(36).substring(7);
  return r;
}
