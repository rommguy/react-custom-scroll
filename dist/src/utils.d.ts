import { MouseEvent } from "react";
export declare const simpleDebounce: (func: () => void, delay: number) => {
    (): void;
    cancel: () => void;
};
export declare const ensureWithinLimits: (value: number, min: number, max: number) => number;
export interface ElementLayout {
    top: number;
    right: number;
    height: number;
    left: number;
    width?: number;
}
export declare const isEventPosOnLayout: (event: MouseEvent, layout: ElementLayout) => boolean;
export declare const isEventPosOnDomNode: (event: MouseEvent, domNode: HTMLElement) => boolean;
