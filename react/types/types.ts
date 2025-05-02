// types.ts

export type HookType = 'state' | 'effect' | 'memo' | 'ref';

export interface Hook {
    memoizedState: any;
    queue: Array<Function>;
    type: HookType;
}

export interface Context {
    _currentValue: any;
    _defaultValue: any;
    _calledByProvider: boolean;
    subscriptions: Set<ReactComponentInstance>;
    _currentProvider: ReactComponentInstance | null;

    Provider: (props: { value?: any; children?: any }) => any;
}

export interface ReactComponentInstance {
    name: string;
    isMounted: boolean;
    isDirty: boolean;

    hooks: Hook[];
    hookIndex: number;

    vNode: VNode | null;
    jsx: VNode | null;

    isUpdating: boolean;

    queueFunctions: Set<() => void>;

    // Lifecycle
    onMount(): void;
    onUnmount(): void;
    onUpdate(): void;
}

export interface VDomManager {
    rootDom: HTMLElement | null;

    components: Map<string, ReactComponentInstance>;
    currentComponent: ReactComponentInstance | null;
}

export interface RouterProps {
    src: string;
    component: ReactElement;
    default?: boolean;
}