import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import fire from '../files/firebase';


export const Adminpage = () => {
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
        console.log(moviedata);
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
                        <li className="nav-item ">
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
            
                <div className="row-movie">
                    {
                        moviedata.map((data, index) => {
                            //console.log(data.image);
                            return <div className="col-4" key={index} style={{ marginLeft: "auto", marginRight: "auto" }}>
                                <div className="card">

                                    <div className="card-img-top img-fluid">
                                        <img src={data.data.image} style={{ width: '15rem', height: '17rem' }} />
                                    </div>
                                    <button onClick={() => { fire.firestore().collection("currentmovies").where("moviename", "==", data.data.moviename)
                                    .get().then((doc) => doc.docs[0].ref.delete()) }}>Delete</button>
                                </div>
                            </div>
                        })

                    }





                </div>
            </div>
        </div>


    )
}
