import { IVDomManager, IReactComponent } from "../types";
import { createDom } from "./createDom";
import { update } from "./update";
import { setProps } from "./setProps";

export class VDomManagerImpl implements IVDomManager {
    rootDom: HTMLElement | null = null;
    components: Map<string, IReactComponent> = new Map();
    currentComponent: IReactComponent | null = null;

    mount(component: IReactComponent, container: HTMLElement): void {
        console.log(this.components);
        this.rootDom = this.createDom({ vnode: component.vNode, parent: container, name: component.name });
        container.appendChild(this.rootDom);
        console.log(this.components);
    }

    update = update;
    createDom = createDom;
    setProps = setProps;
}
