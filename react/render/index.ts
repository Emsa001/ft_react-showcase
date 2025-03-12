import { IReactMount, IReactSetProps, IReactUpdate, ReactComponentTree } from "../types";
import { clearArray, debounce } from "../other/utils";
import { setHookIndex } from "../hooks";
import { getPage } from "react/routes/page";

export class ReactComponentTrees{
    components: ReactComponentTree[];
    constructor(){
        this.components = [];
    }
}

const components = new ReactComponentTrees();

export class ReactRender {
    container: HTMLElement;
    tree: ReactComponentTree[];    
    
    constructor() {
        this.container = document.body as HTMLElement;
        this.tree = [];
    }

    update(data: IReactUpdate): void {}
    
    mount(data: IReactMount): void {}
    mountArray(data: IReactMount): void {}

    setProps(data: IReactSetProps): void {}

    start(component: ReactComponentTree): void {
        // if (Array.isArray(el)) return el.forEach((child) => this.start(child));

        // console.log("Mounting...", component);
        this.mount({ component });
    }

    static reRender = debounce(async () => {
        setHookIndex(0);
        
        const root = await getPage();
        if(!root) return;

        Render.start(root);
    }, 0);
}

const Render = new ReactRender();
export default Render;
