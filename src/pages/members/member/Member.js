import React, { Fragment, useState } from "react";
import "./member.scss";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PrintIcon from "@mui/icons-material/Print";
import Button from "@mui/material/Button";
import MemberDeleteModal from "./member-delete-dialog/MemberDeleteModal";

export default function Member() {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#423f3f",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  let rows = ["shakha 1", "shakha 2", "shakha 3", "shakha 4", "shakha 5"];

  let [deleteModal, setDeleteModal] = useState(false);

  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="member">
        <h2>
          Member - <span className="member-code">{3654}</span>
        </h2>
        <div className="details">
          <div className="print-icon">
            <PrintIcon
              style={{ color: "darkblue", cursor: "pointer" }}
              // onClick={}
            />
          </div>
          <div className="photo"></div>
          <div className="row">
            <p>
              <span className="title">Application No: </span>APL-4567
            </p>
            <p>
              <span className="title">Name: </span>Arshad Danish
            </p>
            <p>
              <span className="title">Profession: </span>Software Engineer
            </p>
            <p>
              <span className="title">DOB: </span>23/10/2001
            </p>
            <p>
              <span className="title">GSM No: </span>1234567890
            </p>
            <p>
              <span className="title">Whatsapp: </span>+91 9995168885
            </p>
            <p>
              <span className="title">Blood Group: </span>B+
            </p>
            <p>
              <span className="title">Marital Status: </span>Yes
            </p>
            <p>
              <span className="title">Email ID: </span>johndaniel@gmail.com
            </p>
            <p>
              <span className="title">Residential Area: </span>Ramanagar Street
            </p>
            <p>
              <span className="title">Passport No: </span>7676767676
            </p>
            <p>
              <span className="title">Civil ID No: </span>987987987987
            </p>
            <p>
              <span className="title">Address in India: </span>Rose Villa,
              Ramanagar Street 1, Yercaud, Tamil Nadu - 680019
            </p>
            <p>
              <span className="title">Telephone No(India): </span>+91 9995194108
            </p>
            <p>
              <span className="title">Family residing in Oman: </span>Yes
            </p>
          </div>
          <h3 className="sndp-title">SNDP India Unit Details</h3>
          <div className="row">
            <p>
              <span className="title">Shakha: </span>Oman
            </p>
            <p>
              <span className="title">Union: </span>Oman
            </p>
            <p>
              <span className="title">District: </span>Oman
            </p>
          </div>
          <h3 className="family-title">Family Members</h3>
          <div className="family-table">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Relation</StyledTableCell>
                    <StyledTableCell>DOB</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <StyledTableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        John Daniel Bennett
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Son
                      </TableCell>
                      <TableCell component="th" scope="row">
                        23/10/2001
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <h3 className="office-title">Office Use</h3>
          <div className="row">
            <p>
              <span className="title">Recieved On: </span>APL-4567
            </p>
            <p>
              <span className="title">Submitted By: </span>23/10/2001
            </p>
            <p>
              <span className="title">Checked By: </span>1234567890
            </p>
            <p>
              <span className="title">Approved By: </span>+91 9995168885
            </p>
            <p>
              <span className="title">Card No: </span>1234567890
            </p>
            <p>
              <span className="title">President: </span>+91 9995168885
            </p>
            <p>
              <span className="title">Secretary: </span>1234567890
            </p>
            <p>
              <span className="title">Expiry: </span>1234567890
            </p>
          </div>
          <div className="action-buttons">
            <div className="edit-btn">
              <Button
                variant="contained"
                size="small"
                fullWidth
                style={{ textTransform: "none", fontSize: "1rem" }}
                onClick={() => navigate("/edit-member/23")}
              >
                Edit
              </Button>
            </div>
            <div className="delete-btn">
              <Button
                variant="contained"
                size="small"
                fullWidth
                color="error"
                style={{ textTransform: "none", fontSize: "1rem" }}
                onClick={() => setDeleteModal(true)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MemberDeleteModal
        show={deleteModal}
        closeModal={() => setDeleteModal(false)}
        member={"Arshad Danish"}
      />
    </Fragment>
  );
}
