import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import api from "../../api";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import SearchMemberModal from "./search-member-modal/SearchMemberModal";

export default function Members() {
  const navigate = useNavigate();

  const [shakhas, setShakhas] = React.useState([]);
  let [searchModal, setSearchModal] = useState(false);

  let fetchBranches = async () => {
    let { data } = await api.get("shakhas");
    setShakhas(data);
  };

  useEffect(() => {
    fetchMembers();
    fetchBranches();
  }, []);

  const [members, setMembers] = React.useState([]);
  const [filteredMembers, setFilteredMembers] = React.useState([]);
  const [searchedMembers, setSearchedMembers] = React.useState([]);

  let fetchMembers = async () => {
    let { data } = await api.get("members");
    setMembers(data);
    setFilteredMembers(data);
    setSearchedMembers(data);
  };

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

  const findItemsByField = (arr, field, value) => {
    return arr.filter((item) => item[field] === value);
  };

  let onSelectBranch = (e) => {
    if (e.target.value !== "all") {
      const newFilteredMembers = findItemsByField(
        members,
        "shakha",
        e.target.value
      );
      setFilteredMembers(newFilteredMembers);
      setSearchedMembers(newFilteredMembers);
    } else {
      setFilteredMembers(members);
      setSearchedMembers(members);
    }
    setBranch(e.target.value);
  };

  let onMemberClick = (id) => {
    navigate("/members/" + id);
  };

  let onSearchClik = () => {
    setSearchModal(true);
  };

  let searchMembers = async (formData) => {
    let result = filteredMembers;
    if (formData.member_id) {
      result = result.filter((item) => {
        if (item.member_code.includes(formData.member_id.toString()))
          return item;
      });
    }
    if (formData.name) {
      result = result.filter((item) => {
        if (item.name.toLowerCase().includes(formData.name.toLowerCase()))
          return item;
      });
    }
    if (formData.phone) {
      result = result.filter((item) => {
        if (
          item.WhatsApp_no.toLowerCase().includes(formData.phone.toLowerCase())
        )
          return item;
      });
    }
    setSearchedMembers(result);
    // console.log(result);
  };

  let clearSearch = () => {
    setSearchedMembers(filteredMembers);
  };

  return (
    <>
      <div className="members">
        <h2>Members</h2>

        <div className="utilities">
          <div className="search">
            <PersonSearchIcon
              style={{
                color: "darkblue",
                cursor: "pointer",
                fontSize: "1.75rem",
              }}
              onClick={onSearchClik}
            />
          </div>
          <div className="sort-btn">
            <FormControl size="small" style={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label-2">Shakha</InputLabel>
              <Select
                labelId="demo-simple-select-labe-2"
                label="Shakha"
                value={branch}
                onChange={onSelectBranch}
              >
                <MenuItem value={"all"}>All</MenuItem>
                {shakhas.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.shakha_name}>
                      {item.shakha_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="export">
            <PrintIcon
              style={{ color: "darkblue", cursor: "pointer" }}
              onClick={(e) => exportToCSV(filteredMembers, "members")}
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
                {searchedMembers.map((item, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => onMemberClick(item._id)}
                  >
                    <TableCell component="th" scope="row">
                      {item.member_code}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.profession}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.WhatsApp_no}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.email_id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.family_status}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.blood_group}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.shakha}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <SearchMemberModal
        show={searchModal}
        closeModal={() => setSearchModal(false)}
        searchMembers={searchMembers}
        clearSearch={clearSearch}
        disabled={searchedMembers.length === filteredMembers.length}
      />
    </>
  );
}
