import { useEffect, useState } from 'react';

export const useVisibleTimeout = (duration: number) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), duration);

    return () => clearTimeout(timeout);
  }, [duration]);

  return visible;
};
