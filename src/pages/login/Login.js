// Importing axios for making HTTP requests
import axios from "axios";

// Importing useContext and useState hooks from React
import { useContext, useState } from "react";

// Importing useNavigate hook from react-router-dom to navigate between routes
import { useNavigate } from "react-router-dom";

// Importing AuthContext to manage authentication state
import { AuthContext } from "../../context/AuthContext";

// Importing CSS for the Login component
import "./Login.css";

// Defining the Login component
const Login = () => {
  // Defining a state variable 'credentials' with 'setCredentials' function to update it
  // Initial state has 'username' and 'password' set to undefined
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  // Extracting 'loading', 'error', and 'dispatch' from AuthContext using useContext hook
  const { loading, error, dispatch } = useContext(AuthContext);

  // Initializing useNavigate hook to navigate between routes
  const navigate = useNavigate();

  // Function to handle input changes and update the 'credentials' state
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Function to handle login button click
  const handleClick = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    dispatch({ type: "LOGIN_START" }); // Dispatches a LOGIN_START action to indicate login process has started
    try {
      // Sending a POST request to the login API endpoint with the credentials
      const res = await axios.post("https://thela-bookings-backend.onrender.com/api/auth/login", credentials);
      
      // Checking if the user is an admin
      if(res.data.isAdmin){
        // Dispatching LOGIN_SUCCESS action with user details if login is successful and user is admin
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/home"); // Navigating to the home page
      } else {
        // Dispatching LOGIN_FAILURE action if user is not admin
        dispatch({ type: "LOGIN_FAILURE", payload: { message: "You are not allowed!" } });
      }
    } catch (err) {
      // Dispatching LOGIN_FAILURE action if there is an error in the login process
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  // Returning the JSX for the Login component
  return (
    <div className="login">
      <div className="lContainer">
        {/* Username input field */}
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        {/* Password input field */}
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        {/* Login button, disabled if loading is true */}
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {/* Displaying error message if there is an error */}
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

// Exporting the Login component as the default export
export default Login;
