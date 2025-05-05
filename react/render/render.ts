import React, { IS_DEVELOPMENT, ReactComponentInstance } from "..";

export async function renderMethod(element: ReactElement, container: HTMLElement) {
    const rootComponent = renderComponentMethod(element);
    React.vDomManager.components.set(rootComponent.name, rootComponent);
    React.vDomManager.currentComponent = rootComponent;

    React.vDomManager.rootDom = await React.vDomManager.mount({
        vNode: rootComponent.vNode!,
        parent: container,
        name: rootComponent.name,
    });

    if(IS_DEVELOPMENT) console.log("[ components ]", React.vDomManager.components);
    if(React.vDomManager.rootDom === null) return;
    container.appendChild(React.vDomManager.rootDom);
}

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
