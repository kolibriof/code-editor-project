import MDEditor from "@uiw/react-md-editor"
import { useEffect, useRef } from "react"
import "../styles/text-editor.css"
import { useAppDispatch, useAppSelector } from "../state/helpers/hooks"
import { setEditing } from "../state/textEditorSlice"
import React from "react"
import { Cell } from "../state/helpers/cell"
import { updateCell } from "../state/cellsReducer"

interface TextCellProps {
    cell: Cell;
}

const TextEditor: React.FC<TextCellProps> = ({ cell }) => {
    const dispatch = useAppDispatch()
    const { isEditing } = useAppSelector((store) => store.textEditorSlice)
    const editorRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (editorRef.current && e.target && editorRef.current.contains(e.target as Node)) {
                return;
            }
            dispatch(setEditing(false))
        }
        document.addEventListener("click", listener, {
            capture: true
        })
        return () => {
            document.removeEventListener("click", listener, {
                capture: true
            })
        }
    }, [])

    if (isEditing) {
        return (
            <div ref={editorRef} className="text-editor">
                <MDEditor value={cell.content} onChange={(e) => {
                    dispatch(updateCell({ id: cell.id, content: e! }))
                }} />
            </div>
        )
    }
    return (
        <div className="text-editor card" onClick={() => dispatch(setEditing(true))}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || "Click here to start editing"} />
            </div>
        </div>
    )
}

export default TextEditor