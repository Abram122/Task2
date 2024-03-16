import img from "./Images/landing.jpg"
import { useState, useEffect } from "react";
import { useParams ,Link} from "react-router-dom";
import axios from 'axios';
const CompetionAll = () => {
    const {id} = useParams()
    const [data,setData] = useState('')
    const [data2,setData2] = useState('')
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
    useEffect(()=>{
        getData()
        getData2()
    },[])
    return (
        <div className="container mt-4">
             {
                data2 && data2.filter(items=> items.id == id).map((item)=>(
                    <div>
            <h1 className="text-center">{item.competitionname}</h1>
            <div className="com-border"></div>
            <div className="competion-events mt-4">
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                    {
                        data && data.filter(items=> items.competionName == item.competitionname).map((items)=>(
                            <div className="card event">    
                            <img src={`http://localhost:5000/images/`+ items.eventImage} className="card-img-top" alt="..."/>
                                <div className="card-body ">
                                    <h5 className="card-title">{items.eventName}</h5>
                                    <p className="card-text">{items.eventDescription}</p>
                                    <div className='d-flex justify-content-between'>
                                    <Link to={`/register/${item.competitionname}`} className='btn btn-outline-primary'>Register Now</Link>
                                    <Link to={`/rank/${item.competitionname}`} className='btn btn-outline-primary'>Show Rank</Link>
                                    </div>
                                </div>
                        </div>
                        ))
                    }
                </div>
            </div>
            </div>
                ))
            }
        </div>
    );
}

export default CompetionAll;