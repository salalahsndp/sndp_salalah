import React, { Fragment, useRef, useState, useEffect } from "react";
import "./member.scss";
import { useNavigate, useParams } from "react-router-dom";

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
import { useReactToPrint } from "react-to-print";
import { IdCard } from "./id-card/IdCard";
import api from "../../../api";
import { toDateView } from "../../../services/toDateView";

export default function Member() {
  const { id } = useParams();

  useEffect(() => {
    fetchMember();
  }, []);

  const [member, setMember] = React.useState({});
  const [family, setFamily] = React.useState([]);

  let fetchMember = async () => {
    let { data } = await api.get("members/" + id);
    setMember(data.member);
    setFamily(data.familyMemberdetails);
  };

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

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let [deleteMember, setDeleteMember] = useState();
  let onDeleteClick = (item) => {
    setDeleteMember(item);
    setDeleteModal(true);
  };

  if (!member) return;

  return (
    <Fragment>
      <div className="member">
        <h2>
          Member - <span className="member-code">{member.member_code}</span>
        </h2>
        <div className="details">
          <div className="print-icon">
            <PrintIcon
              style={{ color: "darkblue", cursor: "pointer" }}
              onClick={handlePrint}
            />
          </div>

          <div style={{ display: "none" }}>
            <IdCard ref={componentRef} />
          </div>

          <div className="photo"></div>
          <div className="row">
            <p>
              <span className="title">Application No: </span>
              {member.application_no}
            </p>
            <p>
              <span className="title">Name: </span>
              {member.name}
            </p>
            <p>
              <span className="title">Profession: </span>
              {member.profession}
            </p>
            <p>
              <span className="title">DOB: </span>
              {toDateView(member.DOB)}
            </p>
            <p>
              <span className="title">GSM No: </span>
              {member.GSM_no}
            </p>
            <p>
              <span className="title">Whatsapp: </span>
              {member.WhatsApp_no}
            </p>
            <p>
              <span className="title">Blood Group: </span>
              {member.blood_group}
            </p>
            <p>
              <span className="title">Marital Status: </span>
              {member.family_status}
            </p>
            <p>
              <span className="title">Email ID: </span>
              {member.email_id}
            </p>
            <p>
              <span className="title">Residential Area: </span>
              {member.residential_area}
            </p>
            <p>
              <span className="title">Passport No: </span>
              {member.passport_no}
            </p>
            <p>
              <span className="title">Civil ID No: </span>
              {member.civil_id_no}
            </p>
            <p style={{ whiteSpace: "pre-line" }}>
              <span className="title">Address in India: </span>
              {member.address_in_India}
            </p>
            <p>
              <span className="title">Telephone No(India): </span>
              {member.tel_no}
            </p>
            <p>
              <span className="title">Family residing in Oman: </span>
              {member.is_family_residing_in_Oman ? "Yes" : "No"}
            </p>
          </div>
          <h3 className="sndp-title">SNDP India Unit Details</h3>
          <div className="row">
            <p>
              <span className="title">Shakha: </span>
              {member.shakha}
            </p>
            <p>
              <span className="title">Union: </span>
              {member.union}
            </p>
            <p>
              <span className="title">District: </span>
              {member.district}
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
                  {family.map((item, index) => (
                    <StyledTableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.family_member_name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.relation}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {toDateView(item.family_member_DOB)}
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
              <span className="title">Recieved On: </span>
              {toDateView(member.received_on)}
            </p>
            <p>
              <span className="title">Submitted By: </span>
              {member.submitted_by}
            </p>
            <p>
              <span className="title">Checked By: </span>
              {member.checked_by}
            </p>
            <p>
              <span className="title">Approved By: </span>
              {member.approved_by}
            </p>
            <p>
              <span className="title">Card No: </span>
              {member.card_no}
            </p>
            <p>
              <span className="title">President: </span>
              {member.president}
            </p>
            <p>
              <span className="title">Secretary: </span>
              {member.secretary}
            </p>
            <p>
              <span className="title">Expiry: </span>
              {toDateView(member.expiry)}
            </p>
          </div>
          <div className="action-buttons">
            <div className="edit-btn">
              <Button
                variant="contained"
                size="small"
                fullWidth
                style={{ textTransform: "none", fontSize: "1rem" }}
                onClick={() => navigate("/edit-member/" + id)}
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
                onClick={() => onDeleteClick(member)}
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
        member={deleteMember}
      />
    </Fragment>
  );
}
