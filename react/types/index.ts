export type Props = { [key: string]: any };

export type ReactNode = {
    tag: string | ((props: Props, ...children: any[]) => ReactNode);
    props: Props;
    children: any[];
    ref: HTMLElement | null;
};

export type ReactElement = ReactNode | string | number | boolean | null;

export type ReactComponentTree = {
    name: string;
    instance: ReactElement;
    parent: ReactComponentTree | null;
    state: {
        hookIndex: number;
        hookStates: any[];
    };
}

export type TCleanupCallback = () => void;
export type TEffectCallback = () => TCleanupCallback | void;
export type TDependencyList = readonly unknown[];

// Update

export interface IReactUpdate {
}

export interface IReactMount {
    component: ReactComponentTree;
    container?: HTMLElement;
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