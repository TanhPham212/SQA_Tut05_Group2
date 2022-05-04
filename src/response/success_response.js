import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Preview, print } from 'react-html2pdf';

export const Successresponse = () => {
    const history = useHistory();
    const location = useLocation();
    var profile = location.state.profile;
    var email = location.state.email;
    var password = location.state.password;
    var mobile = location.state.mobile;
    var bookingdate = location.state.bookingdate;
    var name = location.state.name;
    var totalseats = location.state.totalseats;
    var seatnames = location.state.seatnames;
    var moviename = location.state.moviename;
    var ticketcost = location.state.ticketcost;
    var foodname = location.state.foodname;
    var total = location.state.total;
    var username = location.state.username;

    

    const downloadTicket = () => {
        print('HANU-CINEMAS', 'booking-pdf');
    }
    const returnHome = () => {
        history.push({ pathname: "/homepage", 
        state: { profile: profile, name: name, email: email, password: password, mobile: mobile }})
    }

    useEffect(() => {
        // $(".booking-pdf").hide();
    }, [])

    return (
        <div>

            <br />
            <div className="booking-pdf" style={{color:'white'}} >
                <Preview id={'booking-pdf'} >
                <h1 style={{ marginLeft: "30%" }}>HANU CINEMAS</h1>
                    <p style={{ marginLeft: "30%" }}>Booking Date : {bookingdate}</p>
                    <p style={{ marginLeft: "30%" }}>Ticket Booked By : {username}</p>
                    <p style={{ marginLeft: "30%" }}>Total seat : {totalseats}</p>
                    <p style={{ marginLeft: "30%" }}>Seat Number : {seatnames}</p>
                    <p style={{ marginLeft: "30%" }}>Movie Name : {moviename}</p>
                    <p style={{ marginLeft: "30%" }}>Ordered Item: {foodname}</p>
                    <p style={{ marginLeft: "30%" }}>Total Cost : {ticketcost * totalseats + total}$</p>
                </Preview>
            </div>
            <br />
            <button style={{ marginLeft: "27%" }} onClick={downloadTicket}>Download Ticket</button>
            <br /><br />
            <button style={{ marginLeft: "27%" }} onClick={returnHome}>Return To Home</button>
        </div>
    )
}
