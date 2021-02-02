import {useCallback, useEffect} from 'react';

export default function useShortcuts(callback) {
  const move = useCallback(
    evt => {
      switch (evt.key) {
        case 'ArrowDown':
        case 'j':
          callback(
            currentIndex => ((isNaN(currentIndex) ? -1 : currentIndex) + 1) % 7,
          );
          break;

        case 'ArrowUp':
        case 'k':
          callback(currentIndex => {
            const next = (isNaN(currentIndex) ? 7 : currentIndex) - 1;
            return (next < 0 ? 6 : next) % 7;
          });
          break;

        case '1':
          callback(0);
          break;

        case '2':
          callback(1);
          break;

        case '3':
          callback(2);
          break;

        case '4':
          callback(3);
          break;

        case '5':
          callback(4);
          break;

        case '6':
          callback(5);
          break;

        case '7':
          callback(6);
          break;

        case 'Escape':
          callback(null);
          break;
      }
    },
    [callback],
  );

  useEffect(() => {
    window.addEventListener('keydown', move);
    return () => window.removeEventListener('keydown', move);
  }, [move]);
}
