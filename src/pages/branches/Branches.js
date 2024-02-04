import React, { useState } from "react";
import "./branches.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import EditBranchModal from "./edit-branch-modal/EditBranchModal";
import DeleteBranchModal from "./delete-branch-modal/DeleteBranchModal";

export default function Branches() {
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

  let [editModal, setEditModal] = useState(false);
  let [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className="branches">
      <h2>Shakhas</h2>

      <div className="add-branch">
        <div className="input-field">
          <TextField
            label="New Shakha"
            variant="outlined"
            size="small"
            fullWidth
          />
        </div>
        <div className="add-btn">
          <Button
            variant="contained"
            size="small"
            style={{ textTransform: "none", fontSize: "1rem" }}
            fullWidth
          >
            Add
          </Button>
        </div>
      </div>

      <div className="all-branches">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Sl No</StyledTableCell>
                <StyledTableCell>Shakha</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
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
                    {row}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditIcon
                      style={{
                        color: "darkblue",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                      }}
                      onClick={() => setEditModal(true)}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <DeleteIcon
                      style={{
                        color: "darkred",
                        cursor: "pointer",
                        fontSize: "1.25rem",
                      }}
                      onClick={() => setDeleteModal(true)}
                    />
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <EditBranchModal
        show={editModal}
        closeModal={() => setEditModal(false)}
      />
      <DeleteBranchModal
        show={deleteModal}
        closeModal={() => setDeleteModal(false)}
      />
    </div>
  );
}
