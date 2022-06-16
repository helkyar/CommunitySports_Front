import { useCallback, useContext } from "react";
import UserContextProvider from "contexts/user";
import startSession from "helpers/session/session";
import { useNavigate } from "react-router-dom";

export const useSession = () => {
  const navigate = useNavigate();
  const { jwt, setJWT, user, setUser } = useContext(UserContextProvider);
  let logfail = false;
  const loger = useCallback(
    ({ email, password }) => {
      startSession({ email, password }, "login")
        .then(({ token, email, id }) => {
          console.log(token, email, id)
          window.sessionStorage.setItem("jwt", token);
          window.sessionStorage.setItem("user", `{"id":"${id}", "email":"${email}"}`);
          setJWT(token);
          setUser({ id, email });
        })
        .catch((err) => {
          logfail = true;
          window.sessionStorage.removeItem("jwt");
          window.sessionStorage.removeItem("user");
          console.error(err);
        });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    window.sessionStorage.removeItem("jwt");
    window.sessionStorage.removeItem("user");
    setJWT(null);
    setUser(null);
    navigate("/login");
  }, [setJWT]);

  return { user, logout, loger, isLogged: Boolean(jwt), logfail };
};
