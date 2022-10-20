import React from "react";
import styles from "./Sidebar.module.css";
import { Link, useLocation } from "react-router-dom";
import { useMoralis } from "react-moralis";
import Button from "../Shared/Button/Button";

const Sidebar = () => {
  const { Moralis } = useMoralis();

  const location = useLocation();

  return (
    <div className={styles.sidebar}>
      <div>
        <Link
          to="/feeds"
          className={
            location.pathname === "/feeds"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/feeds.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Feeds</p>
        </Link>
        <Link
          to="/profile"
          className={
            location.pathname === "/profile"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/idCard.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Setup Profile</p>
        </Link>
        <Link
          to="/chats"
          className={
            location.pathname === "/chats"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/chats.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Chats</p>
        </Link>
        <Link
          to="/editor"
          className={
            location.pathname === "/editor"
              ? `${styles.menuItems} ${styles.selected}`
              : `${styles.menuItems}`
          }
        >
          <img
            src="/assets/images/code-editor.svg"
            alt="feeds"
            className={styles.svgIcon}
          />
          <p>Editor</p>
        </Link>
      </div>
      <Button
        className={styles.logout}
        text="Logout"
        onClick={() => {
          Moralis.User.logOut().then(() => {
            window.location.reload();
          });
        }}
      />
    </div>
  );
};

export default Sidebar;
