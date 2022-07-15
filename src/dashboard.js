import React, {useState,useEffect} from "react";
import Axios from "axios";
import {Navigate} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import "./App.css";
import Logout from "./logout";
import Search from "./search";

function Dashboard() {

const [certlist, setcertlist] = useState([]);
const location = useLocation();
var mail = String(location.state.mail);

console.log("mails:",mail); 
console.log("tye : ",typeof(mail));

// useEffect(()=>{
//   Axios.post("http://localhost:5000/getdisplay",{mail : mail}).then((Response)=>{
//       console.log("Res",Response); 
//   },);
// },[]);

const display = () => {
  console.log("person mail : ",mail);
    Axios.post("http://localhost:5000/display",{email : mail}).then((response => {
      console.log(response.data.recordset);
      setcertlist(response.data.recordset);
    }));
    
    
  };
const deleteEmp = (id) => {
    Axios.post(`http://localhost:5000/delete/${id}`).then((response) => {
        setcertlist(certlist.filter(val => val.certid !== id
        ))
});
Axios.post('https://prod-12.centralus.logic.azure.com:443/workflows/72f55cf64be04fe6870281476b70d62a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7p1Ht0_4xLmzFoLaonCAZ0qd6L5ziGTykLuFoYZdD7o',{email : mail}).then((response => {
    console.log(response);
  }));
};

return (
<div className="dashboard">
        <Search placeholder="Enter a cert name" data={certlist}/>

        <button onClick={display}>View Certificates</button>

        {certlist.map((val,key)=>{
            return (
                <div>
                  <table>
                    
                    <h3><th>Certificate Name :  <td>{val.certname}</td></th></h3>
                    <h3><th>Ceritification ID : </th> <td>{val.certid}</td></h3>
                    <h3><th>Ceritification Mail:</th> <td>{val.email}</td></h3>
                    
                    <button onClick = {() => {deleteEmp(val.certid)}}>Delete</button>
                    </table>
                    
                    </div>
            )
        })}
        <Logout />
        </div>
)
}

export default Dashboard;