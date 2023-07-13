import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getCookie, setCookie } from "cookies-next";

export default function useSavedState<T>(
  key: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const cookie = getCookie(key) as string;
    return cookie ? JSON.parse(cookie) : initialState;
  });
  useEffect(() => {
    setCookie(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
}
