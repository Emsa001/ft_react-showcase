export type Props = { [key: string]: any };
export type ReactElement = {
    tag: string | ((props: Props, ...children: any[]) => ReactElement);
    props: Props;
    children: any[];
};

export type TCleanupCallback = () => void;
export type TEffectCallback = () => TCleanupCallback | void;
export type TDependencyList = readonly unknown[];