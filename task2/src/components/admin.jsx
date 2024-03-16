import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Admin = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate('dashboard')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/admin', {
            name, password
        }).then((res) => {
            if(res.data.user.name == "admin"){
                sessionStorage.setItem("adminName",res.data.user.name)
                sessionStorage.setItem("superAdmin",res.data.user.name)
            }else{
                sessionStorage.setItem("adminName",res.data.user.name)
            }
            navigate("/dashboard")
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="container admin-container">
            <form action="" className="w-75 shadow p-5">
                <h2 className="text-center">Admin Login Page</h2>
                <div className="form-group mt-3">
                    <label>User Name</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setName(e.target.value)
                    }} />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input type="password" className="form-control" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary w-50" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Admin;