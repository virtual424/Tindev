import React from "react";
import ReactDOM from "react-dom";
import styles from "./AddPost.module.css";
import Backdrop from "../Shared/Backdrop/Backdrop";
import Card from "../Shared/Card/Card";
import { useState, useRef } from "react";
import Input from "../Shared/Input/Input";
import Skill from "../Shared/Skill/Skill";
import {
  faAdd,
  faCircleNodes,
  faCross,
  faFilm,
  faPanorama,
  faThumbsDown,
  faThumbsUp,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Shared/Button/Button";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { useEffect } from "react";

const AddPost = ({ onCancel }) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  // const contractProcessor = useWeb3ExecuteFunction();

  // const inputFile = useRef(null);
  // const [selectedFile, setSelectedFile] = useState();
  // const [theFile, setTheFile] = useState();
  const [skill, setSkill] = useState("");
  const [project, setProject] = useState();
  const [addSkill, setAddSkill] = useState(false);
  const [skillSet, setSkillSet] = useState([]);

  async function saveProject() {
    if (!project) return;

    //const Tweets = Moralis.Object.extend("Tweets");
    const Projects = Moralis.Object.extend("Projects");
    //const newTweet = new Tweets();
    const newProject = new Projects();
    newProject.set("projectTxt", project);
    newProject.set("Pfp", user.attributes.pfp);
    newProject.set("Acc", user.attributes.ethAddress);
    newProject.set("userName", user.attributes.username);
    // let arr = ["React", "Firebase"];
    newProject.set("array", skillSet);
    // if (theFile) {
    //   const data = theFile;
    //   const file = new Moralis.File(data.name, data);
    //   await file.saveIPFS();
    //   //newProject.set("tweetImg", file.ipfs());
    //   newProject.set("img", file.ipfs());
    // }

    await newProject.save();
    onCancel();
    // window.location.reload();
  }

  const content = (
    <Card className={styles.addPost}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src="/assets/images/avatar 1.png" alt="avatar" />
        </div>
        <h3>{user.attributes.username}</h3>
      </div>
      <textarea
        placeholder="Post your feed..."
        className={styles.textArea}
        name="writepost"
        cols="30"
        rows="5"
        onChange={(e) => setProject(e.target.value)}
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
        </div>
        {!addSkill && (
          <Button text="Add Skill" onClick={() => setAddSkill(true)} />
        )}
      </div>
      <div className={styles.controlButtons}>
        <Button text="Post" onClick={saveProject} />
        <Button text="Cancel" icon={faX} onClick={onCancel} />
      </div>
    </Card>
  );

  return (
    <>
      {ReactDOM.createPortal(content, document.getElementById("modal-root"))}
      {ReactDOM.createPortal(
        <Backdrop onCancel={() => {}} />,
        document.getElementById("backdrop-root")
      )}
    </>
  );
};

export default AddPost;
