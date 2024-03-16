import { useState } from "react";
const AddCategory = ()=>{
    const [name,setName] = useState('')
    return(
      <div className="container admin-container ">
            <form action="" className="w-75 shadow p-5">
                <h2 className="text-center">Add New Category</h2>
                <div className="form-group mt-3">
                    <label>Category Name</label>
                    <input type="text" className="form-control" onChange={(e)=>{
                        setName(e.target.value)
                    }}/>
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary w-50">Submit</button>
                </div>
            </form>
      </div>
    )
  }
  export default AddCategory;