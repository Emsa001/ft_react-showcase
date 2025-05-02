// global.d.ts

type ReactNode = ReactElement | string | number | boolean | null | undefined;
type ReactElement = VNode;

interface Props {
    key?: string | number | null;
    [propName: string]: any;
}

interface VNode {
    type: string | ComponentType;
    props: Props;
    children: VNode[];
    ref: HTMLElement | null;
    key: string | number | null;
    componentName?: string;
}

declare function h(
    type: string | ComponentType,
    props: Props,
    ...children: VNode[]
): VNode;

declare namespace JSX {
    type Element = VNode;

    interface ElementAttributesProperty {
        props: {};
    }

    interface IntrinsicAttributes {
        key?: string | number;
    }

    type IntrinsicElements = {
        [K in keyof HTMLElementTagNameMap]: Props;
    } & {
        MyComponent: Props;
    };
}


type Props = { [key: string]: any };
type ComponentType = (props: Props, ...children: any[]) => VNode;
