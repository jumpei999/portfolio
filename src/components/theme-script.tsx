const themeScript = `
(function () {
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  function syncDarkClass() {
    document.documentElement.classList.toggle("dark", media.matches);
  }
  syncDarkClass();
  media.addEventListener("change", syncDarkClass);
})();
`

export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  )
}
