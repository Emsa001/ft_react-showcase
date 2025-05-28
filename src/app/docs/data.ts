import { FiHome, FiBox, FiZap, FiRefreshCw, FiSettings } from "react-icons/fi";

import { NavItemProps } from "../../components/SideBar";

export const sideBarItems: NavItemProps[] = [
    { label: "Introduction", link: "/docs", icon: FiHome },

    // Foundation
    {
        label: "Component Structure",
        link: "/docs/component-structure",
        icon: FiBox,
    },
    { label: "", hr: true },
    {
        label: "Component Mount",
        link: "/docs/component-mount",
        icon: FiZap,
    },
    {
        label: "Component Update",
        link: "/docs/component-update",
        icon: FiRefreshCw,
        childs: [
            { label: "Explanation", link: "/explanation" },
            { label: "Implementation", link: "/implementation" },
        ],
    },

    // React-like features
    {
        label: "Hooks",
        link: "/docs/hooks",
        icon: FiSettings,
        childs: [
            { label: "useContext", link: "/use-context" },
            { label: "useEffect", link: "/use-effect" },
            { label: "useLocalStorage", link: "/use-local-storage" },
            { label: "useNavigate", link: "/use-navigate" },
            { label: "useRef", link: "/use-ref" },
            { label: "useState", link: "/use-state" },
            { label: "useStatic", link: "/use-static" },
            {
                label: "useSyncExternalStore",
                link: "/use-sync-external-store",
            },
        ],
    },
    { label: "", hr: true },
];
