import MDEditor from "@uiw/react-md-editor"
import { useEffect, useRef } from "react"
import "../styles/text-editor.css"
import { useAppDispatch, useAppSelector } from "../state/helpers/hooks"
import { setEditingValue, setEditing } from "../state/textEditorSlice"
import React from "react"


const TextEditor: React.FC = () => {
    const dispatch = useAppDispatch()
    const { editValue, isEditing } = useAppSelector((store) => store.textEditorSlice)
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
                <MDEditor value={editValue} onChange={(e) => {
                    dispatch(setEditingValue(e!))
                }} />
            </div>
        )
    }
    return (
        <div className="text-editor card" onClick={() => dispatch(setEditing(true))}>
            <div className="card-content">
                <MDEditor.Markdown source={editValue} />
            </div>
        </div>
    )
}

export default TextEditor