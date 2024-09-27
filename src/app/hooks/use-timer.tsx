import { useState, useEffect, useCallback } from 'react';

const useTimer = (isActive: boolean): [number, () => void] => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 0.1;
          return Math.round(newTime * 10) / 10; 
        });
      }, 100); 
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval); 
  }, [isActive, time]);

  const resetTimer = useCallback(() => {
    setTime(0);
  }, []);

  return [time, resetTimer];
};

export default useTimer;
