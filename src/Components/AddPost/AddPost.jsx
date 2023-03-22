import React from "react";
import ReactDOM from "react-dom";
import styles from "./AddPost.module.css";
import Backdrop from "../Shared/Backdrop/Backdrop";
import Card from "../Shared/Card/Card";
import { useState } from "react";
import Input from "../Shared/Input/Input";
import Skill from "../Shared/Skill/Skill";
import {
  faAdd,
  faFilm,
  faPanorama,
  faPenNib,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Shared/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import FeedService from "../../store/services/Feed";
import { feedsActions } from "../../store/reducers/feedSlice";

const AddPost = ({ onCancel }) => {
  const { user } = useSelector((state) => state.userReducer);
  const { error } = useSelector((state) => state.feedsReducer);
  const dispatch = useDispatch();
  const [skill, setSkill] = useState("");
  const [content, setContent] = useState();
  const [addSkill, setAddSkill] = useState(false);
  const [skillSet, setSkillSet] = useState([]);
  const [selected, setSelected] = useState(false);

  async function saveProject() {
    if (!content) return;
    const newFeed = {
      content: content,
      Pfp: user.pfp,
      user: {
        uid: user.uid,
        designation: user.designation,
        username: user.username,
      },
      skills: skillSet,
      isRequirement: selected,
      intrestedUsers: [],
      likes: 0,
      dislikes: 0,
    };
    try {
      await FeedService.addFeed(newFeed);
    } catch (e) {
      dispatch(feedsActions.setError({ error: e.message }));
    }
    await onCancel();
  }

  const componentContent = (
    <Card className={styles.addPost}>
      {error ? (
        <p>error</p>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.avatar}>
              <img src="/assets/images/avatar 1.png" alt="avatar" />
            </div>
            <h3>{user.username}</h3>
          </div>
          <textarea
            placeholder="Post your feed..."
            className={styles.textArea}
            name="writepost"
            cols="30"
            rows="5"
            onChange={(e) => setContent(e.target.value)}
          />
          {addSkill && (
            <div className={styles.addSkillContainer}>
              <Input
                placeholder="Enter skills"
                className=""
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
              <Button
                icon={faAdd}
                onClick={() => {
                  if (skill.length === 0) return;
                  setSkillSet((prevSkills) => {
                    return [...prevSkills, skill];
                  });
                  setSkill("");
                }}
              />
              <Button icon={faX} onClick={() => setAddSkill(false)} />
            </div>
          )}
          {skillSet.length !== 0 && (
            <div className={styles.skillsContainer}>
              {skillSet.map((skill) => (
                <Skill
                  title={skill}
                  onCancel={() => {
                    const newSkillSets = skillSet.filter(
                      (delSkill) => skill != delSkill
                    );
                    setSkillSet(newSkillSets);
                  }}
                />
              ))}
            </div>
          )}
          <div className={styles.actions}>
            <div className={styles.iconsContainer}>
              <div className={styles.actionIcon}>
                <FontAwesomeIcon icon={faPanorama} size="xl" />
              </div>
              <div className={styles.actionIcon}>
                <FontAwesomeIcon icon={faFilm} size="xl" />
              </div>
              <div
                className={`${styles.actionIcon} ${styles.reqAction} ${
                  selected && styles.reqSelected
                } `}
                onClick={() => setSelected((prevState) => !prevState)}
              >
                <FontAwesomeIcon icon={faPenNib} size="xl" />
              </div>
            </div>
            {!addSkill && (
              <Button text="Add Skill" onClick={() => setAddSkill(true)} />
            )}
          </div>
          <div className={styles.controlButtons}>
            <Button text="Post" onClick={saveProject} />
            <Button text="Cancel" icon={faX} onClick={onCancel} />
          </div>
        </>
      )}
    </Card>
  );

  return (
    <>
      {ReactDOM.createPortal(
        componentContent,
        document.getElementById("modal-root")
      )}
      {ReactDOM.createPortal(
        <Backdrop onCancel={() => {}} />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default AddPost;
