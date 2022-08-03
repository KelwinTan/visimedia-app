export default function revalidateAfter(ms) {
  return new Date(new Date().getTime() + ms);
}
