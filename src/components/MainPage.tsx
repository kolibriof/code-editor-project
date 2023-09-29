import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";
import { CodeEditor } from './CodeEditor';

const MainPage = () => {
  const ref = useRef<any>(null);
  const iRef = useRef<HTMLIFrameElement>(null)
  const [input, setInput] = useState<string>("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

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

  const onClickFn = async () => {
    iRef.current!.srcdoc = html;
    if (!ref.current) {
      return;
    }
    const transformed = await ref.current.build({
      entryPoints: ["index.js"],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
    });

    // setCode(transformed.outputFiles[0].text);
    if (iRef.current?.contentWindow) {
      iRef.current.contentWindow.postMessage(transformed.outputFiles[0].text, "*")
    }

  };

  useEffect(() => {
    startService();
  }, []);
  return (
    <>
      <CodeEditor initialValue={"console.log('Your code here..')"} onChange={(value) => setInput(value)}></CodeEditor>
      <div>
        <button onClick={onClickFn} type="submit">
          Submit
        </button>
      </div>
      <iframe srcDoc={html} ref={iRef} sandbox="allow-scripts" title="code-exec"></iframe>
    </>
  );
};

export default MainPage;
