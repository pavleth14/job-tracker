import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ConfirmModal.css";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onClose: () => void;
  }

  function ConfirmModal({
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onClose,
  }: ConfirmModalProps) {
  
    if (!isOpen) {
      return null;
    }

    useEffect(() => {
      if (!isOpen) return;
    
      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          onClose();
        }
      }
    
      window.addEventListener("keydown", handleEscape);
    
      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, onClose]);
  
    return createPortal(
      <div className="modal-overlay">
    
        <div className="modal">
    
          <h2>{title}</h2>
    
          <p>{message}</p>
    
          <div className="modal-actions">
    
            <button onClick={onClose}>
              {cancelText}
            </button>
    
            <button onClick={onConfirm}>
              {confirmText}
            </button>
    
          </div>
    
        </div>
    
      </div>,
      document.body
    );
  }
  
  export default ConfirmModal;