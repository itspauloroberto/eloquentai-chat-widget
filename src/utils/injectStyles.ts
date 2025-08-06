let injected = false;

export function injectStyles(css: string, id = "@itspauloroberto/eloquentai-chat-widget-styles") {
  // Skip injection in non-browser environments (Node.js, SSR)
  if (typeof document === "undefined" || injected || document.getElementById(id)) return;

  const tag = document.createElement("style");
  tag.id = id;
  tag.textContent = css;
  document.head.appendChild(tag);

  injected = true;
}
