import React, { useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import fire from '../files/firebase';
import '../movie_details.css';

export const Movieupload = () => {
    const [image, setimage] = useState('');
    const [moviename, setmoviename] = useState('');
    const [ticketcost, setticketcost] = useState('')
    const [description, setdescription] = useState('');
    const [actorname, setactorname] = useState('');
    const [directorname, setdirectorname] = useState('');
    const [releasedate, setreleasedate] = useState('');
    const [outdate, setoutdate] = useState('');
    const [viedo, setviedo] = useState('');
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;
    console.log(email);
    const movieUpload = (e) => {
        e.preventDefault();
        if (image === "" || viedo === "" || moviename === "" || description === "" || actorname === "" || directorname === "" || releasedate === "" || outdate === "") {
            alert("please fill all fields");
        } else {
            fire.firestore().collection("currentmovies").add({
                image: image,
                viedourl: viedo,
                moviename: moviename,
                ticketcost: ticketcost,
                description: description,
                actorname: actorname,
                directorname: directorname,
                releasedate: releasedate,
                outdate: outdate
            }).then(() => {
                alert("Movie Added Successfully");
                setimage('');
                setviedo('');
                setmoviename('');
                setticketcost('');
                setdescription('');
                setactorname('');
                setdirectorname('');
                setreleasedate('');
                setoutdate('');
            }).catch((err) => console.log(err))
        }
    }
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
                            <Link to={{ pathname: "/adminpage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } }} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item active">
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
                    <div class="form-container sign-in-container" style={{ height: 'auto', left: '0', width: 'max-content', zIndex: 2, marginLeft: '33%', marginTop: '9%' }}>
                        <form className="upload-form" style={{ background: '#f6f5f7', marginLeft: "-50%", marginTop: "inherit" }}>
                            <h2 className="upload-font" style={{ fontWeight: "bold" }}>Upload Movies</h2>
                            <br />
                            <input type="text" placeholder="Movie Image URL" value={image} onChange={(e) => setimage(e.target.value)} />
                            <input type="text" placeholder="Movie Viedo URL" value={viedo} onChange={(e) => setviedo(e.target.value)} />
                            <input type="text" placeholder="Movie Name" value={moviename} onChange={(e) => setmoviename(e.target.value)} />
                            <input type="text" placeholder="Ticket Cost" value={ticketcost} onChange={(e) => setticketcost(e.target.value)} />
                            <input type="text" placeholder="Description" value={description} onChange={(e) => setdescription(e.target.value)} />
                            <input type="text" placeholder="Actor Name" value={actorname} onChange={(e) => setactorname(e.target.value)} />
                            <input type="text" placeholder="Director Name" value={directorname} onChange={(e) => setdirectorname(e.target.value)} />
                            <input type="date" placeholder="Pick Release Date" value={releasedate} onChange={(e) => setreleasedate(e.target.value)} />
                            <input type="date" placeholder="Pick Out Date" value={outdate} onChange={(e) => setoutdate(e.target.value)} />

                            <input type="button" style={{ background: "#730307", color: "white" }} value="Upload Movie" onClick={movieUpload} />
                        </form>
                    </div>
                </div>
            </div>
        
    )
}
