import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(
    { _id: "",
  username: "", 
  password: "", 
  firstName: "", 
  lastName: "", 
  role: "USER" }
);
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (error : any) {
      setError(error.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input className="form-control" style={{width:'50%'}} value={user.username} onChange={(e) => setUser({
          ...user, username: e.target.value })} />
      <input className="form-control" style={{width:'50%'}} value={user.password} onChange={(e) => setUser({
          ...user, password: e.target.value })} />
      <button  className="btn wd-bluebutton form-control"  style={{width:'50%'}} onClick={signup}>
         Signup </button>
    </div>
  );
}

