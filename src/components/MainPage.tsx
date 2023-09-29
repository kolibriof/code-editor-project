import 'bulmaswatch/superhero/bulmaswatch.min.css'
import { useState } from "react";
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { bundle } from "../utils"

const MainPage = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("")

  const onClick = async () => {
    const output = await bundle(input)
    setCode(output)
  }
  return (
    <>
      <CodeEditor initialValue={"console.log('Your code here..')"} onChange={(value) => setInput(value)}></CodeEditor>
      <div>
        <button onClick={onClick} type="submit">
          Submit
        </button>
      </div>
      <Preview code={code} />
    </>
  );
};

export default MainPage;
