export function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: number;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}