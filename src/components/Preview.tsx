import { useEffect, useRef } from "react";
import "../styles/code-preview.css"

interface PreviewProps {
  code: string;
  status?: string;
}

const html = `
  <html>
        <head></head>
        <body>
        <div id="root"></div>
        <script>
        const handleError = (error) => {
              document.getElementById("root").innerHTML = error;
              document.getElementById("root").style = "color: red; font-size: 20px";
              console.error(error);
        };
          window.addEventListener("error", (e) => {
            e.preventDefault();
            handleError(e.error)
            })
          window.addEventListener('message', (e)=> {
            try {
              eval(e.data)
            } catch (error) {
              handleErrror(error);
            }
          }, false)
        </script>
        </body>
  </html>`

export const Preview: React.FC<PreviewProps> = ({ code, status }) => {
  const iRef = useRef<HTMLIFrameElement>(null)
  useEffect(() => {
    iRef.current!.srcdoc = html;
    setTimeout(() => {
      if (iRef.current?.contentWindow) {
        iRef.current.contentWindow.postMessage(code, "*")
      }
    }, 50)
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe srcDoc={html} ref={iRef} sandbox="allow-scripts" title="code-exec" />
      {status && <div className="preview-error">{status}</div>}
    </div>
  )

}