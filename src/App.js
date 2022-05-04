import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './pages/signup';
import { Home } from './pages/home';
import { Homepage } from './components/home';
import { Dashboard } from './components/dashboard';
import { Userprofile } from './components/user_profile';
import { Booking } from './components/booking';
import { Ticketbookingform } from './pages/ticket_booking_form';
import { Bookingform } from './pages/booking_form';
import { Movieupload } from './admin/movie_upload';
import { OrderItem } from './pages/order_item';
import { MovieDetails } from './pages/movie_details';
import { Successresponse } from './response/success_response';
import { Adminpage } from './admin/admin_page';
import { ListItem } from './admin/list_item';
import { Adminprofile } from './admin/admin_profile';
import { ManageStaff } from './admin/manage_staff';
import { FoodUpload} from './pages/food_upload';

function App() {


  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/homepage">
            <Homepage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/bookings">
            <Booking />
          </Route>
          <Route exact path="/userprofile"  >
            <Userprofile />
          </Route>
          <Route exact path="/orderitem">
            <OrderItem />
          </Route>
          <Route exact path="/bookingform">
            <Bookingform />
          </Route>
          <Route exact path="/pickseat">
            <Ticketbookingform />
          </Route>
          <Route exact path="/movieupload">
            <Movieupload />
          </Route>
          <Route exact path="/details">
            <MovieDetails />
          </Route>
          <Route exact path="/success">
            <Successresponse />
          </Route>
          <Route exact path="/adminpage">
            <Adminpage />
          </Route>
          <Route exact path="/listitem">
            <ListItem />
          </Route>
          <Route exact path="/adminprofile">
            <Adminprofile />
          </Route>
          <Route exact path="/liststaff">
            <ManageStaff />
          </Route>
          <Route exact path= "/foodupload">
            <FoodUpload />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
