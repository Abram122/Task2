import axios from "axios";
import { useState } from "react";
const FormTest = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/adduser', {
            name, email, password
        }).then((res) => {
            alert(res.data)
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
                    <label>Email</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setEmail(e.target.value)
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
export default FormTest;