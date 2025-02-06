export type Props = { [key: string]: any };

export type ReactElement = {
    tag: string | ((props: Props, ...children: any[]) => ReactElement);
    props: Props;
    children: any[];
    dom: HTMLElement | null;
};

export type TCleanupCallback = () => void;
export type TEffectCallback = () => TCleanupCallback | void;
export type TDependencyList = readonly unknown[];

export interface FC<P = {}> {
    (props: P & { children?: any }): ReactElement | null;
}
