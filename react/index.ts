import { resetHooks } from './hooks';
import React from './react';
import { ReactRender } from './render';

import "./render/mount";
import "./render/props";
import "./render/update";

export * from './react';
export * from './render';
export * from './types';
export * from "./routes/component";

export default React;

ReactRender.reRender(null);

declare const module: any;

// if (module.hot) {
//     module.hot.accept((err: any) => {
//         if (err) {
//             console.error("[HMR] Accept failed:", err);
//             return;
//         }

//         const updatedModules = module.hot.data?.updatedModules || [];

//         updatedModules.forEach((mod: string) => {
//             if (mod.includes("/src/")) {
//                 console.log(`[HMR] Hot reloading ${mod}`);
//             }
//         });
//     });

//     module.hot.dispose((data: any) => {
//         // Collect info about what was updated
//         if (module.hot.data) {
//             module.hot.data.updatedModules = module.children.map((c: any) => c.id);
//         }

//         // Optional: Clean up effects, reset hooks
//         resetHooks?.();
//     });
// }

window.addEventListener("popstate", async () => {
    resetHooks();
    console.log("popstate event triggered.");
    // ReactRender.reRender();
});