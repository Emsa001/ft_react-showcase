export let hookStates: any[] = [];
export let hookIndex = 0;

export const setHookStates = (states: any[]) => {
    hookStates = states;
}

export const setHookIndex = (index: number) => {
    hookIndex = index;
}

export const resetHooks = () => {
    hookStates = [];
    hookIndex = 0;
}