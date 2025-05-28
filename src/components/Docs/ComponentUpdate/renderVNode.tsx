import React from "react";
import { CodeBlock } from "../../../components/Code";

export const renderVNode = (label: string, vNode: string) => (
    <div className="space-y-2">
        <p
            className="text-sm font-medium text-gray-400"
            dangerouslySetInnerHTML={{ __html: label }}
        />
        <CodeBlock code={JSON.stringify(JSON.parse(vNode), null, 2)} language="json" />
    </div>
);
