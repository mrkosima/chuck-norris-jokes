import React, {
  createContext,
  FC,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";

import { Loader } from "../common/Loader";

const Login = lazy(() => import(/* webpackChunkName: "login" */ "./Login"));

export interface AuthContextType {
  authorized: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  authorized: false,
  login: () => {},
  logout: () => {}
});

const USER_STORAGE_KEY = "current-user";

const useUserAuth = (storageKey: string) => {
  const [authoriezed, setAuthorized] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    if (!ready) {
      const currentUser = localStorage.getItem(storageKey);
      setReady(true);
      setAuthorized(!!currentUser);
    }
  }, [ready, storageKey]);

  const login = useCallback(
    (email: string) => {
      localStorage.setItem(storageKey, email);
      setAuthorized(true);
    },
    [storageKey]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(storageKey);
    setAuthorized(false);
  }, [storageKey]);

  return {
    ready,
    authoriezed,
    login,
    logout
  };
};

export const AuthProvider: FC<{}> = ({ children }) => {
  const { ready, authoriezed, login, logout } = useUserAuth(USER_STORAGE_KEY);

  const value = useMemo<AuthContextType>(
    () => ({
      authorized: authoriezed,
      login: login,
      logout: logout
    }),
    [authoriezed, login, logout]
  );

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={value}>
      {authoriezed ? (
        <>{children}</>
      ) : (
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      )}
    </AuthContext.Provider>
  );
};
