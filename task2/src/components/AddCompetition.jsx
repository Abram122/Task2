import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBarDashboard from "./SideBarDashboard";
const AddCompetition = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const navigate = useNavigate('admin')
    const handleSubmit = (e) => {
    e.preventDefault()
    axios
        .post("http://localhost:5000/addcompetition", {
            name,type
        })
        .then((res) => {
            navigate('/dashboard')
            alert("added");
        })
        .catch((err) => {
            alert("canot add");
        });
    };
    useEffect(()=>{
        if(!sessionStorage.getItem("adminName")){
            navigate("/admin")
        }
    },[])
    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <SideBarDashboard/>
                <div className="col-9"> 
                <form action="" className="w-75 shadow p-5">
            <h2 className="text-center">Add Competition</h2>
            <div className="form-group mt-3">
            <label className="form-label">Competion Name</label>
            <input
                type="text"
                className="form-control"
                onChange={(e) => {
                setName(e.target.value);
                }}
            />
            </div>
            <div className="form-group mt-3">
            <label className="form-label">Competion Type</label>
            <select
                className="form-select"
                onChange={(e) => {
                setType(e.target.value);
                }}
            >
                <option selected>Please Select Type</option>
                <option>Individual</option>
                <option>Teams</option>
            </select>
            </div>
            <div className="text-center mt-3">
            <button className="btn btn-primary w-50" onClick={handleSubmit}>
                Add Competion
            </button>
            </div>
        </form>
                </div>
            </div>
        </div>
    );
};
export default AddCompetition;
