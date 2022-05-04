import React, { useState, useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';

export const ManageStaff = () => {
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const password = location.state.password;
    const name = location.state.name;
    const mobile = location.state.mobile;
    const email = location.state.email;
    const [userbookings, setuserbookings] = useState([]);

    useEffect(() => {
        fire.firestore().collection("users").get().then((snapshot) => snapshot.forEach(ele => {
            const data = ele.data();
            setuserbookings(arr => [...arr, { data: data }]);
            // console.log(data);
        }))

    }, []) 

    return (
        <div className="wrapper ">
            <link href="../assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />
            <div className="sidebar" data-color="purple" data-background-color="white">
                <div className="logo"><a  className="simple-text logo-normal">
                    HANU CINEMAS
                </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to={{ pathname: "/adminpage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{ pathname: "/movieupload", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Movie Upload</p>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={{ pathname: "/liststaff", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">content_paste</i>
                                <p>Manage User</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/adminprofile", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">person</i>
                                <p>Admin Profile</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/listitem", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link" >
                                <i className="material-icons">notifications</i>
                                <p>Manage FnB</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to="" className="nav-link" >
                                <i className="material-icons">logout</i>
                                <p>Logout</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-panel">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title">Manage User</h4>
                                        {/* <p className="card-category" id="card-category">Movie Bookings Appear Here</p> */}
                                    </div>
                                    <div className="card-body" id="movie-table-card">
                                        <div className="table-responsive" id="movie-table">
                                            <table className="table">
                                                <thead className=" text-primary">
                                                    <th>
                                                     Image
                                                    </th>
                                                    <th>
                                                     User Name
                                                    </th>
                                                    <th>
                                                     Mobile
                                                    </th>
                                                    <th>
                                                     Email
                                                    </th>
                                                    <th>
                                                     Action
                                                    </th>

                                                </thead>
                                                <tbody>
                                                    {
                                                        userbookings.map((data, index) => {
                                                            return <tr key={index}>
                                                                <td>
                                                                <img src={data.data.profile} style={{ width: '10rem', height: '12rem' }} />
                                                                </td>
                                                                <td>
                                                                    {data.data.name}
                                                                </td>
                                                                <td>
                                                                    {data.data.mobile}
                                                                </td>
                                                                <td>
                                                                    {data.data.email}
                                                                </td>
                                                                <td>
                                                                <button 
                                                                    style={{fontsize: '10px',  padding: '5px 15px', backgroundColor: 'black',  border: 'none'}} 
                                                                    onClick={() => { fire.firestore().collection("users").where("email", "==", data.data.email)
                                                                    .get().then((querySnapshot)=> {
                                                                        querySnapshot.forEach((doc) => {
                                                                            doc.ref.delete()
                                                                        })
                                                                    }).then(() => {
                                                                            alert("User Deleted Successfully")
                                                                            history.push({ pathname: "/liststaff" , state: { name: name, profile: profile, email: email, password: password, mobile: mobile}  })
                                                                        })}}
                                                                    >Delete</button>
                                                                </td>

                                                            </tr>
                                                        })
                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
