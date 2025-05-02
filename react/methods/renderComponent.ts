import { ReactComponentInstance } from "react/types/types";
import React from "..";

export function renderComponentMethod(element: ReactElement): ReactComponentInstance {
    const component = React.createComponentInstance(element);
    React.vDomManager.currentComponent = component;

    if (!React.isValidElement(element)) {
        // this.vDomManager.currentComponent = null;
        throw new Error("Invalid element type");
    }

    if (typeof element.type === "string") {
        component.vNode = React.createElement(element.type, element.props, ...element.children);
        // this.vDomManager.currentComponent = null;
        return component;
    }

    component.vNode = element.type(element.props, ...element.children);

    // this.vDomManager.currentComponent = null;
    return component;
}
