import MDEditor from "@uiw/react-md-editor"
import { useState, useEffect, useRef } from "react"
import "../styles/text-editor.css"

const TextEditor: React.FC = () => {
    const [editing, setEditing] = useState<boolean>(true)
    const [editValue, setEditValue] = useState<string>("")
    const editorRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (editorRef.current && e.target && editorRef.current.contains(e.target as Node)) {
                return;
            }
            setEditing(false)
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

    if (editing) {
        return (
            <div ref={editorRef} className="text-editor">
                <MDEditor value={editValue} onChange={(e) => {
                    setEditValue(e!);
                }} />
            </div>
        )
    }
    return (
        <div className="text-editor card" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown source={editValue} />
            </div>
        </div>
    )
}

export default TextEditor