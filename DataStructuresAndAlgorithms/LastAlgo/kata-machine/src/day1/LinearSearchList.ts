export default function linear_search(haystack: number[], needle: number): boolean {
  let found = false;

  for (let index = 0; index < haystack.length; index++) {
    const element = haystack[index];

    if (element == needle) {
      found = true;
    }
  }

  return found;
}