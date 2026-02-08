import { useEffect } from 'react';

/**
 * A custom hook to lock background scroll when a modal or drawer is open.
 * Standardizes the scroll lock behavior across the application.
 */
export function useBodyScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (!isLocked) return;

        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        // Calculate scrollbar width to prevent layout shift
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isLocked]);
}
