import { useEffect, useRef } from "react";
import Quill, { QuillOptions } from "quill";
import "./TextEditor.scss";

const editorOptions: QuillOptions = {
    placeholder: "Compose an epic...",
    theme: "snow",
}

export const TextEditor = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillInstance = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, editorOptions);
        }
    }, []);

    return (
        <div className={"text-editor"}>
            <div ref={editorRef} style={{ height: "200px" }} />
        </div>
    );
}