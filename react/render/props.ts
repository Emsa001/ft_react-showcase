import { IReactSetProps } from "../types";
import { ReactRender } from ".";

ReactRender.prototype.setProps = function ({ dom, el, prop }: IReactSetProps) {
    if (prop === "children") return;

    if (prop === "style" && typeof el.props[prop] === "object") {
        Object.assign(dom.style, el.props[prop]);
        return;
    }

    if (prop === "ref") {
        el.props[prop].current = dom;
        return;
    }

    if (prop === "onChange" && dom instanceof HTMLInputElement) {
        dom.removeEventListener("input", (dom as any)._onChangeListener);
        dom.addEventListener("input", el.props[prop]);
        (dom as any)._onChangeListener = el.props[prop];
        return;
    }

    if (prop.startsWith("on") && typeof el.props[prop] === "function") {
        const eventName = prop.slice(2).toLowerCase();
        dom.removeEventListener(eventName, (dom as any)[prop]);
        dom.addEventListener(eventName, el.props[prop]);
        (dom as any)[prop];
    }

    (dom as any)[prop] = el.props[prop];
};
