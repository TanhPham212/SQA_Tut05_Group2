import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import '../movie_details.css';

export const Bookingform = () => {
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const password = location.state.password;
    const mobile = location.state.mobile;
    const moviename = location.state.moviename;
    const ticketcost = location.state.ticketcost;
    const movieimage = location.state.movieimage;
    const releasedate = location.state.releasedate;
    const outdate = location.state.outdate;
    const email = location.state.email;


    const [bookingdate, setbookingdate] = useState('');
    const selectseats = (e) => {
        e.preventDefault();
        if ( moviename === "" || ticketcost === "" || bookingdate === "") {
            alert("please select booking date");
        } else {
            history.push({ pathname: '/pickseat', state: { profile: profile, name: name,  email: email, movieimage: movieimage, mobile: mobile, moviename: moviename, ticketcost: ticketcost, bookingdate: bookingdate, password: password } })
        }

    }
    return (
        <div class="form-container sign-in-container" className="movie-container" >
            <form style={{ background: '#f6f5f7' }}>
                <h1>Book The Ticket</h1>
                <span>One Ticket Cost : {ticketcost}$</span>
                <br />
                <input type="text" placeholder="Movie name" value={moviename} />
                <input type="text" placeholder="Ticket Amount" value={ticketcost} />
                <input type="date" placeholder="Pick Booking Date" max={outdate} min={releasedate} value={bookingdate} onChange={(e) => setbookingdate(e.target.value)} />
                <br />
                <button onClick={selectseats}>Select seats</button>
            </form>
        </div>
    )
}
