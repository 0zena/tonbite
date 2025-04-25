import {Spinner} from "@heroui/spinner";

export const LoadingLayout = () => {
    return (
        <div className="flex justify-self-center items-center gap-4">
            <Spinner />
            Loading...
        </div>
    );
}