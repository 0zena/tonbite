import {Icons} from "../../utils";

// UI Components
import {useState} from "react";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {Icon} from "../icon/Icon.tsx";

interface SearchBarProps {
    label?: string;
    placeholder?: string;
    value: string | undefined;
    onSearch: (key: string | undefined) => void;
}

export const SearchBar = ({label, placeholder, value, onSearch}: SearchBarProps) => {
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
            <Input label={label ?? "Search"}
                   radius={"full"}
                   size={"lg"}
                   placeholder={placeholder ?? "Type to search..."}
                   value={key}
                   endContent={<Button isIconOnly startContent={<Icon icon={Icons.SEARCH} />} onPress={submit} />}
                   onValueChange={setKey}
                   onKeyDown={handleKeyDown}
            />
        </div>
    );
}