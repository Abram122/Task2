import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBarDashboard from "./SideBarDashboard";
import axios from "axios";
const AddAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState("");
    const [data2, setData2] = useState("");
    const [counter,setCounter] = useState('')
    const navigate = useNavigate('admin')
    const handleDelete = (id) => {
        axios.post('http://localhost:5000/deleteadmin', { id })
            .then((response) => {
                setCounter(counter+1)
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:5000/addadmin", {
                email, password
            })
            .then((res) => {
                if (res.data == "done") {
                    setCounter(counter+1)
                }
            })
            .catch((err) => {
                alert("canot add");
            });
    };
    const getData = () => {
        axios.get('http://localhost:5000/getusers').then((res) => {
            setData(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const getData2 = () => {
        axios.get('http://localhost:5000/getadmins').then((res) => {
            setData2(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        if (!sessionStorage.getItem("superAdmin")) {
            navigate("/dashboard")
            alert("canot access this page")
        }
        getData()
        getData2()
    }, [counter])
    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <SideBarDashboard />
                <div className="col-9">
                    <form action="" className="w-75 shadow p-5">
                        <h2 className="text-center">Add Admin</h2>
                        <div className="form-group mt-3">
                            <label className="form-label">Admin Email</label>
                            <select className="form-select" onChange={(e) => {
                                setEmail(e.target.value)
                            }}>
                                <option selected>Please Select</option>
                                {
                                    data && data.map((item) => (
                                        <option>{item.userEmail}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label className="form-label">Password</label>
                            <input type="text" className="form-control" onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                        </div>
                        <div className="text-center mt-3">
                            <button className="btn btn-primary w-50" onClick={handleSubmit}>
                                Add Admin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <table className="table w-50 m-auto ">
                <thead>
                    <tr>
                        <th>Admin Name</th>
                        <th>Admin Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data2 && data2.slice(1).map((item) => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.password}</td>
                                <td><button className="btn btn-danger" onClick={()=>{
                                    handleDelete(item.id)
                                }}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default AddAdmin;