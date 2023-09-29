import { useEffect, useRef } from "react";
import "../styles/code-preview.css"

interface PreviewProps {
  code: string;
}

const html = `
  <html>
        <head></head>
        <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (e)=> {
            try {
              eval(e.data)
            } catch (error) {
              document.getElementById("root").innerHTML = error;
              document.getElementById("root").style = "color: red; font-size: 20px";
              console.error(error);
            }
          }, false)
        </script>
        </body>
  </html>`

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    iRef.current!.srcdoc = html;
    if (iRef.current?.contentWindow) {
      iRef.current.contentWindow.postMessage(code, "*")
    }
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe srcDoc={html} ref={iRef} sandbox="allow-scripts" title="code-exec" />
    </div>
  )

}