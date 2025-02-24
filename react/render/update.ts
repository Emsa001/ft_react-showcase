import { IReactSetProps, IReactUpdate, ReactElement } from "../other/types";
import { flattenChildren } from "../other/utils";
import { ReactRender } from ".";

/*

    TODO: Reimplement the update method, there are some bugs while using developer mode and hot reload

*/

ReactRender.prototype.update = function ({
    newEl,
    previous,
}: IReactUpdate): void {
    const newDom = document.createElement("div");
    const previousDom = (previous as ReactElement).dom;
    this.mount({ el: newEl, container: newDom });

    if (!previousDom) return;

    const newChildren = newDom.children[0].childNodes;
    const previousChildren = previousDom.childNodes;

    const updateProps = ({ dom, el, prop }: IReactSetProps) => {
        this.setProps({ dom, el, prop });
    };

    let setComponent = (name:string, el:{ name: string; component: ReactElement, id:number }) => {
        const component = this.components.find((e) => e.name == name)?.component;
        if(component) {
            let index = this.components.findIndex((e) => e.name == name);
            this.components[index] = el;
        }
        console.log(this.components);
    }

    const getComponents = () => this.components;

    function updateChild(
        newChild: NodeListOf<ChildNode>,
        prevChild: NodeListOf<ChildNode>,
        parent: HTMLElement,
        newEl: ReactElement | ReactElement[],
        prevEl: ReactElement | ReactElement[],
        component?: {name:string, component:ReactElement, id:number}
    ) {
        const max = Math.max(newChild.length, prevChild.length);
        
        if(Array.isArray(newEl) || Array.isArray(prevEl)) {
            return ;
        }


        for (let i = 0; i < max; i++) {
            const newChildNode = newChild[i];
            const prevChildNode = prevChild[i];
    
            if(!newEl || !prevEl) return;
            
            newEl = newEl as ReactElement;
            prevEl = prevEl as ReactElement;
            newEl.dom = prevEl.dom;

            let newReactElement = newEl.children[i];
            let prevReactElement = prevEl.children[i];
            
            // Removed child
            if (!newChildNode) {
                prevChildNode.remove();
                return console.log("Remove Element", prevChildNode);
            }

            // New child
            if (!prevChildNode) {
                if(i == 0)
                    parent.appendChild(newChildNode);
                else
                    prevChild[i - 1].after(newChildNode);
                return console.log("New Element", newChildNode);
            }

            // Components
            if(typeof newEl.tag === "function" && typeof prevEl.tag === "function") {
                component = getComponents().find((e) => e.name == ((newEl as ReactElement).tag as any).name);

                const prev = prevEl.tag({
                    ...prevEl.props,
                });
                const current = component!.component;
                
                if(!current || !prev) return console.error("Component is not defined");
                
                newReactElement = current.children[i];
                prevReactElement = prev.children[i];
                
            }

            // Different tag
            if(newReactElement && (newReactElement.tag != prevReactElement.tag)) {
                prevChildNode.replaceWith(newChildNode);
                return console.log("Replace Element", newChildNode);
            } 

            // Different props
            if (newReactElement && (newReactElement.props != null && newReactElement.props != prevReactElement.props)) {
                Object.keys(newReactElement.props).forEach((prop) => {
                    updateProps({
                        dom: prevChildNode as HTMLElement,
                        el: newReactElement,
                        prop,
                    });
                    prevReactElement.props = newReactElement.props;
                });
            }

            if(typeof newReactElement === "string" || typeof newReactElement === "number") {
                if (newReactElement != prevReactElement) {
                    prevChildNode.textContent = newReactElement as string;
                }
            }

            if (newChildNode.hasChildNodes() || prevChildNode.hasChildNodes()) {
                updateChild(
                    newChildNode.childNodes,
                    prevChildNode.childNodes,
                    prevChildNode as HTMLElement,
                    newReactElement,
                    prevReactElement,
                    component
                );
            }
        }
    }

    updateChild(newChildren, previousChildren, newDom, newEl, previous);
};
