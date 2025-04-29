// global.d.ts

type IReactElement = string | number | boolean | null | undefined | IReactVNode | Array<IReactElement>;

interface IProps {
    key?: string | number | null; // Add key here
    [propName: string]: any; // Allow other props
}

interface IReactVNode {
    tag: string | ComponentFunction;
    props: IProps;
    children: IReactVNode[];
    ref: HTMLElement | null;
    key: string | null;
}


declare function h(
    tag: string | ComponentFunction,
    props: IProps,
    ...children: IReactVNode[]
): IReactVNode;

declare namespace JSX {
    type Element = IReactVNode;

    interface ElementAttributesProperty {
        props: {}; // tells TypeScript to look inside "props" for props validation
    }

    interface IntrinsicAttributes {
        key?: string | number; // <- key is allowed on *any* element!
    }

    type IntrinsicElements = {
        [K in keyof HTMLElementTagNameMap]: IProps;
    } & {
        // Custom components
        MyComponent: IProps;
    };
}
