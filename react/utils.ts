export function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: number;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function clearArray<T>(array: T[]) {
    while (array.length > 0) {
        array.pop();
    }
}
