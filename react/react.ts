import { Props, ReactElement } from "./types";

const React = {
    createElement: (tag: string | ((props: Props, ...children: any[]) => ReactElement), props: Props, ...children: any[]): ReactElement => {
        if (typeof tag === "function") {
            return tag(props, ...children);
        }
        const el: ReactElement = {
            tag,
            props,
            children,
        };

        return el;
    },
};

export default React;
export * from "./hooks";
