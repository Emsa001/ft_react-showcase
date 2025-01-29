export type Props = { [key: string]: any };
export type ReactElement = {
    tag: string | ((props: Props, ...children: any[]) => ReactElement);
    props: Props;
    children: any[];
};