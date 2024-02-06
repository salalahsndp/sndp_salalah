import React from "react";
import "./member-delete-modal.scss";

import Button from "@mui/material/Button";
import ModalLayout from "../../../../layout/modal-layout/ModalLayout";

export default function MemberDeleteModal({ closeModal, show, member }) {
  return (
    <ModalLayout closeModal={closeModal} show={show}>
      <div className="delete-branch-modal">
        <div className="warning">Are you sure you want to delete {member}?</div>
        <div className="delete-btn">
          <Button
            variant="contained"
            size="small"
            color="error"
            style={{
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
}
