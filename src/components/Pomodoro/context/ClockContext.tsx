import { createContext } from "react";

export type ClockContextType = {
  work: number,
  rest: number,
  onWork: (num: number) => void,
  onRest: (num: number) => void,
  reset: () => void,
}

export const ClockContext = createContext<ClockContextType | null>(null);