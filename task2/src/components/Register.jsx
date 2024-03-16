import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Register = () => {
    const navigate = useNavigate('/signup')
    const navigate2 = useNavigate('/')
    const [data,setData] = useState('')
    const [data2,setData2] = useState('')
    const {name} = useParams()
    const [team,setTeam] = useState('')
    const getData = ()=>{
        axios.get('http://localhost:5000/getusers').then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const getData2 = ()=>{
        axios.get('http://localhost:5000/getteams').then((res)=>{
            setData2(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const handleSubmit = ()=>{
        axios.post('http://localhost:5000/register',{
            team,name
        }).then((res)=>{
            if(res.data == "done"){
                alert("registerd successfully")
                navigate2('/')
            }else{
                alert("this team already registerd")
            }
        }).catch((err)=>{
            alert(err)
        })
    }
    useEffect(()=>{
        if(!localStorage.getItem("userName")){
            navigate('/signup')
        }else{
            getData()
            getData2()
        }
    },[])
    return (
        <div className="container">
            <h1 className="text-center fw-light">Welcome {localStorage.getItem("userName")}</h1>
            <h3 className="mt-3">Please Choose Your Team</h3>
                <select className="form-select mt-3" onChange={(e)=>{
                    setTeam(e.target.value)
                }}>
                    <option selected>Please Select your team, if you canot find your team check with Admin</option>
            {
                        data2 && data2.filter((items)=>items.member1 == localStorage.getItem("userEmail") || items.member2 == localStorage.getItem("userEmail") || items.member3 == localStorage.getItem("userEmail")|| items.member4 == localStorage.getItem("userEmail")|| items.member5 == localStorage.getItem("userEmail") ).map((item)=>(
                        <option>{item.teamName}</option>
                        ))
                    }
                    </select>
                    <div className="text-center mt-5">
                            <button className="w-50 btn btn-primary" onClick={handleSubmit}>Register in this competition</button>
                    </div>
        </div>
    );
}

export default Register;