import { useState, useEffect } from "react";
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { bundle } from "../utils"
import { Resizable } from "../utils/resizable-componets/Resizable";

const CodeCell = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("")

  const bundleCode = async () => {
    const output = await bundle(input)
    setCode(output)
  }
  useEffect(() => {
    const timer = setTimeout(async () => {
      bundleCode()
    }, 1000)
    return () => {
      clearTimeout(timer)
    }
  }, [input])
  return (
    <>
      <Resizable direction="y">
        <div style={{ height: "100%", display: "flex", flexDirection: "row", alignItems: 'center' }}>
          <Resizable direction="x">
            <CodeEditor initialValue={"console.log('Your code here..')"} onChange={(value) => setInput(value)} />
          </Resizable>
          <Preview code={code} />
        </div>
      </Resizable>
    </>
  );
};

export default CodeCell;
