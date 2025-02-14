import { IReactMount, IReactSetProps, IReactUpdate, ReactElement } from "../other/types";
import { clearArray, debounce } from "../other/utils";
import routes from "../../src/routes";
import { setHookIndex } from "../hooks";

export class ReactRender {
    container: HTMLElement;
    previousEl: ReactElement | null;
    components: { name: string; component: ReactElement }[];

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
            clearArray(this.components);
            console.log("Mounting...");
            this.mount({ el, container: this.container, mode: "replace" });
        } else {
            console.log("Updating...");
            this.update({ newEl: el, previous: this.previousEl });
        }

        this.previousEl = el;
    }

    static reRender = debounce(async () => {
        setHookIndex(0);
        const page =
            routes.find((route) => route.path === window.location.pathname) ||
            routes.find((route) => route.path === "404");
        if (!page) return console.error("Page not found");

        const pageModule = await page.module();
        const rootModule = await import("../../src/app/root");

        const root: ReactElement = rootModule.default({
            children: pageModule.default(),
        }) as unknown as ReactElement;

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

const Render = new ReactRender();
export default Render;