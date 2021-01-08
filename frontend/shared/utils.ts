const { inspectedWindow } = chrome.devtools

export function reload() {
  setTimeout(() => {
    inspectedWindow.reload(null)
  }, 16)
}

export function execScript(script: string) {
  if (typeof script !== 'string') return
  script = `
    (function __execScript() {
      ${script}
    })();
  `
  console.log(script)
  inspectedWindow.eval(script)
}