import React from ".."; // assumes you're importing from `react/index.ts`

const container = document.getElementById("root")!;

async function renderApp() {
    const { default: Root } = await import("../../src/app/root");

    container.innerHTML = ""; // Clear the container before rendering

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


// setInterval(() => {
//     console.log(React.vDomManager.components)
// }, 1000)