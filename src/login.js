import React, {useState} from "react";
import Axios from "axios";
import {Navigate,useHistory,useNavigate} from "react-router-dom";
import Certificate from './certificate';
import './login.css';
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useForm } from "react-hook-form";

// const schema = yup.object().shape({
//   email: yup.string().email("Enter a valid email ID").required("Email ID is required"),  
//   password: yup.string().required("Password is required").min(8,"Your password must have atleast 8 characters").max(15, "Your password must not exceed 15 characters" ),  
// });

function Login() {

  // const { register, handleSubmit, formState:{errors}  } = useForm({
  //   resolver: yupResolver(schema),
   
  // });
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [flag, setflag]=useState([]);
const [id ,setid] = useState(0);

const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/login",{email : email}).then((response => {
      console.log("r:",response);
      setflag(response.statusText);
      console.log("response:",response.data['msg']);
      setid(response.data['msg']);
    }));
    
    
  };
const navigate = useNavigate();
const func = () =>{
  if(id > 0){
  navigate('/certificate',{state:{mail:email}});
  }
  
}

return (

  <div class="login-wrapper">
  <form>
    <h2>Login</h2>
    <div class="input-group">
      <input type="text" name="loginUser" id="loginUser" onChange={(e => {setEmail(e.target.value)})} 
        />
       {/* <p> {errors.email?.message} </p> */}
      <label for="loginUser">User Mail</label>
    </div>
    <div class="input-group">
      <input
        type="password"
        name="loginPassword"
        id="loginPassword"
        onChange={(e => {setPassword(e.target.value)})}
       
      />
      {/* <p> {errors.password?.message} </p> */}
      <label for="loginPassword">Password</label>
    </div>

    <div class="submit-btn">
      <button onClick={login}>Login</button>
    </div>
  </form>
  
  {(flag === "OK") ? func() : null}
</div>
    

);
};

export default Login;

//  <div className="login">
//         <h1>Login</h1>
//         <lable>Username</lable>
//         <input type="text" onChange={(e => {setUsername(e.target.value)})}/>
//         <lable>Password</lable>
//         <input type="text" onChange={(e => {setPassword(e.target.value)})}/>
//         <button onClick={login}>Login</button>
//         {(flag === "OK") ? func() : null}
//         {/* <Navigate to="/certificate/${username}" /> */}
        
//       </div> 