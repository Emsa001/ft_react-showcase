export type Props = { [key: string]: any };

export type ReactElement = ReactNode | string | number | boolean | null;

export type ReactNode = {
    tag: string | ((props: Props, ...children: any[]) => ReactNode);
    props: Props;
    children: ReactElement[];
    ref: HTMLElement | null;
};

export type ReactComponentTree = {
    name: string;
    instance: ReactElement;
    keys: Map<string, ReactNode>;
    state: {
        hookIndex: number;
        hookStates: any[];
    };
    jsx: ReactNode | null;
}

export type TCleanupCallback = () => void;
export type TEffectCallback = () => TCleanupCallback | void;
export type TDependencyList = readonly unknown[];

// Update

export interface IReactUpdate {
    component: ReactComponentTree;
}

export interface IReactMount {
    component?: ReactComponentTree;
    instance: ReactElement;
    container?: HTMLElement;
    mode?: "append" | "replace";
}

export interface IReactSetProps {
    ref: HTMLElement;
    key: string;
    value: any;
}

export interface ElementProps {
    children?: React.ReactNode;
    params?: Record<string, string | undefined>;
}