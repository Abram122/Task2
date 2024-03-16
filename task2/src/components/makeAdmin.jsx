import { useState } from "react";
const Admins = ()=>{
    return(
      <div className="container admin-container ">
            <form action="" className="w-75 shadow p-5">
                <h2 className="text-center">Select one to make them admin</h2>
                <div className="form-group mt-3">
                    <label>Select Name</label>
                    <select className="form-control mt-2">
                        <option>sdsdsd</option>
                        <option>sdsdsd</option>
                        <option>sdsdsd</option>
                        <option>sdsdsd</option>
                        <option>sdsdsd</option>
                    </select>
                </div>
                <div className="text-center mt-3">
                    <button className="btn btn-primary w-50">Add</button>
                </div>
            </form>
      </div>
    )
  }
  export default Admins;