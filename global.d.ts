declare var module: {
    hot?: {
        accept(path?: string, callback?: () => void): void;
        dispose(callback: () => void): void;
    };
};
