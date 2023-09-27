import { useEffect, useRef, useState } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { fetchPlugin } from "../plugins/fetch-plugin";

const MainPage = () => {
  const ref = useRef<any>(null);
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  const onClickFn = async () => {
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

    setCode(transformed.outputFiles[0].text);
  };
  useEffect(() => {
    startService();
  }, []);
  return (
    <>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={onClickFn} type="submit">
          Submit
        </button>
      </div>
      <pre>{code}</pre>
    </>
  );
};

export default MainPage;
