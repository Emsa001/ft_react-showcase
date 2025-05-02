import React from "..";

export async function renderMethod(element: ReactElement, container: HTMLElement) {
    const rootComponent = React.renderComponent(element);
    React.vDomManager.components.set(rootComponent.name, rootComponent);
    React.vDomManager.currentComponent = rootComponent;

    React.vDomManager.rootDom = await React.vDomManager.mount({
        vnode: rootComponent.vNode!,
        parent: container,
        name: rootComponent.name,
    });

    console.log(React.vDomManager.components);
    if(React.vDomManager.rootDom === null) return;
    container.appendChild(React.vDomManager.rootDom);
}
