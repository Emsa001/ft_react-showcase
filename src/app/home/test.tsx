import { count } from "console";
import React from "react";

const ExtraTest = ({count}:{count:number}) => {
    return (
        <div>
            Count2: {count}
        </div>
    )
}

export const Test = ({count}:{count:number}) => {
    return (
        <div>
            Count: {count}
            <ExtraTest count={count * 2} />
        </div>
    )
}