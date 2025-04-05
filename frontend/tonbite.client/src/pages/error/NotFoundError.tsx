import NotFound from "../../assets/NotFound.svg";

export const NotFoundError = () => {
    return <div className={"flex flex-col size-full items-center justify-center"}>
        <h1>Sorry, we can`t find this page.</h1>
        <img src={NotFound} alt="Not Found" className={"h-full"} />
    </div>;
}