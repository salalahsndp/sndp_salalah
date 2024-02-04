import React, { useState } from "react";
import "./members.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import PrintIcon from "@mui/icons-material/Print";
import { exportToCSV } from "../../services/exportToExcel";

export default function Members() {
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&": {
      cursor: "pointer",
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

  const [branch, setBranch] = useState("all");

  let onSelectBranch = (e) => {
    console.log(e)
    console.log(e.target.value)
    setBranch(e.target.value);
  };

  let memberDummy = {
    name: "David John",
    profession: "Docotor",
    watsapp: "+91 9995175109",
    email: "davidjohn@gmail.com",
    maritalStatus: "single",
    bloodGroup: "B+",
    shakha: "shakha 1",
  };
  let rows = [memberDummy, memberDummy, memberDummy, memberDummy, memberDummy];

  return (
    <div className="members">
      <h2>Members</h2>

      <div className="utilities">
        <div className="sort-btn">
          <FormControl size="small" style={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label-2">Shakha</InputLabel>
            <Select
              labelId="demo-simple-select-labe-2"
              label="Shakha"
              value={branch}
              onChange={onSelectBranch}
            >
              <MenuItem value={"all"}>
                All
              </MenuItem>
              <MenuItem value={"shakha 1"}>
                shakha 1
              </MenuItem>
              <MenuItem value={"shakha 2"}>
                shakha 2
              </MenuItem>
              <MenuItem value={"shakha 3"}>
                shakha 3
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="export">
          <PrintIcon
            style={{ color: "darkblue", cursor: "pointer" }}
            onClick={(e) => exportToCSV(rows, "members")}
          />
        </div>
      </div>

      <div className="all-members">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Code</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Profession</StyledTableCell>
                <StyledTableCell>Whatsapp</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Marital Status</StyledTableCell>
                <StyledTableCell>Blood Group</StyledTableCell>
                <StyledTableCell>Shakha</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.profession}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.watsapp}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.maritalStatus}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.bloodGroup}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.shakha}
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
