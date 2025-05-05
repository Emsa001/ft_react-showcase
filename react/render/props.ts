export function setProps({ ref, key, value }: { ref: Element; key: string; value: any }): void {
    if (key === "children") return;

    if (key === "style" && typeof value === "object") {
        Object.assign((ref as HTMLElement).style, value);
        return;
    }

    if (key === "ref") {
        value.current = ref;
        return;
    }

    // TODO: Optimize event listeners by making only one for parent element in case of arrays

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
        (ref as any)[key] = value;
        return;
    }

    if(key === "className"){
        ref.setAttribute("class", value);
        return;
    }

    // TODO: do we need both?
    ref.setAttribute(key, value);
    (ref as any)[key] = value;
}

export function removeProp({ ref, key }: { ref: Element; key: string }): void {
    if (key === "style") {
        ref.removeAttribute("style");
        return;
    }

    if (key.startsWith("on") && typeof (ref as any)[key] === "function") {
        const eventName = key.slice(2).toLowerCase();
        ref.removeEventListener(eventName, (ref as any)[key]);
        delete (ref as any)[key];
        return;
    }

    if (key === "children") return;
    if(key === "className"){
        ref.removeAttribute("class");
        return;
    }

    delete (ref as any)[key];
}