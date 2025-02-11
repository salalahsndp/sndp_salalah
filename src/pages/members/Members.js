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
import { toDateView } from "../../services/toDateView";

export default function Members() {
  const navigate = useNavigate();

  const [shakhas, setShakhas] = React.useState([]);
  let [searchModal, setSearchModal] = useState(false);

  useEffect(() => {
    let fetchMembers = async () => {
      let { data } = await api.get("members");
      setMembers(data);
      setFilteredMembers(data);
      setSearchedMembers(data);
    };

    let fetchBranches = async () => {
      let { data } = await api.get("shakhas");
      setShakhas(data);
    };

    fetchMembers();
    fetchBranches();
  }, []);

  const [members, setMembers] = React.useState([]);
  const [filteredMembers, setFilteredMembers] = React.useState([]);
  const [searchedMembers, setSearchedMembers] = React.useState([]);



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
      result = result.filter((item) =>
        item.member_code.includes(formData.member_id.toString())
      );

    }
    if (formData.name) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(formData.name.toLowerCase()));
    }
    if (formData.phone) {
      result = result.filter((item) =>
        item.WhatsApp_no.toLowerCase().includes(formData.phone.toLowerCase())
      );
    }
    setSearchedMembers(result);
    // console.log(result);
  };

  let clearSearch = () => {
    setSearchedMembers(filteredMembers);
  };

  let onExport = (e) => {
    let excelMembers;
    excelMembers = filteredMembers.map((item) => {
      return {
        MEMBER_ID: item.member_code,
        NAME: item.name,
        PROFESSION: item.profession,
        SHAKHA: item.shakha,
        EXPIRY: toDateView(item.expiry),
        WHATSAPP: item.WhatsApp_no,
        DOB: toDateView(item.DOB),
        GSM_NO: item.GSM_no,
        EMAIL_ID: item.email_id,
        ADDRESS_IN_INDIA: item.address_in_India,
        TELEPHONE_NO: item.tel_no,
        BLOOD_GROUP: item.blood_group,
        MARITAL_STATUS: item.family_status,
        RESIDENTIAL_AREA: item.residential_area,
        PASSPORT_NO: item.passport_no,
        CIVIL_ID_NO: item.civil_id_no,
        FAMILY_RESIDING_IN_OMAN: item.is_family_residing_in_Oman,
        SHAKHA_INDIA: item.shakha_india,
        UNION: item.union,
        DISTRICT: item.district,
        RECEIVED_ON: toDateView(item.received_on),
        SUBMITTED_BY: item.submitted_by,
        CHECKED_BY: item.checked_by,
        APPROVED_BY: item.approved_by,
        APPLICATION_NO: item.application_no,
        PRESIDENT: item.president,
        SECRETARY: item.secretary,
      };
    });
    exportToCSV(excelMembers, "members");
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
              onClick={onExport}
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
                  <StyledTableCell>Whatsapp</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Marital Status</StyledTableCell>
                  <StyledTableCell>Expiry</StyledTableCell>
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
                      {item.WhatsApp_no}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.email_id}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.family_status}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {toDateView(item.expiry)}
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
