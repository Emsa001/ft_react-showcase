export const isValidElementMethod = (object: unknown): object is JSX.Element => {
    return (
        typeof object === "object" &&
        object !== null &&
        "tag" in object &&
        "props" in object &&
        "key" in object
    );
};