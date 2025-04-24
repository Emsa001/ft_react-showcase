import { useUser } from "../../providers/user";
import { count } from "console";
import React from "react";

const ExtraTest = ({count}:{count:number}) => {

    const {user, setUser} = useUser();

    return (
        <div>
            <p>Count2: {count}</p>
            <p>User: {user}</p>
            <button onClick={() => setUser("beqa")}>Update User</button>
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