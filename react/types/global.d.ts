// global.d.ts

type IReactElement = string | number | boolean | null | undefined | IReactVNode;

interface IReactVNode {
    tag: string | ComponentFunction;
    props: IProps;
    children: IReactVNode[];
    ref: HTMLElement | null;
    key: string | null;
    __ownerComponentName?: string; // Optional property to track the owner component
}

declare function h(
    tag: string | ComponentFunction,
    props: IProps,
    ...children: IReactVNode[]
): IReactVNode;

declare namespace JSX {
    type IntrinsicElements = {
        [K in keyof HTMLElementTagNameMap]: IProps;
    } & {
        // Custom component example
        MyComponent: IProps;
    };

    // Add the return type for JSX elements
    interface Element extends IReactVNode {}
}
