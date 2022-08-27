import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

export default function Profile() {
  const { user, isAuthenticated, checkAuth } = useUser();
  console.log("user profile", user);
  return isAuthenticated ? (
    <div>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>
  ) : (
    <>
      <Button onClick={checkAuth}>checkAuth</Button>
      <h1>you are not Authenticated</h1>
    </>
  );
}
