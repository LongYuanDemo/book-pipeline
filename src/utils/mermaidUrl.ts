function utf8ToUrlSafeBase64(str: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function buildMermaidUrl(mermaidCode: string): string {
  let code = mermaidCode;
  if (!code.includes('\nconfig:')) {
    code = '\n---\nconfig:\n    flowchart:\n        useMaxWidth: false\n---\n' + code;
    code = code.trim();
  }
  const base64 = utf8ToUrlSafeBase64(code);
  return `/mermaid?c=${base64}`;
}
