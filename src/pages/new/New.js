// Importing CSS for styling the New component
import "./New.css";

// Importing Sidebar and Navbar components
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

// Importing an icon from Material UI for the file upload button
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

// Importing useState hook from React for state management
import { useState } from "react";

// Importing axios for making HTTP requests
import axios from "axios";

// Defining the New component, which receives inputs as a prop
const New = ({ inputs }) => {
  // Defining state for the selected file
  const [file, setFile] = useState("");
  // Defining state for user information
  const [info, setInfo] = useState({});

  // Handler function for input changes to update user information state
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handler function for form submission
  const handleClick = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    // Creating a new FormData object to handle file upload
    const data = new FormData();
    data.append("file", file); // Appending the selected file to the FormData
    data.append("upload_preset", "upload"); // Appending a preset value required by Cloudinary

    try {
      // Sending a POST request to upload the file to Cloudinary
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/drbpzlrjs/image/demo/upload",
        data
      );

      // Extracting the URL of the uploaded image from the response
      const { url } = uploadRes.data;

      // Creating a new user object with the provided information and the uploaded image URL
      const newUser = {
        ...info,
        img: url,
      };

      // Sending a POST request to create a new user
      await axios.post("https://thela-bookings-backend.onrender.com/api/auth/register", newUser);
    } catch (err) {
      // Logging any errors that occur during the process
      console.log(err);
    }
  };

  // Returning the JSX for the New component
  return (
    <div className="new">
      <Sidebar /> {/* Rendering the Sidebar component */}
      <div className="newContainer">
        <Navbar /> {/* Rendering the Navbar component */}
        <div className="top">
          <h1>Add New User</h1> {/* Heading for the page */}
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file) // Displaying the selected image
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" // Placeholder image if no file is selected
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> {/* File upload label with an icon */}
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])} // Updating the file state when a file is selected
                  style={{ display: "none" }} // Hiding the default file input
                />
              </div>

              {/* Rendering input fields for user information based on configuration */}
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}

              <button onClick={handleClick}>Send</button> {/* Submit button for the form */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the New component as the default export
export default New;
