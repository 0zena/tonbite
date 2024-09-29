import React from "react"; 
import { useEffect, useState } from "react"
import axios from "axios";


const TestRequest: React.FC = () => {
    const [text, setText] = useState<string>('');

    useEffect(() => {
        axios.get<string>("http://localhost:5057/api/test")
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