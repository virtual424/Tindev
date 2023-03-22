import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import FeedService from "../../store/services/Feed";
import IconButton from "../Shared/IconButton/IconButton";
import UserHeader from "../Shared/UserHeader/UserHeader";
import styles from "./ResponseTile.module.css";

const ResponseTile = ({ data, feedData }) => {
  const {
    id: feedId,
    data: { intrestedUsers },
  } = feedData;

  const acceptRequestHandler = () => {};

  const rejectRequestHandler = async () => {
    await FeedService.updateField({
      path: `feeds/${feedId}`,
      newData: {
        key: "intrestedUsers",
        value: intrestedUsers.filter((userData) => userData.uid !== data.uid),
      },
    });
  };

  return (
    <>
      <div className={styles.responseTile}>
        {/* <div className={styles.responseTileInfo}>
          <div className={styles.avatar}>
            <img src="/assets/images/avatar 1.png" alt="avatar" />
          </div>
          <div className={styles.userInfo}>
            <h3>{data && data.username}</h3>
            <p>{data && data.designation}</p>
          </div>
        </div> */}
        <UserHeader
          username={data && data.username}
          designation={data && data.designation}
          className={styles.header}
        />
        <div className={styles.responseActionContainer}>
          <IconButton
            icon={faCheck}
            size="2xl"
            onClick={acceptRequestHandler}
            className={`${styles.responseAction} ${styles.accept}`}
          />
          <IconButton
            icon={faXmark}
            size="2xl"
            onClick={rejectRequestHandler}
            className={`${styles.responseAction} ${styles.reject}`}
          />
        </div>
      </div>
    </>
  );
};

export default ResponseTile;
