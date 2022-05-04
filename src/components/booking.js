import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';

export const Booking = () => {
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;
    const [userbookings, setuserbookings] = useState([]);

    useEffect(() => {
        fire.firestore().collection("Bookings").where("email", "==", email).get().then((snapshot) => snapshot.forEach(ele => {
            const data = ele.data();
            setuserbookings(arr => [...arr, { data: data }]);
            // console.log(data);
        }))

    }, [])
    //console.log(userbookings);
    return (
        <div className="wrapper ">
            <link href="../assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                <div className="logo"><a  className="simple-text logo-normal">
                    HANU CINEMAS
                </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to={{ pathname: "/homepage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{ pathname: "/dashboard", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item active ">
                            <Link to={{ pathname: "/bookings", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">content_paste</i>
                                <p>History</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/userprofile", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">person</i>
                                <p>User Profile</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/orderitem", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link" >
                                <i className="material-icons">notifications</i>
                                <p>Food and Beverage</p>
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
                                        <h4 className="card-title">History</h4>
                                        <p className="card-category" id="card-category">Movie Bookings Appear Here</p>
                                    </div>
                                    <div className="card-body" id="movie-table-card">
                                        <div className="table-responsive" id="movie-table">
                                            <table className="table">
                                                <thead className=" text-primary">
                                                    <th>
                                                        Booking Date
                                                    </th>
                                                    <th>
                                                        Movie Name
                                                    </th>
                                                    <th>
                                                        Seats Available
                                                    </th>
                                                    <th>
                                                        Movie Date
                                                    </th>

                                                </thead>
                                                <tbody>
                                                    {
                                                        userbookings.map((data, index) => {
                                                            return <tr key={index}>
                                                                <td>
                                                                    {data.data.currentdate}
                                                                </td>
                                                                <td>
                                                                    {data.data.moviename}
                                                                </td>
                                                                <td>
                                                                    {data.data.totalseats}
                                                                </td>
                                                                <td>
                                                                    {data.data.bookingdate}
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
