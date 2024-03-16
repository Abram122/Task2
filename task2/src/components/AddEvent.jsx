import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBarDashboard from "./SideBarDashboard";
const AddEvent = ()=>{
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [competionName,setCompetionName] = useState('')
    const [eventCategory,setEventCategory] = useState('')
    const [file, setFile] = useState('')
    const [data,setData] = useState('')
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description)
        formData.append('category', eventCategory)
        formData.append('competition', competionName);
        formData.append('file', file);
        axios.post('http://localhost:5000/addevent',
            formData
        ).then((res)=>{
            alert("added")
            navigate("/dashboard")
        }).catch((err)=>{
            alert("canot add")
        })
    }
    const getData = ()=>{
        axios.get('http://localhost:5000/getcompetion').then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    const navigate = useNavigate('admin')
    useEffect(()=>{
        if(!sessionStorage.getItem("adminName")){
            navigate("/admin")
        }else{
            getData()
        }
    },[])
    return(
        <div className="container-fluid">
            <div className="row justify-content-between">
                <SideBarDashboard/>
                <div className="col-9"> 
                <form action="" className="w-75 shadow p-5">
                <h2 className="text-center">Add Event</h2>
                <div className="form-group mt-3">
                    <label className="form-label">Event Name</label>
                    <input type="text" className="form-control" onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Event Description</label>
                    <input type="text" className="form-control" onChange={(e)=>{
                        setDescription(e.target.value)
                    }}/>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Event Image</label>
                    <input type="file" className="form-control" onChange={handleFileChange}/>
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Select Competion Name</label>
                    <select className="form-select" onChange={(e)=>{
                        setCompetionName(e.target.value)
                    }}>
                        <option selected>Select Competion Name</option>
                        {
                            data && data.map((item)=>(
                                <option>{item.competitionname}</option>
                            ))
                        }
                    </select>
                </div>
                    <div className="form-group mt-3">
                    <label className="form-label">Select Event Category</label>
                    <select className="form-select" onChange={(e)=>{
                        setEventCategory(e.target.value)
                    }}>
                    <option selected>Select Category</option>
                        <option>Education</option>
                        <option>Sporting</option>
                    </select>
                    </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary w-50" onClick={handleSubmit}>Add Event</button>
                </div>
            </form>
                </div>
            </div>
            
        </div>
    )
}
export default AddEvent;