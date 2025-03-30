import ReactQuill, { ReactQuillProps } from "react-quill";
import "./TextEditor.scss";

export const TextEditor = (editorOptions: ReactQuillProps) => {
    return (
        <div className="text-editor">
            <ReactQuill {...editorOptions} />
        </div>
    );
}