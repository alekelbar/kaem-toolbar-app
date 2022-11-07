import { createContext } from "react";
import { sessionModelInterface } from "../models/sessionModel";

export const UserSessionContext = createContext<sessionModelInterface | null>(
  null
);
