import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router';
import fire from '../files/firebase';
import '../movie_details.css';

export const FoodUpload = () => {
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const password = location.state.password;
    const name = location.state.name;
    const mobile = location.state.mobile;
    const email = location.state.email;
    const foodname = location.state.foodname;
    const foodprice = location.state.foodprice;
    const image= location.state.image;
    const [imagee, setimage] = useState('');
    const [foodnamee, setfoodname] = useState('');
    const [foodtcostt, setfoodcost] = useState('');

   
const FoodUpload = (e) => {
        e.preventDefault();
        if (imagee === "" || foodnamee === "" || foodtcostt === "") {
            alert("please fill all fields");
        } else {
            fire.firestore().collection("fooddata").add({
                image: imagee,
                foodname: foodnamee,
                foodprice: foodtcostt,    
            }).then(() => {
                alert("Item Added Successfully");
                setimage('');
                setfoodname('');
                setfoodcost('');
            }).then(() =>{
                history.push({ pathname: "/listitem" ,  state: { name: name, profile: profile, email: email, password: password, mobile: mobile, foodname: foodname, foodprice: foodprice, image: image}  })
            })
            .catch((err) => console.log(err))
        }
    }
    return (
                     <div className="main-panel">
                    <div class="form-container sign-in-container" style={{ height: 'auto', left: '0', width: 'max-content', zIndex: 2, marginLeft: '33%', marginTop: '9%' }}>
                        <form className="upload-form" style={{ background: '#f6f5f7', marginLeft: "-50%", marginTop: "inherit" }}>
                            <h2 className="upload-font" style={{ fontWeight: "bold", color:'black' }}>Upload Food and Beverage</h2>
                            <br />
                            <input type="text" placeholder="Food image url" value={imagee} onChange={(e) => setimage(e.target.value)} />
                            <input type="text" placeholder="Food or Beverage name" value={foodnamee} onChange={(e) => setfoodname(e.target.value)} />
                            <input type="text" placeholder="Food or Beverage price" value={foodtcostt} onChange={(e) => setfoodcost(e.target.value)} />
                
                            <input type="button" style={{ background: "#730307", color: "white" }} value="Upload " onClick={FoodUpload} />
                        </form>
                    </div>
                </div>
            
    )
}