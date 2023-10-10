import { useEffect } from "react";
import { CodeEditor } from './CodeEditor';
import { Preview } from './Preview';
import { bundle } from "../utils"
import { Resizable } from "../utils/resizable-componets/Resizable";
import { useAppDispatch, useAppSelector } from "../state/helpers/hooks";
import { setCode, setError, setInput } from "../state/codeCellSlice";
import React from "react"
import { Cell } from "../state/helpers/cell";
import { updateCell } from "../state/cellsReducer";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { code, error } = useAppSelector(store => store.codeCellSlice)
  const dispatch = useAppDispatch()
  const bundleCode = async () => {
    const output = await bundle(cell.content!)
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
  }, [cell.content!])
  return (
    <>
      <Resizable direction="y">
        <div style={{ height: "100%", display: "flex", flexDirection: "row", alignItems: 'center' }}>
          <Resizable direction="x">
            <CodeEditor initialValue={cell.content!} onChange={(value) => dispatch(updateCell({ id: cell.id, content: value }))} />
          </Resizable>
          <Preview code={code} status={error} />
        </div>
      </Resizable>
    </>
  );
};

export default CodeCell;
