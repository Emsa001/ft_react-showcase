import { resetHooks } from "react/hooks";
import { ReactRender } from ".";

/*

TODO: Implement hot update for developer mode
(is not important for production)

*/

// import routes from "../../src/routes";

// if (module.hot) {
//     module.hot.accept(async () => {
//         const newRoutesModule = await import("../../src/routes");
//         routes.length = 0;
//         routes.push(...newRoutesModule.default);

//         console.log("hot update", newRoutesModule);
//         // ReactRender.reRender(newRoutesModule);
//     });
// }

// window.addEventListener("popstate", async () => {
//     resetHooks();
//     // ReactRender.reRender();
//     console.log("popstate");
// });
