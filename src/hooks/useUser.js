import { useEffect, useState } from "react";
import { BASE_URL } from "../constant/constants";
/**
 *
 * @returns [user, isAuthenticated, checkAuth]
 */
export default function useUser() {
  // const [user, setUser] = useState(undefined);
  // const [isAuthenticated, setIsAutenticated] = useState(false);
  // const [toggleCheck, setToggleCheck] = useState(false);
  const [auth, setAuth] = useState({
    user: undefined,
    isAuthenticated: false,
  });
  const [toggleCheck, setToggleCheck] = useState(false);
  function checkAuth() {
    setToggleCheck(!toggleCheck);
  }
  useEffect(() => {
    fetch(`${BASE_URL}/checkAuth`, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("else setAuth");
          setAuth({ ...auth, isAuthenticated: false });
          // setUser(user);
          // setIsAutenticated(false);
        }
      })
      .then((res) => {
        if (!res.error) {
          console.log("if then two");
          setAuth({ ...auth, user: res, isAuthenticated: true });
          // setUser(res);
          // setIsAutenticated(true);
        } else {
          console.log("else then two");
          setAuth({ ...auth, user: undefined, isAuthenticated: false });
          // setUser(undefined);
          // setIsAutenticated(false);
        }
      });
  }, [toggleCheck]);
  return [auth.user, auth.isAuthenticated, checkAuth];
}
