import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import home from './Images/home.png'
import SideBarDashboard from "./SideBarDashboard";
const Dashboard = () => {
    const [data, setData] = useState('')
    const navigate = useNavigate('admin')
    const getData = () => {
        axios.get('http://localhost:5000/getevent').then((res) => {
            setData(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        if(!sessionStorage.getItem("adminName")){
            navigate("/admin")
        }else{
            alert("All Dashboard Not responsive please open it from any desktop device")
            getData()
        }
    }, [])
    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <SideBarDashboard/>
                <div className="col-9 dashboard"> 
                    <table className="table">
                        <thead>
                        <tr className="">
                            <th>Competion Name</th>
                            <th>Event Name</th>
                            <th>Event Category</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data && data.map((item)=>(
                                <tr className="">
                                    <td>{item.competionName}</td>
                                    <td>{item.eventName}</td>
                                    <td>{item.eventCategory}</td>
                                    <td><button className="btn btn-danger">Delete</button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;