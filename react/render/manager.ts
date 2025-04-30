import { ReactComponentInstance, Hook, VDomManager } from "../types/types";
import { mount } from "./mount";
import { update } from "./update";
import { removeProp, setProps } from "./props";

export class VDomManagerImpl implements VDomManager {
    isFirstRender: boolean = true;
    rootDom: HTMLElement | null = null;
    components: Map<string, ReactComponentInstance> = new Map();
    currentComponent: ReactComponentInstance | null = null;

    staticStates: Map<string, Hook> = new Map();
    staticComponents: Map<string, string[]> = new Map();

    update = update;
    mount = mount;
    setProps = setProps;
    removeProp = removeProp
}
