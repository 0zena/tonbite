import React from "react"; 
import { useEffect, useState } from "react"
import api from "../services";


const TestRequest: React.FC = () => {
    const [text, setText] = useState<string>('');

    useEffect(() => {
        api.get<string>("test")
        .then(r => { setText(r.data); })
    })

    return (
        <div>
            <h1>Fetched Text:</h1>
            <p>{text}</p> {/* Display the fetched text */}
        </div>
    );
};

export default TestRequest;