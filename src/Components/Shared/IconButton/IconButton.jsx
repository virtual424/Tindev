import React from "react";
import styles from "./IconButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ className, icon, size, onClick, selected, key }) => {
  return (
    <button
      key={key}
      className={`${styles.iconButton}  ${
        selected && styles.selected
      } ${className} `}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} size={size} />
    </button>
  );
};

export default IconButton;
