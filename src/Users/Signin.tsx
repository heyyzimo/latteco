import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./client";
import * as client from "./client";
export default function Signin() {
  const [credentials, setCredentials] = useState<User>({ _id: "",
    username: "", password: "", firstName: "", lastName: "", role: "USER"
  });
  const navigate = useNavigate();
  const signin = async () => {
    try{
        await client.signin(credentials);
        navigate("/Kanbas/Account/Profile");
    } catch (error : any) {
        if (error.response && error.response.status === 401) {
            // Here you handle a 401 error specifically
            console.log("Not a valid username / password");
        } else {
            // General error handling
            console.log(error.response ? error.response.data.message : "An unknown error occurred");
        }
    }
    
  };
  return (
    <div className="container h-100">

      <h1 >Signin</h1>
      <input className="form-control" style={{width:'50%'}} value={credentials.username} onChange={(e) =>
        setCredentials({ ...credentials, username: e.target.value })}/>
      <input className="form-control"  style={{width:'50%'}} value={credentials.password} onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })}/>
      <button className="btn wd-bluebutton form-control"  style={{width:'50%'}} onClick={signin}> Signin </button>
      <button className="btn wd-redbutton form-control"  style={{width:'50%'}} onClick={() => navigate(`/Kanbas/Account/Signup`)}> Signup </button>
      </div>

  );
}
