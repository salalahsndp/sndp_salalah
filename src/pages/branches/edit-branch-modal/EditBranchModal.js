import React from "react";
import "./edit-branch-modal.scss";
import ModalLayout from "../../../layout/modal-layout/ModalLayout";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function EditBranchModal({ show, closeModal }) {
  return (
    <ModalLayout show={show} closeModal={closeModal}>
      <div className="edit-branch-modal">
        <h3 className="title">Edit Shakha</h3>
        <div className="input-field">
          <TextField
            id="outlined-basic"
            label="Shakha"
            variant="outlined"
            size="small"
            fullWidth
          />
        </div>
        <div className="submit-btn">
          <Button
            variant="contained"
            fullWidth
            style={{ textTransform: "none", fontSize: "1rem" }}
          >
            Update
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
