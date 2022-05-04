import React, { useState,useEffect } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import fire from '../files/firebase';



export const OrderItem = () => {
    const history = useHistory();
    const location = useLocation();
    const profile = location.state.profile;
    const name = location.state.name;
    const email = location.state.email;
    const password = location.state.password;
    const mobile = location.state.mobile;
    var moviename = location.state.moviename;
    var bookingdate = location.state.bookingdate;
    var ticketcost = location.state.ticketcost;
    var foodname = location.state.foodname;
    var total = location.state.total;
    const totalseats = location.state.totalseats;
    const seatnames = location.state.seatnames;
    const username = location.state.username;
    
  
    const [fooddata, setfooddata] = useState([]);

    var allfoodorder = []; 

       

    useEffect(() => {
        fire.firestore().collection("fooddata").get().then((snapshot) => {
            snapshot.forEach(doc => {
                var data = doc.data();
                //console.log(data);
                setfooddata(arr => [...arr, { data: data }])

            })
        })
    }, [])

    const ready = () => {
        var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', handleAddToCart)
    }
    }
    const handleAddToCart = (e) => {
        var button = e.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        addItemToCart(title, price)
        updateCartTotal()
    }
    const addItemToCart = (title, price) => {

        allfoodorder.push(title)
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

    }
    const removeCartItem = (e) =>{
        var buttonClicked = e.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    }
    const quantityChanged = (e) => {
        var input = e.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }
    var gettotal = '';
    const updateCartTotal = (total) => {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0;
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        gettotal = parseInt(total);
    
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
        

    }
    const purchaseClicked = () => {
        fire.firestore().collection('foodorder').add( {
            foodname : allfoodorder,
            total: gettotal
            
        })
        console.log(gettotal);
        history.push({ pathname: "/success", state: { profile: profile,name: name, email: email, password: password, mobile: mobile, bookingdate: bookingdate
            , totalseats: totalseats, seatnames: seatnames, username: username, moviename: moviename, ticketcost: ticketcost, foodname: allfoodorder, total: gettotal} })
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
                            <Link to={{ pathname: "/homepage", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, bookingdate: bookingdate
            , totalseats: totalseats, seatnames: seatnames,  moviename: moviename, ticketcost: ticketcost, foodname: foodname, total: gettotal } }} className="nav-link">
                                <i className="material-icons">home</i>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={{ pathname: "/dashboard", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, bookingdate: bookingdate
            , totalseats: totalseats, seatnames: seatnames,  moviename: moviename, ticketcost: ticketcost, foodname: foodname, total: gettotal } }} className="nav-link">
                                <i className="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/bookings", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, bookingdate: bookingdate
            , totalseats: totalseats, seatnames: seatnames, moviename: moviename, ticketcost: ticketcost, foodname: foodname, total: gettotal } }} className="nav-link">
                                <i className="material-icons">content_paste</i>
                                <p>History</p>
                            </Link>
                        </li>
                        <li className="nav-item ">
                            <Link to={{ pathname: "/userprofile", state: { profile: profile, name: name, email: email, password: password, mobile: mobile, bookingdate: bookingdate
            , totalseats: totalseats, seatnames: seatnames,  moviename: moviename, ticketcost: ticketcost, foodname: foodname, total: gettotal } }} className="nav-link">
                                <i className="material-icons">person</i>
                                <p>User Profile</p>
                            </Link>
                        </li>
                        <li className="nav-item active">
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
            <header>
            <h1 class="title">Choose Item You Want </h1>
            </header>
            
            <div class="shop-items"> {
                fooddata.map((data, index) => {
                return <div class="shop-item">
                    <span class="shop-item-title">{data.data.foodname}</span>
                    <img class="shop-item-image" src={data.data.image} style={{ width: '15rem', height: '15rem' }} />
                    <div class="shop-item-details">
                        <span class="shop-item-price">{data.data.foodprice}$</span>
                        <button class="btn-add-cart shop-item-button" onClick={ready}>ADD TO CART</button>
                    </div>
 
            </div>
                })
            }
            </div>
            
            <div className="container-cart" style={{marginLeft: '280px'}}>
                    <h2 class="section-header">CART</h2>
            <div class="cart-row">
                <span class="cart-item cart-header cart-column">ITEM</span>
                <span class="cart-price cart-header cart-column">PRICE</span>
                <span class="cart-quantity cart-header cart-column">QUANTITY</span>
            </div>
            <div class="cart-items">
                
            </div>
            <div class="cart-total">
                <strong class="cart-total-title">Total</strong>
                <span class="cart-total-price">$0</span>
            </div>
            <button class="btn-purchase" onClick={purchaseClicked}>PURCHASE</button>
            </div>  
        </div>
        

        </div>
    )
}
