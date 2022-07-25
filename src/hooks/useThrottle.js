import { useState } from 'react';

const useThrottle = (callback, timeout) => {
    const [ isReady, setIsReady ] = useState(true);
    const throttledAction = () => {
        if (isReady) {
            callback();
            setIsReady(false);
            setTimeout(()=>{
                setIsReady(true);
            }, timeout)
        }
    }
    return throttledAction;
    
}

export default useThrottle;

// Function expressions in JavaScript are not hoisted, unlike function declarations. 
// You can't use function expressions before you create them. 