import React from "react";
import { CodeBlock } from "../../../components/Code";
import { Divider } from "../../../components/Divider";

export const DocsTech = () => {
    const techList = [
        {
            name: "TypeScript",
            href: "https://www.typescriptlang.org/",
            desc: "Used across the whole project.",
        },
        {
            name: "Webpack 5",
            href: "https://webpack.js.org/",
            desc: "Handles bundling, HMR, and assets via DefinePlugin, HtmlWebpackPlugin, etc.",
        },
        {
            name: "PostCSS",
            href: "https://postcss.org/",
            desc: "Used with postcss-preset-env for modern CSS.",
        },
        {
            name: "Babel",
            href: "https://babeljs.io/",
            desc: "Compiles JSX into createElement calls consumed by ft_react.",
        }
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
            <div className="grid sm:grid-cols-2 gap-4">
                {techList.map((item, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 rounded-xl p-4 border border-gray-700 text-gray-300"
                    >
                        <h3 className="font-semibold">
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:underline"
                            >
                                {item.name}
                            </a>
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                    </div>
                ))}
            </div>

            <Divider />

            <div className="mt-4">
                <h2 className="text-2xl font-semibold mb-2">File Structure</h2>
                <CodeBlock
                    language="none"
                    code={`🗂️ react
├── 📁 hooks
│   ├── useContext.ts
│   ├── useEffect.ts
│   ├── useLocalStorage.ts
│   ├── useNavigate.ts
│   ├── useRef.ts
│   ├── useState.ts
│   ├── useStatic.ts
│   └── useSyncExternalStore.ts
├── 📁 methods
│   ├── BrowserRouter.tsx
│   ├── cloneElement.ts
│   ├── createComponentInstance.ts
│   ├── createContext.ts
│   ├── createElement.ts
│   └── isValidElement.ts
├── 📁 render
│   ├── hot.ts
│   ├── mount.ts
│   ├── props.ts
│   ├── render.ts
│   ├── update.ts
│   ├── updateSchedule.ts
│   └── utils.ts
├── 📁 types
│   ├── domAttributes.ts
│   ├── global.d.ts
│   └── index.ts
└── index.ts`}
                />
            </div>
        </section>
    );
};
