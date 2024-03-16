import { Link } from "react-router-dom";
import home from './Images/home.png'
import logo from './Images/Logoo.png'
const SideBarDashboard = () => {
        return (
                <div className="col-2 sidebar-dash  ">
                        <Link to={'/'}>
                                <div className="dash-logo">
                                        <img src={logo} alt="" className="img-fluid" />
                                </div>
                        </Link>
                        <div className="ps-2 dash-links">
                                <Link to={'/dashboard'} className="text-decoration-none text-dark">
                                        <div className="dash-links d-flex">
                                                <img src={home} alt="" />
                                                <h6 className="mt-2">Dashboard</h6>
                                        </div>
                                </Link>
                                <Link to={'/addevent'} className="text-decoration-none text-dark">
                                        <div className="dash-links d-flex">
                                                <img src={home} alt="" />
                                                <h6 className="mt-2">Add Event</h6>
                                        </div>
                                </Link>
                                <Link to={'/AddTeam'} className="text-decoration-none text-dark">
                                        <div className="dash-links d-flex">
                                                <img src={home} alt="" />
                                                <h6 className="mt-2">Add Team</h6>
                                        </div>
                                </Link>
                                <Link to={'/addcompetition'} className="text-decoration-none text-dark">
                                        <div className="dash-links d-flex">
                                                <img src={home} alt="" />
                                                <h6 className="mt-2">Add Competition</h6>
                                        </div>
                                </Link>
                                <Link to={'/addscore'} className="text-decoration-none text-dark">
                                        <div className="dash-links d-flex">
                                                <img src={home} alt="" />
                                                <h6 className="mt-2">Add Score</h6>
                                        </div>
                                </Link>
                                <Link to={'/addadmin'} className="text-decoration-none text-dark">
                                        <div className="dash-links d-flex">
                                                <img src={home} alt="" />
                                                <h6 className="mt-2">Add Admin</h6>
                                        </div>
                                </Link>
                        </div>
                </div>
        );
}

export default SideBarDashboard;