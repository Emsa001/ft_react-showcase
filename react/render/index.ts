import {
    IReactMount,
    IReactSetProps,
    IReactUpdate,
    ReactComponentTree,
    ReactElement,
} from "../types";
import { debounce } from "../other/utils";
import { getPage } from "react/routes/page";
// import "./hot"

export class ReactRender {
    components: Map<string, ReactComponentTree>;
    lastComponent: ReactComponentTree | null;

    container: HTMLElement;
    mounted: boolean;

    constructor() {
        this.container = document.body as HTMLElement;
        this.mounted = false;
        this.components = new Map();
        this.lastComponent = null;
    }

    update(data: IReactUpdate): void {}
    updateLoop(
        previous: ReactElement,
        current: ReactElement,
        ref: HTMLElement,
        index:number = 0
    ): void {}

    mount(data: IReactMount): void {}
    mountArray(data: IReactMount): void {}
    isMounted(): boolean {
        return this.mounted;
    }

    setProps(data: IReactSetProps): void {}

    addComponent(name: string, component: ReactComponentTree): void {
        this.components.set(name, component);
        this.lastComponent = component;
    }

    getComponent(name: string): ReactComponentTree | null {
        return this.components.get(name) || null;
    }

    getLastComponent(): ReactComponentTree | null {
        return this.lastComponent;
    }

    printComponents(): void {
        console.log("============[ Components ]============");
        this.components.forEach((component, name) => console.log(`${name}:`, component));
        console.log("======================================");
    }

    static reRender = debounce(async (component: ReactComponentTree | null) => {
        // Render.printComponents();

        if (!Render.isMounted()) {
            const root = await getPage();
            if (!root) return ;

            root.state.hookIndex = 0;
            Render.mount({ component: root, instance: root.instance });
            Render.mounted = true;
        } else {
            if (!component) {
                return console.error("Component not found");
            }

            component.state.hookIndex = 0;
            Render.addComponent(component.name, component);
            Render.update({
                component: component,
            });
        }
    }, 0);
}

const Render = new ReactRender();
export default Render;
