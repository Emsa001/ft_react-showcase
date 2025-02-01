import React, { useEffect } from "react";
import { useTest } from "../../context/testContext";

export default function TestPage2() {
    return (
        <div className="flex justify-center items-center h-screen">
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700">I'm a button!</button>
        </div>
    );
}
