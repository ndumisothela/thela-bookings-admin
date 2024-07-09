// Import the CSS file for styling the DataTable component
import "./Datatable.css";
import loader from "../Assets/loader.gif";

// Import the DataGrid component from the MUI library
import { DataGrid } from "@mui/x-data-grid";
//import {userColumn, userRows} from "../../datatablesource"

// Import Link and useLocation from react-router-dom for navigation
import { Link, useLocation } from "react-router-dom";

// Import useState and useEffect hooks from React for managing state and side effects
import { useState, useEffect, useContext } from "react";

// Import a custom hook useFetch for data fetching
import useFetch from "../../hooks/useFetch";

// Import axios for making HTTP requests
import axios from "axios";

// Import AuthContext to get authentication details
import { AuthContext } from "../../context/AuthContext";

// Define the Datatable component, which accepts columns as a prop
const Datatable = ({ columns }) => {
  // Get the current location object
  const location = useLocation();

  // Extract the path from the URL and split it to get the first segment
  const path = location.pathname.split("/")[1];

  // Initialize state to hold the list of data items
  const [list, setList] = useState([]);

  // Get the auth context to access user and token
  const { user } = useContext(AuthContext);

  // Destructure data, loading, and error from the useFetch hook
  // Fetch data based on the current path
  const { data, loading, error } = useFetch(`https://thela-bookings-backend.onrender.com/api/${path}`, {
    headers: { Authorization: `Bearer ${user?.token}` }
  });

  // Use useEffect to update the list state whenever the fetched data changes
  useEffect(() => {
    setList(data);
  }, [data]);

  // Define a function to handle deleting an item by its ID
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to the server to delete the item
      await axios.delete(`https://thela-bookings-backend.onrender.com/api/${path}/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      // Update the list state to remove the deleted item
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      // Log any error that occurs during the deletion process
      console.error("Failed to delete the item:", err);
    }
  };

  // Define the action column to include view and delete actions
  const actionColumn = [
    {
      // Specify the field name for the action column
      field: "action",
      // Set the header name for the action column
      headerName: "Action",
      // Set the width of the action column
      width: 200,
      // Define a renderCell function to render custom cell content
      renderCell: (params) => {
        return (
          // Create a container for the cell actions
          <div className="cellAction">
            {/* Link to the view page for the specific item */}
            <Link to={`/users/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {/* Create a delete button and attach the handleDelete function */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  // Return a loading indicator if the data is still being fetched
  if (loading) {
    return <div><img src={loader} alt="Loading..." /></div>;
  }

  // Return an error message if there was an error fetching data
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Return the main component UI
  return (
    <div className="datatable">
      {/* Display the title and an add new item link */}
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {/* Render the DataGrid with the fetched data and columns */}
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

// Export the Datatable component as the default export
export default Datatable;
