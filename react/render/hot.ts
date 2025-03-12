import { resetHooks } from "react/hooks";
import { ReactRender } from ".";
import routes from "../../src/routes";

if (module.hot) {
    module.hot.accept("../../src/routes", async () => {
        const newRoutesModule = await import("../../src/routes");
        routes.length = 0;
        routes.push(...newRoutesModule.default);

        ReactRender.reRender();
    });
}

window.addEventListener("popstate", async () => {
    resetHooks();
    ReactRender.reRender();
});
