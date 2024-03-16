import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Rank = () => {
    const {name} = useParams()
    const [data,setData] = useState('')
    const navigate = useNavigate('/signup')
    const getData = ()=>{
        axios.get('http://localhost:5000/getscore').then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        if(!localStorage.getItem("userName")){
            navigate('/signup')
        }else{
            getData()
        }
    },[])
    return (
        <div className="container">
            <h1 className="text-center fw-light">Rank Page</h1>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Competition Name</th>
                        <th>Total Points</th>
                        <th>Team Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.filter((items)=>items.competionName == name).map((item,index)=>(
                            <tr>
                                <td>{item.teamName}</td>
                                <td>{item.competionName}</td>
                                <td>{item.totalPoints}</td>
                                <td>{index + 1 }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        );
}

export default Rank;