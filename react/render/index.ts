import { resetHooks } from "../hooks";
import { IReactMount, IReactSetProps, IReactUpdate, ReactElement } from "../types";
import { clearArray, debounce } from "../utils";
import routes from "../../src/routes";

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
        resetHooks();

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

const Render = new ReactRender();
export default Render;