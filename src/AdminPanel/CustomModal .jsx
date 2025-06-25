import React from 'react';
import './CustomModal.css';

const CustomModal = ({
  open,
  title,
  onCancel,
  footer = null,
  children,
}) => {
  if (!open) return null;

  return (
    <>
      <div className="custom-modal-mask" onClick={onCancel} />
      <div className="custom-modal-wrapper">
        <div className="custom-modal">
          <div className="custom-modal-header">
            <h3>{title}</h3>
            <button className="custom-modal-close" onClick={onCancel}>
              ×
            </button>
          </div>
          <div className="custom-modal-body">{children}</div>
          {footer !== null && (
            <div className="custom-modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomModal;
