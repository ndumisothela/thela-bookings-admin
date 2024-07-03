import "./Table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
    product: "King Size Room",
      img: "https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&w=600",
      customer: "John Smith",
      date: "7 March",
      amount: 785,
      method: "Cash on arrival",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Doubel Bed Room",
      img: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600",
      customer: "Michael Doe",
      date: "30 March",
      amount: 900,
      method: "Online Booking",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Deluxe Room",
      img: "https://images.pexels.com/photos/1760901/pexels-photo-1760901.jpeg?auto=compress&cs=tinysrgb&w=600",
      customer: "John Smith",
      date: "9 March",
      amount: 35,
      method: "Cash on arrival",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Standard Room",
      img: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
      customer: "Jane Smith",
      date: "4 March",
      amount: 920,
      method: "Online booking",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Standard Room",
      img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online booking",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
