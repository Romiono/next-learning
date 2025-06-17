'use client';

import { useEffect, useRef } from 'react';

export function useDebounce<F extends (...args: any[]) => any>(
    fn: F,
    delay: number = 300,

): (...args: Parameters<F>) => void {
    let ref = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
        return () => {
            if(ref.current) {
                clearTimeout(ref.current);
            }
        }
    })

    return (...args: Parameters<F>) => {
        if(ref.current) {
            clearTimeout(ref.current)
        }

        ref.current = setTimeout(() => {
            ref.current = null
            fn(...args);
        }, delay);
    }

}