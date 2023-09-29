import { useState } from "react";
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { bundle } from "../utils"
import { Resizable } from "../utils/resizable-componets/Resizable";

const CodeCell = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("")

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output)
  }
  return (
    <>
      <Resizable direction="y">
        <div style={{ height: "100%", display: "flex", flexDirection: "row", alignItems: 'center' }}>
          <CodeEditor initialValue={"console.log('Your code here..')"} onChange={(value) => setInput(value)} />
          <Preview code={code} />
        </div>
      </Resizable>
    </>
  );
};

export default CodeCell;
