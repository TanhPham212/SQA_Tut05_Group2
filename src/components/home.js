import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation,useParams } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';



export const Homepage = () => {
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;
    const [moviedata, setmoviedata] = useState([]);


    useEffect(() => {
        fire.firestore().collection("currentmovies").get().then((snapshot) => {
            snapshot.forEach(doc => {
                var data = doc.data();
                //console.log(data);
                setmoviedata(arr => [...arr, { data: data }])

            })
        })
    }, [])

    return (
        <div className="wrapper ">
            
            <link href="../assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />
            <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
                <div className="logo"><a  className="simple-text logo-normal">
                    HANU CINEMAS
                </a></div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        <li className="nav-item active  ">
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
                        <li className="nav-item ">
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
                                <p>Food And Beverage</p>
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
                <div className="row-movie">
                    {
                        moviedata.map((data, index) => {
                   
                            return <div className="col-4" key={index} style={{ marginLeft: "auto", marginRight: "auto" }}>
                                <div className="card">

                                    <div className="card-img-top img-fluid">
                                        <img src={data.data.image} style={{ width: '15rem', height: '17rem' }} />
                                    </div>
                                    <button onClick={() => history.push({ pathname: "/details", state: { viedourl: data.data.viedourl, moviename: data.data.moviename, description: data.data.description, actorname: data.data.actorname, directorname: data.data.directorname, releasedate: data.data.releasedate, outdate: data.data.outdate, profile: profile, name: name, email: email, password: password, mobile: mobile } })}>View Details</button>
                                    <button onClick={() => history.push({ pathname: "/bookingform", state: { releasedate: data.data.releasedate, outdate: data.data.outdate, movieimage: data.data.image, moviename: data.data.moviename, ticketcost: data.data.ticketcost, profile: profile, name: name, email: email, password: password, mobile: mobile } })}>Book Now</button>

                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>


    )
}
