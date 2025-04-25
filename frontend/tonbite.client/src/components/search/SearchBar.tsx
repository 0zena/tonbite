import {useState} from "react";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";

interface SearchBarProps {
    onSearch: (key: string) => void;
}

export const SearchBar = ({onSearch}: SearchBarProps) => {
    const [key, setKey] = useState("");

    const submit = () => {
        onSearch(key);
    }

    return (
        <div className="flex">
            <Input label={"Search"}
                   placeholder={"Type to search..."}
                   value={key}
                   onValueChange={setKey}
            />
            <Button onPress={submit}>Search</Button>
        </div>
    );
}