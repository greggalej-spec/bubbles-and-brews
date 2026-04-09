// Global gtag declaration for Google Analytics
// Calls are guarded with `typeof gtag !== "undefined"` at runtime.
declare function gtag(command: "event", eventName: string, params?: Record<string, unknown>): void;
declare function gtag(command: "config" | "js", targetId: string | Date, params?: Record<string, unknown>): void;
