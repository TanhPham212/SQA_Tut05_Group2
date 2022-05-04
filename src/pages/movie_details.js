import React from 'react'
import { useLocation,  useHistory } from 'react-router-dom'
import '../movie_details.css';


export const MovieDetails = () => {
    const location = useLocation();
    const history = useHistory();
    var viedourl = location.state.viedourl;
    var moviename = location.state.moviename;
    var description = location.state.description;
    var actorname = location.state.actorname;
    var directorname = location.state.directorname;
    var releasedate = location.state.releasedate;
    var outdate = location.state.outdate;
    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;
    console.log(name);

    return (
        <div>
          <h1 style={{color:'white', textAlign:'center', margin: '30px'}}> Movie Details </h1>
            <div className='container-details'> 
            <div ><iframe width="550" height="400" className="viedo" src={viedourl}></iframe></div>
            <div style={{ color: 'white', marginLeft: '20px', maxWidth:'500px' }}>
                <p><strong>Moviename :</strong> {moviename}</p>
                <p><strong>Description :</strong> {description}</p>
                <p><strong>Actor Name :</strong> {actorname}</p>
                <p><strong>Director Name : </strong>{directorname}</p>
                <p><strong>Release Date :</strong> {releasedate}</p>
                <p><strong>Out Date : </strong>{outdate}</p>
                
            </div>
            </div>
           
            <a onClick={() => history.push({ pathname: "/homepage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile } })}style={{ color: 'white', textDecoration: 'underline'}}>Retrurn Home</a>
            

        </div>
    )
}
