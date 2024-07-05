// Importing CSS for styling the NewHotel component
import "./NewHotel.css";

// Importing Sidebar and Navbar components
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

// Importing an icon from Material UI for the file upload button
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

// Importing useState hook from React for state management
import { useState } from "react";

// Importing hotel input fields configuration from a local source
import { hotelInputs } from "../../formSource";

// Importing a custom hook for data fetching
import useFetch from "../../hooks/useFetch";

// Importing axios for making HTTP requests
import axios from "axios";

// Defining the NewHotel component
const NewHotel = () => {
  // Defining state for file uploads
  const [files, setFiles] = useState("");
  // Defining state for hotel information
  const [info, setInfo] = useState({});
  // Defining state for selected room IDs
  const [rooms, setRooms] = useState([]);

  // Fetching available rooms using a custom hook
  const { data, loading, error } = useFetch("https://thela-bookings-backend.onrender.com/rooms");

  // Handler function for input changes to update hotel information state
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handler function for selecting multiple rooms
  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setRooms(value);
  };

  // Handler function for form submission
  const handleClick = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      // Uploading multiple files and getting their URLs
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/drbpzlrjs/image/demo/upload", data
          );
          const { url } = uploadRes.data;
          return url;
        })
      );
      // Creating a new hotel object with the provided information, selected rooms, and uploaded photos
      const newHotel = {
        ...info, rooms, photos: list
      };
      // Sending a POST request to create a new hotel
      await axios.post("https://thela-bookings-backend.onrender.com/api/hotels", newHotel);
    } catch (err) {
      console.error("Error creating hotel", err);
    }
  };

  // Returning the JSX for the NewHotel component
  return (
    <div className="new">
      <Sidebar /> {/* Rendering the Sidebar component */}
      <div className="newContainer">
        <Navbar /> {/* Rendering the Navbar component */}
        <div className="top">
          <h1>Add New Hotel</h1> {/* Heading for the page */}
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            /> {/* Displaying the selected image or a placeholder */}
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
                  onChange={(e) => setFiles(e.target.files[0])}
                  style={{ display: "none" }}
                /> {/* Hidden file input field */}
              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))} {/* Rendering input fields for hotel information based on configuration */}

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select> {/* Dropdown for selecting if the hotel is featured */}
              </div>

              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading ? "loading" : data && data.map(room => (
                    <option key={room._id} value={room._id}>{room.title}</option>
                  ))} {/* Multi-select dropdown for available rooms */}
                </select>
              </div>

              <button onClick={handleClick}>Send</button> {/* Submit button for the form */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the NewHotel component as the default export
export default NewHotel;
