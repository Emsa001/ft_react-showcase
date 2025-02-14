
// TODO: Fix Navigation rendering
export function Navigate({ to }: { to: string }) {
    window.history.pushState({}, "", to);
    window.dispatchEvent(new Event("popstate"));

    return null;
}

export function useNavigate() {
    return (to: string) => {
        window.history.pushState({}, "", to);
        window.dispatchEvent(new Event("popstate"));
    };
}