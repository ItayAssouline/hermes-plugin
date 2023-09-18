import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import "./generalModal.css";

interface GeneralModalProps {
  children: ReactNode | ReactNode[];
  borderColor?: string;
}

const fadeInOutVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const GeneralModal = ({ children, borderColor }: GeneralModalProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeInOutVariants}
      transition={{ duration: 0.3 }}
      className="general-modal"
    >
      <div
        className="modal-content"
        style={{
          border: `1.5px solid ${borderColor ?? "#4e4e4e"}`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default GeneralModal;
