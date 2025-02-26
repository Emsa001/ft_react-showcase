import { ElementProps, IReactMount, IReactSetProps, IReactUpdate, ReactElement } from "../other/types";
import { clearArray, debounce } from "../other/utils";
import routes from "../../src/routes";
import { resetHooks, setHookIndex } from "../hooks";

export class ReactRender {
    container: HTMLElement;
    previousEl: ReactElement | null;

    components: { name: string; component: ReactElement, id:number }[];
    
    constructor() {
        this.container = document.body as HTMLElement;
        this.previousEl = null;
        this.components = [];
    }

    update(data: IReactUpdate): void {}
    mount(data: IReactMount): void {}
    setProps(data: IReactSetProps): void {}

    start(el: ReactElement): void {
        if (Array.isArray(el)) return el.forEach((child) => this.start(child));

        if (!this.previousEl) {
            console.log("Mounting...");
            clearArray(this.components);
            this.mount({ el, container: this.container, mode: "replace" });
            console.log(this.components);
        } else {
            console.log("Updating...");

            const previousDom = (this.previousEl as ReactElement).dom;
            if(!previousDom) return ;
            
            const previousChildren = previousDom.childNodes[0] as HTMLElement;

            el.dom = previousDom;

            this.update({ 
                prevElement: previousChildren,
                newReactElement: el.children[0],
                prevReactElement: (this.previousEl as ReactElement).children[0],
            });
        }
        
        this.previousEl = el;
    }

    cleanUp(): void {
        this.previousEl = null;
        this.components = [];
        this.container.innerHTML = "";
        resetHooks();
    }

    static matchRoute(path: string) {
        const pathParts = path.split("/").filter(Boolean);
    
        for (let route of routes) {
            const routeParts = route.path.split("/").filter(Boolean);
    
            const paramNames = routeParts
                .filter((e) => e.startsWith(":"))
                .map((e) => ({
                    name: e.replace("?", "").slice(1),
                    optional: e.endsWith("?"),
                }));
        
            if (pathParts.length > routeParts.length) continue;
    
            let params: Record<string, string | undefined> = {};
            let match = true;
    
            for (let i = 0; i < routeParts.length; i++) {
                const routeSegment = routeParts[i];
                const pathSegment = pathParts[i];
    
                if (routeSegment.startsWith(":")) {
                    const { name, optional } = paramNames.find(p => p.name === routeSegment.replace(":", "").replace("?", ""))!;
    
                    if (!pathSegment && !optional) {
                        match = false;
                        break;
                    }
    
                    params[name] = pathSegment || undefined;
                } else if (routeSegment !== pathSegment) {
                    match = false;
                    break;
                }
            }
    
            if (match)
                return { route, params };
        }
    
        return { route: routes.find((r) => r.path === "/404"), params: {} };
    }
    
    static getPage = async (): Promise<ReactElement | null> => {
        const { route, params } = ReactRender.matchRoute(window.location.pathname);
        if (!route) {
            console.error("Page not found");
            return null;
        }

        const pageModule = await route.module();
        const rootModule = await import("../../src/app/root");

        const pageComponent = pageModule.default as (data:ElementProps) => React.ReactNode;

        const root: ReactElement = rootModule.default({
            children: pageComponent({ params }),
        }) as unknown as ReactElement;

        return root;
    }

    static reRender = debounce(async (force:boolean = false) => {
        setHookIndex(0);
        
        const root = await ReactRender.getPage();
        if(!root) return;

        Render.start(root);
    }, 0);
}


if (module.hot) {
    module.hot.accept("../../src/routes", async () => {
        const newRoutesModule = await import("../../src/routes");
        routes.length = 0;
        routes.push(...newRoutesModule.default);

        ReactRender.reRender();
    });
}

window.addEventListener("popstate", async () => {
    resetHooks();
    ReactRender.reRender();
});

const Render = new ReactRender();
export default Render;
