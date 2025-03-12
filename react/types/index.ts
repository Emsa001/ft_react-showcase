export type Props = { [key: string]: any };

export type ReactElement = {
    tag: string | ((props: Props, ...children: any[]) => ReactElement);
    props: Props;
    children: any[];
    ref: HTMLElement | null;
};

export type ReactComponentTree = {
    name: string;
    instance: React.ReactNode;
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
    dom: HTMLElement;
    el: ReactElement;
    prop: string;
}

export interface ElementProps {
    children?: React.ReactNode;
    params?: Record<string, string | undefined>;
}