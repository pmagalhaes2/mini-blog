import { useContext, createContext, ReactNode } from "react";

export const AuthContext = createContext({} as any);

type AuthProviderProps = {
  children: ReactNode;
  value?: any;
};

export const AuthProvider = ({ children, value }: AuthProviderProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthValue() {
  return useContext(AuthContext);
}
