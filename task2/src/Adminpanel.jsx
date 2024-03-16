import axios from "axios";
import { useState, useEffect } from "react";
const AdminPanel = () => {
    const [data, setData] = useState("");
    const [service, setService] = useState("");
    const [status, setStatus] = useState(false);
    const get = () => {
        axios
            .get("http://localhost:5000/getservices")
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const approved = (id) => {
        setStatus(true);
        axios.post(`http://localhost:5000/approve`, {
            status,
            id,
        });
    };

    const deleteservice = (id) => {
        axios.post(`http://localhost:5000/deleteservice`, {
            id,
        });
    };

    useEffect(() => {
        get();
    }, []);
    return (
        <div>
            <h4>Search By Service name</h4>
            <input
                type="text"
                name=""
                id=""
                className="form-control w-50"
                placeholder="Enter Service Name"
                onChange={(e) => {
                    setService(e.target.value);
                }}
            />
            {data &&
                data
                    .filter((serviceName) => serviceName.ServiceName == service)
                    .map((items) => (
                        <table className="table table-secondary  table-responsive">
                            <tr>
                                <th>Freelancer Name</th>
                                <th>Service Name</th>
                                <th>Service deliver in</th>
                                <th>Service Price</th>
                                <th>Service img</th>
                                <th>Status</th>
                                <th>Actino</th>
                                <th>Details</th>
                            </tr>
                            <tr>
                                <td>{items.FreelancerName}</td>
                                <td>{items.ServiceName}</td>
                                <td>{items.Servicedeliverin}</td>
                                <td>{items.ServicePrice}</td>
                                <td>{items.Serviceimg}</td>
                                <td>{items.Status}</td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => {
                                            approved(items.id);
                                        }}
                                    >
                                        {" "}
                                        Approve
                                    </button>
                                </td>
                                <td>Details</td>
                            </tr>
                        </table>
                    ))}
            <table className="table table-secondary mt-5 table-responsive">
                <tr>
                    <th>Freelancer Name</th>
                    <th>Service Name</th>
                    <th>Service deliver in</th>
                    <th>Service Price</th>
                    <th>Service img</th>
                    <th>Status</th>
                    <th>Actino</th>
                    <th>Details</th>
                </tr>
                {data &&
                    data.map((item) => (
                        <tr>
                            <td>{item.FreelancerName}</td>
                            <td>{item.ServiceName}</td>
                            <td>{item.Servicedeliverin}</td>
                            <td>{item.ServicePrice}</td>
                            <td>{item.Serviceimg}</td>
                            <td>{item.Status}</td>
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => {
                                        approved(item.id);
                                    }}
                                >
                                    {" "}
                                    Approve
                                </button>
                            </td>
                            <td>Details</td>
                        </tr>
                    ))}
            </table>
        </div>
    );
};
export default AdminPanel;
