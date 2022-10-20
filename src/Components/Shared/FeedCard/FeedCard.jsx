import {
  faCircleNodes,
  faPaperPlane,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Card from "../Card/Card";
import IconButton from "../IconButton/IconButton";
import Input from "../Input/Input";
import Skill from "../Skill/Skill";
import styles from "./FeedCard.module.css";

const FeedCard = ({ project }) => {
  return (
    <Card className={styles.feed}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src="/assets/images/avatar 1.png" alt="avatar" />
        </div>
        <h3>{project && project.attributes.userName}</h3>
      </div>
      <div className={styles.content}>
        <p>{project && project.attributes.projectTxt}</p>
      </div>
      <div className={styles.skillsContainer}>
        {project &&
          project.attributes.array.map((skill) => (
            <Skill title={skill} disable={true} />
          ))}
      </div>
      <div className={styles.actions}>
        <div className={styles.actionIcon}>
          <FontAwesomeIcon icon={faThumbsUp} size="xl" />
          <span>5</span>
        </div>
        <div className={styles.actionIcon}>
          <FontAwesomeIcon icon={faThumbsDown} size="xl" />
          <span>0</span>
        </div>
        <FontAwesomeIcon
          icon={faCircleNodes}
          size="xl"
          className={styles.actionIcon}
        />
      </div>
      <div className={styles.comment}>
        <Input placeholder="Comments" type="text" />
        <IconButton icon={faPaperPlane} size="xl" className={styles.send} />
      </div>
    </Card>
  );
};

export default FeedCard;
