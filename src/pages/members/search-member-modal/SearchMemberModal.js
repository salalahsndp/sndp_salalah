import React, { useState } from "react";
import "./search-member-modal.scss";
import ModalLayout from "../../../layout/modal-layout/ModalLayout";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function SearchMemberModal({
  closeModal,
  show,
  searchMembers,
  clearSearch,
  disabled,
}) {
  const [submitBtn, setSubmitBtn] = React.useState(false);

  let onInputChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let [formData, setFormData] = useState({});

  let onFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn(true);
    await searchMembers(formData);
    closeModal(true);
    setSubmitBtn(false);
  };

  let onClearSearch = (e) => {
    e.preventDefault();
    setFormData({ member_id: "", name: "", phone: "" });
    clearSearch();
    closeModal(true);
  };

  return (
    <ModalLayout closeModal={closeModal} show={show}>
      <div className="search-member-modal">
        <form onSubmit={onFormSubmit} onReset={onClearSearch}>
          <div className="form">
            <div className="left">
              <TextField
                id="outlined-basic"
                label="Member ID"
                variant="outlined"
                size="small"
                fullWidth
                name="member_id"
                type="number"
                onChange={onInputChange}
                value={formData.member_id}
              />{" "}
            </div>
          </div>
          <div className="form">
            <div className="left">
              {" "}
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                name="name"
                onChange={onInputChange}
                value={formData.name}
              />
            </div>
          </div>
          <div className="form">
            <div className="left">
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                size="small"
                fullWidth
                name="phone"
                onChange={onInputChange}
                value={formData.phone}
              />
            </div>
          </div>
          <div className="buttons">
            <Button
              id="search"
              type="submit"
              variant="contained"
              size="small"
              // color="error"
              style={{
                textTransform: "none",
                fontSize: "1rem",
              }}
              fullWidth
            >
              {submitBtn ? "Searching..." : "Search"}
            </Button>
            <Button
              id="clear"
              variant="contained"
              size="small"
              color="error"
              style={{
                textTransform: "none",
                fontSize: "1rem",
              }}
              fullWidth
              type="reset"
              disabled={disabled}
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
