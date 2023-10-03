import { useEffect } from "react";
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { bundle } from "../utils"
import { Resizable } from "../utils/resizable-componets/Resizable";
import { useAppDispatch, useAppSelector } from "../state/helpers/hooks";
import { setCode, setError, setInput } from "../state/codeCellSlice";
import React from "react"


const CodeCell = () => {
  const { code, input, error } = useAppSelector((store) => store.codeCellSlice)
  const dispatch = useAppDispatch()
  const bundleCode = async () => {
    const output = await bundle(input)
    setCode(output.code)
    dispatch(setCode(output.code))
    dispatch(setError(output.error))
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
            <CodeEditor initialValue={"console.log('Your code here..')"} onChange={(value) => dispatch(setInput(value))} />
          </Resizable>
          <Preview code={code} status={error} />
        </div>
      </Resizable>
    </>
  );
};

export default CodeCell;
