import { IVDomManager, IReactComponent, IHook } from "../types";
import { mount } from "./mount";
import { update } from "./update";
import { removeProp, setProps } from "./props";

export class VDomManagerImpl implements IVDomManager {
    rootDom: HTMLElement | null = null;
    components: Map<string, IReactComponent> = new Map();
    currentComponent: IReactComponent | null = null;

    staticStates: Map<string, IHook> = new Map();
    staticComponents: Map<string, string[]> = new Map();

    update = update;
    mount = mount;
    setProps = setProps;
    removeProp = removeProp
}
