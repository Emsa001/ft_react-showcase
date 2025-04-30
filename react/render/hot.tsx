import React from ".."; // assumes you're importing from `react/index.ts`

const container = document.getElementById("root")!;

let rendered = false;
async function renderApp() {
    const { default: Root } = await import("../../src/app/root");

    container.innerHTML = ""; // Clear the container before rendering

    React.vDomManager.components.clear();
    const root = React.createElement(Root);
    React.render(root, container);
    rendered = true;
}

renderApp();

if (import.meta.webpackHot) {
    import.meta.webpackHot.accept("../../src/app/root", async () => {
        console.log("[HMR] Reloading App module...");
        await renderApp();
    });
}
