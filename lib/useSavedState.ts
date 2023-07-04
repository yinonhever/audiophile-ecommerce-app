import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getCookie, setCookie } from "cookies-next";

const useSavedState = <T>(
  key: string,
  initialState: any
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const cookie = getCookie(key) as string;
    return cookie ? JSON.parse(cookie) : initialState;
  });
  useEffect(() => {
    setCookie(key, JSON.stringify(state));
  }, [state]);
  return [state, setState];
};

export default useSavedState;
