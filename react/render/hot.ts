import React from "..";

const container = document.getElementById("root")!;

async function renderApp() {
    const { default: Root } = await import("../../src/app/root");

    container.innerHTML = "";

    React.vDomManager.components.clear();
    const root = React.createElement(Root);
    React.render(root, container);
    if(React.vDomManager.isFirstRender)
        React.vDomManager.isFirstRender = false;
}

renderApp();

if (import.meta.webpackHot) {
    import.meta.webpackHot.accept("../../src/app/root", async () => {
        console.log("[HMR] Reloading App module...");
        await renderApp();
    });
}

// listen for popstate event
window.addEventListener("popstate", async () => {
    console.log("[HMR] Reloading App module...");
    await renderApp();
});