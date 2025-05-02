import { ReactComponentInstance } from "react/types/types";
import React from "..";

export function renderComponentMethod(element: ReactElement): ReactComponentInstance {
    const component = React.createComponentInstance(element);
    React.vDomManager.currentComponent = component;

    if (!React.isValidElement(element)) {
        throw new Error("Invalid element type");
    }

    if (typeof element.type === "string") {
        component.vNode = React.createElement(element.type, element.props, ...element.children);
        return component;
    }

    component.vNode = element.type(element.props, ...element.children);
    return component;
}
