export type IProps = { [key: string]: any };
export type ComponentFunction = (props: IProps, ...children: IReactVNode[]) => IReactVNode;

export type HookType = 'state' | 'effect' | 'memo' | 'ref';
export interface IHook {
    memoizedState: any;                 // stored value
    queue: Array<Function>;             // for useState: pending state updates
    type: HookType;                     // type of the hook
}

export interface IReactComponent {
    name: string;
    isMounted: boolean;

    states: IHook[];
    hookIndex: number;
    
    vNode: IReactVNode | null;
    jsx: IReactVNode | null;

    isUpdating: boolean;

    // Lifecycle methods
    onMount(): void;
    onUnmount(): void;
    onUpdate(): void;
}

export interface IVDomManager {
    rootDom: HTMLElement | null;

    components: Map<string, IReactComponent>;
    currentComponent: IReactComponent | null;

    // Mount new app
    mount(element: IReactComponent, container: HTMLElement): void;

    // Rerender the component
    update(oldNode: IReactElement, newVNode: IReactElement, ref: HTMLElement, index:number, name: string): void;
}
