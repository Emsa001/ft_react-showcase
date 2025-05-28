export const CODE_ReactComponentInstance = `interface ReactComponentInstance {
    name: string;
    isMounted: boolean;
    isDirty: boolean; // Marks if the component needs to re-render

    hooks: Hook[]; // Internal hook state storage
    hookIndex: number; // Tracks the current hook during rendering

    vNode: VNode | null; // The last rendered virtual node
    jsx: VNode | null; // The latest JSX tree returned by the component

    queueFunctions: Set<() => void>; // Scheduled side effects to be executed

    // Lifecycle methods
    onMount(): void;
    onUnmount(): void;
    onUpdate(): void;
}
`;

export const CODE_createComponentInstanceMethod = `function createComponentInstanceMethod(element: ReactElement): ReactComponentInstance {
    if (typeof element.type !== "function") {
        throw new Error("Invalid component type");
    }

    let name = element.type.name;
    while(React.components.has(name)) 
        name = element.type.name + Math.random().toString(36).substring(2, 15);
    element.componentName = name;

    return {
        name: name,
        isMounted: false,
        isDirty: false,

        hooks: [],
        hookIndex: 0,

        vNode: null,
        jsx: element,

        queueFunctions: new Set<() => void>(),

        onMount() {
            this.isMounted = true;
        },
        onUnmount() {
            const allChildren = Array.isArray(this.vNode?.children) ? this.vNode?.children : [];
            for (const child of allChildren) unMountNode(child);

            React.components.delete(this.name);
            React.staticComponents.delete(this.name);

            this.vNode?.ref?.remove();
            this.queueFunctions.forEach((fn) => fn());
            this.queueFunctions.clear();
            
            this.isMounted = false;
            this.vNode = null;
            this.jsx = null;
            this.hooks = [];
            this.hookIndex = 0;
        },
        onUpdate() {            
            this.isDirty = false;
        },
    };
}`;
