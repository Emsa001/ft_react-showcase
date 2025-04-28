import { IVDomManager, IReactComponent } from "../types";
import { mount } from "./mount";
import { update } from "./update";
import { removeProp, setProps } from "./props";

export class VDomManagerImpl implements IVDomManager {
    rootDom: HTMLElement | null = null;
    components: Map<string, IReactComponent> = new Map();
    currentComponent: IReactComponent | null = null;

    update = update;
    mount = mount;
    setProps = setProps;
    removeProp = removeProp
}
