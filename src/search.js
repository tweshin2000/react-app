import React, {useState} from "react";
import Axios from "axios";
import {Navigate,useHistory,useNavigate} from "react-router-dom";
import "./search.css";
// import SearchIcon from "@material-ui/icons/Search";

function Search({placeholder, data}){
    const [filterdata, setfilterdata] = useState([]);
    // const [display, setdisplay] = usestate([]);
    const handleFilter = (event) => {
        const searchword = event.target.value;
        const newfilter = data.filter((value) => {
            return value.certname.toLowerCase().includes(searchword.toLowerCase());
        });
        if(searchword === ""){
            setfilterdata([]);
           
        }
        else{
        setfilterdata(newfilter);
        }
    }
    const func = (e) => {
        console.log("e",filterdata);

        // const f = data.filter((val) => {
        //     return val.certname;
        // })

    }
    return(
        <div>
           <h1>Dashboard</h1>
        <h2>Search Certificate</h2>
            <div className="search">
                <div className="searchInputs">
                    <input type="text" placeholder={placeholder} onChange={handleFilter}/>
                    {/* <div className="searchIcon">
                        <SearchIcon />
                    </div> */}
                </div>
                {filterdata.length != 0 && (
                <div className="dataResult">
                    {filterdata.map((value,key) => {
                        return <div> <button onClick={func()}>{value.certname}</button></div>
                    })}
                </div>
)}
            </div>
        </div>
    );
}

export default Search;