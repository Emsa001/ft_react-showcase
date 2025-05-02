import React, { useSyncExternalStore } from "react";

let nextId = 0;
let todos = [{ id: nextId++, text: "Todo #1" }];
let listeners: any[] = [];

export const todosStore = {
    addTodo() {
        todos = [...todos, { id: nextId++, text: "Todo #" + nextId }];
        emitChange();
    },
    subscribe(listener: any) {
        listeners = [...listeners, listener];
        return () => {
            listeners = listeners.filter((l) => l !== listener);
        };
    },
    getSnapshot() {
        return todos;
    },
};

function emitChange() {
    for (let listener of listeners) {
        listener();
    }
}

export default function TodosApp() {
    const todos: { id: number; text: string }[] = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);

    return (
        <>
            <button onClick={() => todosStore.addTodo()}>Add todo</button>
            <hr />
            <ul>
                {todos.map((todo: any) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </>
    );
}
