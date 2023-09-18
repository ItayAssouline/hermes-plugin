import React from "react";

interface ConfirmJobModalProps {
  onCancel: () => void;
  onAction: () => void;
}

const ConfirmJobModal = ({ onCancel, onAction }: ConfirmJobModalProps) => {
  return (
    <>
      <span className="modal-title">Large job validation</span>
      <span>
        This is job is a <b>50 minutes</b> transcribing job, just making sure
        you want to do this
      </span>
      <div className="modal-chip">
        You have: <b>837 minutes left</b>
      </div>
      <div className="modal-actions">
        <div className="btn modal-action-btn" onClick={onAction}>
          Continue
        </div>
        <div className="modal-cancel-btn" onClick={onCancel}>
          Cancel
        </div>
      </div>
    </>
  );
};

export default ConfirmJobModal;
