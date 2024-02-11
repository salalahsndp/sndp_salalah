import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./edit-member.scss";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Button from "@mui/material/Button";
import api from "../../../api";
import { toDateView } from "../../../services/toDateView";

export default function EditMember() {
  const { id } = useParams();

  useEffect(() => {
    fetcMember();
    fetchBranches();
  }, []);

  const [member, setMember] = React.useState({});
  const [family, setFamily] = React.useState([]);
  const [shakhas, setShakhas] = React.useState([]);

  let fetcMember = async () => {
    let { data } = await api.get("members/" + id);
    setMember(data.member);
    setFamily(data.familyMemberdetails);
  };

  let fetchBranches = async () => {
    let { data } = await api.get("shakhas");
    setShakhas(data);
  };

  const [familyMembersCount, setFamilyMembersCount] = useState(0);
  const [familyFormData, setFamilyFormData] = useState([]);

  useEffect(() => {
    setFormData(member);
  }, [member]);

  useEffect(() => {
    setFamilyMembersCount(family.length);
    setFamilyFormData(family);
  }, [family]);

  const handleFamilyChange = (index, event) => {
    const { name, value } = event.target;
    const newFormData = [...familyFormData];
    newFormData[index][name] = value;
    setFamilyFormData(newFormData);
  };

  const addFamilyMember = () => {
    setFamilyMembersCount(familyMembersCount + 1);
    setFamilyFormData([
      ...familyFormData,
      { family_member_name: "", relation: "", family_member_DOB: "" },
    ]);
  };

  const removeFamilyMember = () => {
    if (familyMembersCount === 0) return;
    const newFormData = [...familyFormData];
    newFormData.splice(familyMembersCount - 1, 1);
    setFamilyFormData(newFormData);
    setFamilyMembersCount(familyMembersCount - 1);
  };

  let [formData, setFormData] = useState({});
  const [submitBtn, setSubmitBtn] = useState(0);
  let onInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let onFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn(1);
    await api.patch(`members/${id}`, {
      ...formData,
      family_members: familyFormData,
    });
    window.location.reload();
  };

  if (!formData.name) return;

  return (
    <form onSubmit={onFormSubmit}>
      <div className="edit-member">
        <h2>
          Edit Member -
          <span className="member-code">&nbsp;{member.member_code}</span>
        </h2>
        <div className="form">
          <div className="left">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Application No"
              variant="outlined"
              size="small"
              fullWidth
              name="application_no"
              onChange={onInputChange}
              value={formData.application_no}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Profession"
              variant="outlined"
              size="small"
              fullWidth
              name="profession"
              onChange={onInputChange}
              value={formData.profession}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Whatsapp No"
              variant="outlined"
              size="small"
              fullWidth
              name="WhatsApp_no"
              onChange={onInputChange}
              value={formData.WhatsApp_no}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">
                Marital Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Marital Status"
                name="family_status"
                onChange={onInputChange}
                value={formData.family_status}
              >
                <MenuItem value={"Married"}>Married</MenuItem>
                <MenuItem value={"Single"}>Single</MenuItem>
              </Select>
            </FormControl>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Residentail Area"
              variant="outlined"
              size="small"
              fullWidth
              name="residential_area"
              onChange={onInputChange}
              value={formData.residential_area}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Civil ID No"
              variant="outlined"
              size="small"
              fullWidth
              name="civil_id_no"
              onChange={onInputChange}
              value={formData.civil_id_no}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Photo"
              variant="outlined"
              size="small"
              type="file"
              fullWidth
              //
              name="photo"
              onChange={onInputChange}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Address In India"
              multiline={true}
              rows={2}
              variant="outlined"
              size="small"
              fullWidth
              name="address_in_India"
              onChange={onInputChange}
              value={formData.address_in_India}
            />
          </div>
          <div className="right">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              fullWidth
              name="name"
              onChange={onInputChange}
              value={formData.name}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="DOB"
              variant="outlined"
              size="small"
              type="Date"
              fullWidth
              name="DOB"
              onChange={onInputChange}
              value={toDateView(formData.DOB)}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="GSM No"
              variant="outlined"
              size="small"
              fullWidth
              name="GSM_no"
              onChange={onInputChange}
              value={formData.GSM_no}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label-2">
                Blood Group
              </InputLabel>
              <Select
                labelId="demo-simple-select-labe-2"
                label="Blood Group"
                name="blood_group"
                onChange={onInputChange}
                value={formData.blood_group}
              >
                <MenuItem value={"A+"}>A+</MenuItem>
                <MenuItem value={"B+"}>B+</MenuItem>
                <MenuItem value={"AB+"}>AB+</MenuItem>
                <MenuItem value={"A-"}>A-</MenuItem>
                <MenuItem value={"B-"}>B-</MenuItem>
                <MenuItem value={"AB-"}>AB-</MenuItem>
                <MenuItem value={"O+"}>O+</MenuItem>
                <MenuItem value={"O-"}>O-</MenuItem>
              </Select>
            </FormControl>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              size="small"
              type="email"
              fullWidth
              name="email_id"
              onChange={onInputChange}
              value={formData.email_id}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Passport No"
              variant="outlined"
              size="small"
              fullWidth
              name="passport_no"
              onChange={onInputChange}
              value={formData.passport_no}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Telephone No(India)"
              variant="outlined"
              size="small"
              fullWidth
              name="tel_no"
              onChange={onInputChange}
              value={formData.tel_no}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Family residing in Oman
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="is_family_residing_in_Oman"
                onChange={onInputChange}
                value={formData.is_family_residing_in_Oman}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="normal" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="normal" />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <p className="sndp-unit">SNDP India Unit Details:</p>
        <div className="form">
          <div className="left">
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Shakha</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Shakha"
                name="shakha"
                onChange={onInputChange}
                value={formData.shakha}
              >
                {shakhas.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.shakha_name}>
                      {item.shakha_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="District"
                name="district"
                onChange={onInputChange}
                value={formData.district}
              >
                <MenuItem value={"Alappuzha"}>Alappuzha</MenuItem>
                <MenuItem value={"Ernakulam"}>Ernakulam</MenuItem>
                <MenuItem value={"Idukki"}>Idukki</MenuItem>
                <MenuItem value={"Kannur"}>Kannur</MenuItem>
                <MenuItem value={"Kasaragod"}>Kasaragod</MenuItem>
                <MenuItem value={"Kollam"}>Kollam</MenuItem>
                <MenuItem value={"Kottayam"}>Kottayam</MenuItem>
                <MenuItem value={"Kozhikode"}>Kozhikode</MenuItem>
                <MenuItem value={"Malappuram"}>Malappuram</MenuItem>
                <MenuItem value={"Palakkad"}>Palakkad</MenuItem>
                <MenuItem value={"Pathanamthitta"}>Pathanamthitta</MenuItem>
                <MenuItem value={"Thiruvananthapuram"}>
                  Thiruvananthapuram
                </MenuItem>
                <MenuItem value={"Thrissur"}>Thrissur</MenuItem>
                <MenuItem value={"Wayanad"}>Wayanad</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="right">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Union"
              variant="outlined"
              size="small"
              fullWidth
              name="union"
              onChange={onInputChange}
              value={formData.union}
            />
          </div>
        </div>

        <p className="add-family">Edit Family Members:</p>
        <div className="form-family">
          {familyFormData.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="item">
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name="family_member_name"
                    onChange={(e) => handleFamilyChange(index, e)}
                    value={item.family_member_name}
                  />
                </div>
                <div className="item">
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-basic"
                    label="Relation"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name="relation"
                    onChange={(e) => handleFamilyChange(index, e)}
                    value={item.relation}
                  />
                </div>
                <div className="item">
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-basic"
                    label="DOB"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    name="family_member_DOB"
                    type="date"
                    onChange={(e) => handleFamilyChange(index, e)}
                    value={item.family_member_DOB}
                  />
                </div>
              </div>
            );
          })}
          <div className="action-icons">
            <div className="add-icon">
              <PersonAddAlt1Icon
                style={{
                  color: "darkgreen",
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
                onClick={addFamilyMember}
              />
            </div>
            <div className="remove-icon">
              <PersonRemoveIcon
                style={{
                  color: "darkred",
                  cursor: "pointer",
                  fontSize: "2rem",
                }}
                onClick={removeFamilyMember}
              />
            </div>
          </div>
        </div>

        <p className="office-use">For Office Use:</p>
        <div className="form">
          <div className="left">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Recieved on"
              type="date"
              variant="outlined"
              size="small"
              fullWidth
              name="received_on"
              onChange={onInputChange}
              value={formData.received_on}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Checked By"
              variant="outlined"
              size="small"
              fullWidth
              name="checked_by"
              onChange={onInputChange}
              value={formData.checked_by}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Card No"
              variant="outlined"
              size="small"
              fullWidth
              name="card_no"
              onChange={onInputChange}
              value={formData.card_no}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="President"
              variant="outlined"
              size="small"
              fullWidth
              name="president"
              onChange={onInputChange}
              value={formData.president}
            />
          </div>
          <div className="right">
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Submitted By"
              variant="outlined"
              size="small"
              fullWidth
              name="submitted_by"
              onChange={onInputChange}
              value={formData.submitted_by}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Approved By"
              variant="outlined"
              size="small"
              fullWidth
              name="approved_by"
              onChange={onInputChange}
              value={formData.approved_by}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Expiry"
              variant="outlined"
              size="small"
              fullWidth
              type="date"
              name="expiry"
              onChange={onInputChange}
              value={formData.expiry}
            />
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined-basic"
              label="Secretary"
              variant="outlined"
              size="small"
              fullWidth
              name="secretary"
              onChange={onInputChange}
              value={formData.secretary}
            />
          </div>
        </div>

        <div className="submit-btn">
          <Button
            variant="contained"
            fullWidth
            style={{ textTransform: "none", fontSize: "1rem" }}
            type="submit"
          >
            {submitBtn ? "Updating..." : "Update Member"}
          </Button>
        </div>
      </div>
    </form>
  );
}
