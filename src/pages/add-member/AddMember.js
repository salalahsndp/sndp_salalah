import React, { useState } from "react";
import "./add-member.scss";

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

export default function AddMember() {
  const [familyMembersCount, setFamilyMembersCount] = useState(0);

  const addFamilyMember = () => {
    setFamilyMembersCount(familyMembersCount + 1);
  };

  const removeFamilyMember = () => {
    if (familyMembersCount === 0) return;
    setFamilyMembersCount(familyMembersCount - 1);
  };

  return (
    <div className="add-member">
      <h2>
        Add Member
        {/* <span className="application-no">{generateApplicationNo()}</span> */}
      </h2>
      <div className="form">
        <div className="left">
          <TextField
            id="outlined-basic"
            label="Application No"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Profession"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Whatsapp No"
            variant="outlined"
            size="small"
            fullWidth
          />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">
              Marital Status
            </InputLabel>
            <Select labelId="demo-simple-select-label" label="Marital Status">
              <MenuItem value={10}>Married</MenuItem>
              <MenuItem value={20}>Single</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Residentail Area"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Civil ID No"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Photo"
            variant="outlined"
            size="small"
            type="file"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Address In India"
            multiline={true}
            rows={2}
            variant="outlined"
            size="small"
            fullWidth
          />
        </div>
        <div className="right">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="DOB"
            variant="outlined"
            size="small"
            type="Date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="GSM No"
            variant="outlined"
            size="small"
            fullWidth
          />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label-2">Blood Group</InputLabel>
            <Select labelId="demo-simple-select-labe-2" label="Blood Group">
              <MenuItem value={10}>A+</MenuItem>
              <MenuItem value={20}>B+</MenuItem>
              <MenuItem value={30}>AB+</MenuItem>
              <MenuItem value={10}>A-</MenuItem>
              <MenuItem value={20}>B-</MenuItem>
              <MenuItem value={30}>AB-</MenuItem>
              <MenuItem value={30}>O+</MenuItem>
              <MenuItem value={30}>O-</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            size="small"
            type="email"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Passport No"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Telephone No(India)"
            variant="outlined"
            size="small"
            fullWidth
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Family residing in Oman
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
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
            <Select labelId="demo-simple-select-label" label="Shakha">
              <MenuItem value={10}>Shakha 1</MenuItem>
              <MenuItem value={20}>Shakha 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">District</InputLabel>
            <Select labelId="demo-simple-select-label" label="District">
              <MenuItem value={20}>Alappuzha</MenuItem>
              <MenuItem value={20}>Ernakulam</MenuItem>
              <MenuItem value={20}>Idukki</MenuItem>
              <MenuItem value={20}>Kannur</MenuItem>
              <MenuItem value={10}>Kasaragod</MenuItem>
              <MenuItem value={20}>Kollam</MenuItem>
              <MenuItem value={20}>Kottayam</MenuItem>
              <MenuItem value={20}>Kozhikode</MenuItem>
              <MenuItem value={20}>Malappuram</MenuItem>
              <MenuItem value={20}>Palakkad</MenuItem>
              <MenuItem value={20}>Pathanamthitta</MenuItem>
              <MenuItem value={20}>Thiruvananthapuram</MenuItem>
              <MenuItem value={20}>Thrissur</MenuItem>
              <MenuItem value={20}>Wayanad</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="right">
          <TextField
            id="outlined-basic"
            label="Union"
            variant="outlined"
            size="small"
            fullWidth
          />
        </div>
      </div>

      <p className="add-family">Add Family Members:</p>
      <div className="form-family">
        {[...Array(familyMembersCount)].map((item, index) => {
          return (
            <div className="row">
              <div className="item">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </div>
              <div className="item">
                <TextField
                  id="outlined-basic"
                  label="Relation"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </div>
              <div className="item">
                <TextField
                  id="outlined-basic"
                  label="DOB"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
              style={{ color: "darkred", cursor: "pointer", fontSize: "2rem" }}
              onClick={removeFamilyMember}
            />
          </div>
        </div>
      </div>

      <p className="office-use">For Office Use:</p>
      <div className="form">
        <div className="left">
          <TextField
            id="outlined-basic"
            label="Recieved on"
            type="date"
            variant="outlined"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Checked By"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Card No"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="President"
            variant="outlined"
            size="small"
            fullWidth
          />
        </div>
        <div className="right">
          <TextField
            id="outlined-basic"
            label="Submitted By"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Approved By"
            variant="outlined"
            size="small"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="Expiry"
            variant="outlined"
            size="small"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Secretary"
            variant="outlined"
            size="small"
            fullWidth
          />
        </div>
      </div>

      <div className="submit-btn">
        <Button
          variant="contained"
          fullWidth
          style={{ textTransform: "none", fontSize: "1rem" }}
        >
          Add Member
        </Button>
      </div>
    </div>
  );
}
