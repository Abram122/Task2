import { Link } from 'react-router-dom';
import img from "./Images/landing.jpg"
import { useState, useEffect } from "react";
import axios from 'axios';
const Competion = () => {
    const [data, setData] = useState('')
    const [data2, setData2] = useState('')
    const [com, setCom] = useState('')
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

    useEffect(() => {
        getData()
        getData2()
    }, [])
    return (
        <div className="container mt-4" id="competition">
            {
                data2 && data2.slice(0,3).map((item) => (
                    <div>
                        <h1 className="text-center">{item.competitionname}</h1>
                        <div className="com-border"></div>
                        <div className="competion-events mt-4">
                            <div className="d-flex flex-wrap gap-3 justify-content-center">
                                {
                                    data && data.filter(items => items.competionName == item.competitionname).slice(0, 3).map((items) => (
                                        <div className="card event">
                                            <img src={`http://localhost:5000/images/` + items.eventImage} className="card-img-top" alt="..." />
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
                            <div className='text-center mt-4'>
                                {
                                    data && data.filter(items => items.competionName == item.competitionname).slice(3, 4).map((see) => (
                                        <Link className="text-decoration-none" to={`/allevents/${item.id}`}>
                                            <button className='seeAll'>SEE ALL Events</button>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                data2 && data2.slice(3, 4).map((item) => (
                    <div className='text-center'>
                        <Link className="text-decoration-none" to={`/allcompetitions`}>
                            <button className='seeAll'>SEE ALL Competitions</button>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}

export default Competion;