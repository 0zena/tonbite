import { FieldError } from "react-hook-form";

export const ValidationError = ({error}: {error: FieldError | undefined}) => {
    return (
        <>
            {error && (<p className="text-danger text-tiny mt-1">{error.message}</p>)}
        </>
    );
}