import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constant/constants";
import { Context } from "../context/UserContext";

export default function useUser() {
  const context = useContext(Context);
  console.log("context", context);
  const { setUser, logout } = context;
  const [toggleCheck, setToggleCheck] = useState(false);
  const [auth, setAuth] = useState({});
  function checkAuth() {
    setToggleCheck(!toggleCheck);
  }
  useEffect(() => {
    // fetch(`${BASE_URL}/checkAuth`, { credentials: "include" })
    //   .then((res) => {
    //     if (res.ok) {
    //       return res.json();
    //     } else {
    //       console.log("else setAuth");
    //       logout();
    //       // setUser(user);
    //       // setAuth({ ...auth, isAuthenticated: false });
    //       // setIsAutenticated(false);
    //     }
    //   })
    //   .then((res) => {
    //     if (!res.error) {
    //       console.log("if then two");
    //       setUser(res.user);
    //       // setAuth({ ...auth, user: res, isAuthenticated: true });
    //       // setUser(res);
    //       // setIsAutenticated(true);
    //     } else {
    //       // console.log("else then two");
    //       logout();
    //       // setAuth({ ...auth, user: undefined, isAuthenticated: false });
    //       // setUser(undefined);
    //       // setIsAutenticated(false);
    //     }
    //   });
  }, [toggleCheck]);

  return { ...context, checkAuth };
}
