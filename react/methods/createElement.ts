export function createElementMethod(type: string | ComponentType, props: Props = {}, ...children: VNode[]): VNode {
    const { key = null, ...restProps } = props || {};

    const finalProps = {
        ...restProps,
        children, // Inject children into props
    };

    return {
        type,
        props: finalProps,
        children, // This is mostly for rendering, not for components
        ref: null,
        key,
    };
}