import { useEffect, useCallback, useRef } from 'react';
const useTimeout =  (callback, timeout) => {
    const timeoutIdRef = useRef();
    const cancel = useCallback(
        () => {
            const timeoutId = timeoutIdRef.current;
            if (timeoutId) {
                timeoutIdRef.current = undefined;
                clearTimeout(timeoutId);
            }
        },
        [timeoutIdRef],
    );

    useEffect(
        () => {
            timeoutIdRef.current = setTimeout(callback, timeout);
        },
        [callback, timeout, cancel],
    );

    return cancel;
}
export default useTimeout