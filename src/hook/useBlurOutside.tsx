import { useEffect, useRef } from 'react';

export const useBlurOutside = (cb: any) => {
  const ref = useRef();

  useEffect(() => {
    const handleBlur = (event: Event) => {
      const target = event.target;

      const isInside = ref.current.contains(target);

      if (!isInside) {
        cb(event);
      }
    };

    document.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('blur', handleBlur);
    };
  }, []);

  return ref;
};
