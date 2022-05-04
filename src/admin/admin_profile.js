import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import fire from '../files/firebase';
import $ from 'jquery';
import '../profile.css';


export const Adminprofile = () => {
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;

    const auth = fire.auth();

    const resetPassword = (e) => {
        e.preventDefault();
        const mail = $("#mail").val();

        if ( mail != "") {
       
        auth.sendPasswordResetEmail(mail)
        .then(() => {
            alert("Email has been sent to you, Please Check and verify.")
        }).catch( error => {
            var errorCode = error.code;
            var errorMessage = errorCode.message;

            alert("Message: " + errorMessage)
        })}
        else {
            alert("Please write your email first.")
        }

        
    }
    const changePass = () => {
        $(".profile").hide();
        $(".changePassword").show();

    }
    useEffect(() => {
      
        $(".changePassword").hide();


    }, [])
    return (
        <div>
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
                        <li className="nav-item active">
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

            <div className="profile" style={{ fontFamily: 'sans-serif', maxWidth:'400px', boxShadow: '0 0 10px rgba(0,0,0,0.2)', padding: '100px' }}>
                    <img src={profile} alt="Profile Image" className="profile__image" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', margin: '0 auto 20px auto', display: 'block', marginTop: '-8%' }} />
                    <div className="profile__name" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{name}</div>
                    <br />
                    <div className="profile__title" style={{ marginBottom: '20px' }}>Email: {email}</div>

                    <div className="profile__detail" style={{ marginBottom: '20px' }}>
                        Mobile: {mobile}
                    </div>
                    <div>
                        <a onClick={changePass}style={{textDecoration: 'underline'}}>Change Password?</a>
                    </div>
                </div>

                <div className='changePassword'>

        <form >    
        <h3>Change Password</h3>
            <label htmlFor='email'>Email</label>
            <input type="email" id='mail' name='mail' placeholder='Enter'
            />
            
            <button onClick={resetPassword} type="submit" style={{marginTop: "10px"}}>Submit</button>
        </form>
        </div>
            </div>
        </div>

    )
}
