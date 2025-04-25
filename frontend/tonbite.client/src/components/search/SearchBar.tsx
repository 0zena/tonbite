import {useState} from "react";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";

interface SearchBarProps {
    value: string | undefined;
    onSearch: (key: string | undefined) => void;
}

export const SearchBar = ({value, onSearch}: SearchBarProps) => {
    const [key, setKey] = useState(value);

    const submit = () => {
        onSearch(key);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            submit();
        }
    };

    return (
        <div className="flex">
            <Input label={"Search"}
                   placeholder={"Type to search..."}
                   value={key}
                   onValueChange={setKey}
                   onKeyDown={handleKeyDown}
            />
            <Button onPress={submit}>Search</Button>
        </div>
    );
}