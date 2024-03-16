import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBarDashboard from "./SideBarDashboard";
const AddCategory = () => {
    const [data,setData] = useState('')
    const [name, setName] = useState('')
    const [member1,setMember1] = useState('')
    const [member2,setMember2] = useState('')
    const [member3,setMember3] = useState('')
    const [member4,setMember4] = useState('')
    const [member5,setMember5] = useState('')
    const navigate = useNavigate('admin')
    const getData = ()=>{
        axios.get('http://localhost:5000/getusers').then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:5000/addteam", {
                name,member1,member2,member3,member4,member5
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
        }else{
            getData()
        }
    },[])
    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <SideBarDashboard/>
                <div className="col-9"> 
                <form action="" className="w-75 shadow p-5">
                <h2 className="text-center">Add A New Team</h2>
                <div className="form-group mt-3">
                    <label>Team Name</label>
                    <input type="text" className="form-control" onChange={(e) => {
                        setName(e.target.value)
                    }} />
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Member One</label>
                    <select className="form-select" onChange={(e)=>{
                        setMember1(e.target.value)
                    }}>
                        <option selected>Please Select</option>
                        {
                            data && data.filter((items)=> items.status == "team").map((item)=>(
                                <option>{item.userEmail}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Member Two</label>
                    <select className="form-select" onChange={(e)=>{
                        setMember2(e.target.value)
                    }}>
                        <option selected>Please Select</option>
                        {
                            data && data.filter((items)=> items.status == "team").map((item)=>(
                                <option>{item.userEmail}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Member Three</label>
                    <select className="form-select" onChange={(e)=>{
                        setMember3(e.target.value)
                    }}>
                        <option selected>Please Select</option>
                        {
                            data && data.filter((items)=> items.status == "team").map((item)=>(
                                <option>{item.userEmail}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Member Four</label>
                    <select className="form-select" onChange={(e)=>{
                        setMember4(e.target.value)
                    }}>
                        <option selected>Please Select</option>
                        {
                            data && data.filter((items)=> items.status == "team").map((item)=>(
                                <option>{item.userEmail}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Member Five</label>
                    <select className="form-select" onChange={(e)=>{
                        setMember5(e.target.value)
                    }}>
                        <option selected>Please Select</option>
                        {
                            data && data.filter((items)=> items.status == "team").map((item)=>(
                                <option>{item.userEmail}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary w-50" onClick={handleSubmit}>Submit</button>
                </div>
            </form>
                </div>
            </div>
        </div>
    )
}
export default AddCategory;