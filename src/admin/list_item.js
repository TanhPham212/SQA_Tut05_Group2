import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router';
import fire from '../files/firebase';
import { Link } from 'react-router-dom';

    export const ListItem = () => {
        const history = useHistory();
        const location = useLocation();
        const profile = location.state.profile;
        const name = location.state.name;
        const email = location.state.email;
        const password = location.state.password;
        const mobile = location.state.mobile;
        const foodname = location.state.foodname;
        const foodprice = location.state.foodprice;
        const image = location.state.image;
        // var moviename = location.state.moviename;
        // var ticketcost = location.state.ticketcost;
        // var bookingdate = location.state.bookingdate;
        const [userbookings, setuserbookings] = useState([]);
    
        useEffect(() => {
            fire.firestore().collection("fooddata").get().then((snapshot) => snapshot.forEach(ele => {
                var data = ele.data();
                setuserbookings(arr => [...arr, { data: data }]);
                // console.log(data);
            }))
    
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
                        <li className="nav-item">
                            <Link to={{ pathname: "/adminpage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, foodname:foodname, foodprice:foodprice, image:image } }} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{ pathname: "/movieupload", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, foodname:foodname, foodprice:foodprice, image: image } }} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Movie Upload</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/liststaff", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, foodname:foodname, foodprice:foodprice,  image: image} }} className="nav-link">
                                <i className="material-icons">content_paste</i>
                                <p>Manage User</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/adminprofile", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, foodname:foodname, foodprice:foodprice,  image: image }}} className="nav-link">
                                <i className="material-icons">person</i>
                                <p>Admin Profile</p>
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={{ pathname: "/listitem", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, foodname:foodname, foodprice:foodprice,  image: image } }} className="nav-link" >
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
                                        <h4 className="card-title">Food and Beverage</h4>
                                    
                                        <button style={{fontsize: '10px',  padding: '5px 15px', backgroundColor: 'black',  borderRadius:'30px'}} 
                                            onClick={() => history.push({ pathname: "/foodupload" , state: { profile: profile, name: name, email: email, password: password, mobile: mobile, foodname:foodname, foodprice:foodprice,  image: image } })} >ADD</button>
                                    </div>
                                    <div className="card-body" id="movie-table-card">
                                        <div className="table-responsive" id="movie-table">
                                            <table className="table">
                                                <thead className=" text-primary">
                                                    <th>
                                                        No
                                                    </th>
                                                    <th>
                                                        Food Image
                                                    </th>
                                                    <th>
                                                        Food Name
                                                    </th>
                                                    <th>
                                                        Food Price
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
                                                                    {index}
                                                                </td>
                                                                <td>
                                                                <img src={data.data.image} style={{ width: '10rem', height: '10rem' }} />
                                                                </td>
                                                                <td>
                                                                    {data.data.foodname}
                                                                </td>
                                                                <td>
                                                                    {data.data.foodprice}$ 
                                                                </td>
                                                                <td>
                                                                    <button 
                                                                    style={{fontsize: '10px',  padding: '5px 15px', backgroundColor: 'black',  borderRadius:'30px'}} 
                                                                    onClick={() => { fire.firestore().collection("fooddata").where("foodname", "==", data.data.foodname)
                                                                    .get().then((doc) => doc.docs[0].ref.delete()) }}
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
    );
}
