/**
 * Safely serialize a JSON-LD object for injection into a <script> tag.
 *
 * JSON.stringify does NOT escape "<", ">" or "&", so a value coming from the
 * database (e.g. a product name like `</script><script>alert(1)</script>`)
 * would break out of the JSON-LD script tag and execute — a stored XSS.
 *
 * Escaping these characters (and the JS line separators U+2028/U+2029) makes
 * the payload safe while keeping it valid JSON-LD: search engines parse the
 * unicode escapes back to the original characters.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
