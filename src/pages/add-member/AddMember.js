import React from "react";
import "./add-member.scss";
import { generateApplicationNo } from "../../services/ApplicationNumber";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";

export default function AddMember() {
  return (
    <div className="add-member">
      <h2>
        <span className="application-no">{generateApplicationNo()}</span>
      </h2>
      <div className="form">
        <div className="left">
          <TextField
            id="outlined-basic"
            label="Application No"
            variant="outlined"
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="Profession"
            variant="outlined"
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="Whatsapp No"
            variant="outlined"
            size="small"
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
          />
          <TextField
            id="outlined-basic"
            label="Civil ID No"
            variant="outlined"
            size="small"
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
          />
          <TextField
            id="outlined-basic"
            label="Address In India"
            multiline={true}
            rows={2}
            variant="outlined"
            size="small"
          />
        </div>
        <div className="right">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
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
          />
          <TextField
            id="outlined-basic"
            label="GSM No"
            variant="outlined"
            size="small"
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
          />
          <TextField
            id="outlined-basic"
            label="Passport No"
            variant="outlined"
            size="small"
          />
          <TextField
            id="outlined-basic"
            label="Telephone No"
            variant="outlined"
            size="small"
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
          />
        </div>
      </div>

      <p className="add-family">Add Family Members:</p>

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
          />
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
