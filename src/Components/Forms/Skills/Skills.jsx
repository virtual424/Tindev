import {
  faLightbulb,
  faTerminal,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Button from "../../Shared/Button/Button";
import Card from "../../Shared/Card/Card";
import Input from "../../Shared/Input/Input";
import Skill from "../../Shared/Skill/Skill";
import styles from "./Skills.module.css";
import { useMoralis } from "react-moralis";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/reducers/userSlice";

const Skills = () => {
  const skills = [
    "ReactJs",
    "Data  Structures And Algorithms",
    "NodeJS",
    "Java",
  ];
  const [currSkill, setcurrSkill] = useState("");
  const { Moralis } = useMoralis();

  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();
  const skillsInfo = user && user.info.skills ? user.info.skills : [];
  console.log(skillsInfo);

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    myDetails.set("skills", skillsInfo);
    await myDetails.save();
  };

  const deleteEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    myDetails.set("skills", skillsInfo);
    await myDetails.save();
  };

  return (
    <Card className={styles.BasicInfoCard}>
      <div className={styles.heading}>
        <FontAwesomeIcon icon={faTerminal} size="2xl" />
        <h3>Add your skills.</h3>
      </div>
      <div className={styles.flexBox}>
        <Input
          type="text"
          value={currSkill}
          placeholder="Add your skills here."
          onChange={(e) => setcurrSkill(e.target.value)}
        />
        <Button
          text="Add"
          onClick={() => {
            if (currSkill.length === 0) return;
            dispatch(userActions.setSkillsInfo(currSkill));
            setcurrSkill("");
          }}
        />
        <Button
          className={styles.nextButton}
          text="Save"
          onClick={() => {
            saveEdits("start");
          }}
        />
      </div>
      <div className={styles.skillsContainer}>
        {skillsInfo &&
          skillsInfo.map((skill) => (
            <Skill
              title={skill}
              onCancel={() => {
                dispatch(userActions.deleteSkill(skill));
                deleteEdits("delete");
              }}
            />
          ))}
      </div>
    </Card>
  );
};

export default Skills;
