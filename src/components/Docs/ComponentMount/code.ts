export const CODE_mountFunction = `async function mount(props: MountProps): Promise<Element | null> {
    const { vNode, parent, name, mode = "append", isSvg } = props;

    if (isNullOrUndefined(vNode))
        return parent;

    if (Array.isArray(vNode))
        return mountArrayVNode(vNode, parent, name, isSvg);

    if (isPrimitive(vNode))
        return mountPrimitive(vNode as string | number, parent, mode);

    if (typeof vNode === "boolean")
        return mountBooleanVNode(vNode, parent);

    if (typeof (vNode as VNode).type === "function")
        return await mountComponentVNode(vNode as ReactElement, parent, mode, isSvg);

    return mountElementVNode(vNode as ReactElement, parent, name, mode, isSvg);
}`

export const CODE_mountElementVNode = `const mountElementVNode = (
    vNode: ReactElement,
    parent: Element,
    name: string,
    mode: MountMode,
    isSvg?: boolean
): Element => {
    const nextIsSvg = vNode.type === "svg" || isSvg;
    const dom = nextIsSvg
        ? document.createElementNS("http://www.w3.org/2000/svg", vNode.type as string)
        : document.createElement(vNode.type as string);

    vNode.ref = dom;

    for (const [key, value] of Object.entries(vNode.props)) {
        setProps({ ref: dom, key, value });
    }

    for (const child of vNode.children) {
        mount({ vNode: child, parent: dom, name, isSvg: nextIsSvg });
    }

    addToDom(dom, parent, mode);
    return dom;
};`

export const CODE_addToDom = `function addToDom(dom: Element | Text, parent: Element | null, mode: MountMode){
    if(!parent) throw new Error("Parent is null");

    if (mode === "replace") 
        parent.replaceWith(dom);
    else if (mode === "before") 
        parent.insertBefore(dom, parent.firstChild);
    else if (mode === "after") 
        parent.after(dom);
    else 
        parent.appendChild(dom);
}`;