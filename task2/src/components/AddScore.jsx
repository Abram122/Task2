import { useState, useEffect } from "react";
import { useNavigate ,Link} from "react-router-dom";
import home from './Images/home.png'
import axios from "axios";
import SideBarDashboard from "./SideBarDashboard";
const AddScore = () => {
    const [data, setData] = useState('')
    const [data2, setData2] = useState('')
    const [data3, setData3] = useState('')
    const [EventName, setEventName] = useState('')
    const [CompetionName, setCompetionName] = useState('')
    const [TeamName, setTeamName] = useState('')
    const [score, setScore] = useState('')
    const getData = () => {
        axios.get('http://localhost:5000/getevent').then((res) => {
            setData(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const getData2 = () => {
        axios.get('http://localhost:5000/getcompetion').then((res) => {
            setData2(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const getData3 = () => {
        axios.get('http://localhost:5000/getteams').then((res) => {
            setData3(res.data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    const navigate = useNavigate('admin')
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:5000/addscore',{
            CompetionName,EventName,TeamName,score
        }).then((res)=>{
            alert("added")
            navigate("/dashboard")
        }).catch((err)=>{
            alert("canot add")
        })
    }
    useEffect(()=>{
        if(!sessionStorage.getItem("adminName")){
            navigate("/admin")
        }else{
            getData()
            getData2()
            getData3()
        }
    },[])
    return (
        <div className="container-fluid">
            <div className="row justify-content-between">
                <SideBarDashboard/>
                <div className="col-9"> 
                <form action="" className="w-75 shadow p-5">
                <h2 className="text-center">Add Score</h2>

                <div className="form-group mt-3">
                    <label className="form-label">Select Competition</label>
                    <select className="form-select" onChange={(e) => {
                        setCompetionName(e.target.value)
                    }}>
                        <option selected>Please Select</option>
                        {
                            data2 && data2.map((item) => (
                                <option>{item.competitionname}</option>
                            ))
                        }
                    </select>
                </div>
                
                <div className="form-group mt-3">
                    <label className="form-label">Event Name</label>
                    <select className="form-select" onChange={(e) => {
                        setEventName(e.target.value)
                    }}>
                        <option selected>Select Event Name</option>
                        {
                            data && data.filter((items)=> items.competionName == CompetionName).map((item) => (
                                <option>{item.eventName}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group mt-3">
                    <label className="form-label">Team Name</label>
                    <select className="form-select" onChange={(e) => {
                        setTeamName(e.target.value)
                    }}>
                        <option selected>Select Team Name</option>
                        {
                            data3 && data3.map((item) => (
                                <option>{item.teamName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Insert Score</label>
                    <input type="number" className="form-control" onChange={(e) => {
                        setScore(e.target.value)
                    }}/>
                <div className="text-center mt-3">
                    <button className="btn btn-primary w-50" onClick={handleSubmit}>Add Score</button>
                </div>
                </div>
            </form>
                </div>
            </div>
            
        </div>
    )
}
export default AddScore;