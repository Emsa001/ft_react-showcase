import { Context } from "vm";
import React from "..";

export function useContextHook(context: Context) {
    context.subscriptions.add(React.vDomManager.currentComponent!);

    return context._currentValue;
}
