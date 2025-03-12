import { IReactSetProps } from "../types";
import { ReactRender } from ".";

ReactRender.prototype.setProps = function ({ ref, key, value}: IReactSetProps): void {
    if (key === "children") return;

    if (key === "style" && typeof value === "object") {
        Object.assign(ref.style, value);
        return;
    }

    if (key === "ref") {
        value.current = ref;
        return;
    }

    if (key === "onChange" && ref instanceof HTMLInputElement) {
        ref.removeEventListener("input", (ref as any)._onChangeListener);
        ref.addEventListener("input", value);
        (ref as any)._onChangeListener = value;
        return;
    }

    if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.slice(2).toLowerCase();
        ref.removeEventListener(eventName, (ref as any)[key]);
        ref.addEventListener(eventName, value);
        (ref as any)[key];
    }

    (ref as any)[key] = value;
};
