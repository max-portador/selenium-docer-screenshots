import { MutableRefObject, useCallback, useRef } from 'react';

export const useDebounce = (callback: Function, delay: number = 300) => {
    const timer = useRef(null) as MutableRefObject<ReturnType<typeof setTimeout> | null>;

    const debouncedCallback = useCallback(
        (...args: any) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }

            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );

    return debouncedCallback;
};
