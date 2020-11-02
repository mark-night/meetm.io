import { useRef, useEffect } from 'react';

export const usePrevious = (initialValue, value) => {
  /**
   * Custom hook to return value as it was before last render.
   * Key concepts:
   *    - useRef() creates a ref object which keeps unchanged (unless explicitly
   *      updated) throughout function component renders, like a instance variable
   *      to class component.
   *    - useEffect() is executed ONLY after component is rendered
   *
   * Official document
   * https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
   * Good explanation
   * https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
   */
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const useLastNonEmptyArr = (initialValue, value) => {
  const ref = useRef(initialValue);
  useEffect(() => {
    if (value.length > 0) {
      ref.current = value;
    }
  });
  return ref.current;
};
