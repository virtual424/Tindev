import React from "react";
import styles from "./RightBar.module.css";
import Input from "../Shared/Input/Input";

const Rightbar = () => {
  return (
    <div className={styles.rightbarContent}>
      <Input
        type="text"
        placeholder="Search Devs"
        className={styles.searchInput}
      />
      <div className={styles.menuItems}>Recent Chats</div>
    </div>
  );
};

export default Rightbar;
