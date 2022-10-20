import {
  faBuilding,
  faCheck,
  faEdit,
  faInfo,
  faLink,
  faSchool,
  faTerminal,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import BasicInfo from "../Forms/BasicInfo/BasicInfo";
import Skills from "../Forms/Skills/Skills";
import Education from "../Forms/Education/Education";
import Card from "../Shared/Card/Card";
import IconButton from "../Shared/IconButton/IconButton";
import styles from "./Profile.module.css";
import Input from "../Shared/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userSlice";
import { useMoralis } from "react-moralis";
import Experience from "../Forms/Experience/Experience";
import Button from "../Shared/Button/Button";

const Components = {
  BasicInfo: "basic_info",
  Education: "education",
  Experience: "experience",
  Skills: "skills",
};

const Profile = () => {
  const [component, setComponent] = useState(Components.BasicInfo);
  const [edit, setEdit] = useState(false);
  const { Moralis } = useMoralis();
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  const tabs = [
    {
      icon: faInfo,
      componentType: Components.BasicInfo,
      //   component: <BasicInfo />,
    },
    {
      icon: faSchool,
      componentType: Components.Education,
      //   component: <BasicInfo />,
    },
    {
      icon: faBuilding,
      componentType: Components.Experience,
      //   component: <BasicInfo />,
    },

    {
      icon: faTerminal,
      componentType: Components.Skills,
      //   component: <Skills />,
    },
  ];

  const saveProfileHandler = () => {
    if (
      user.username &&
      user.info.links &&
      user.info.education &&
      user.info.education.length !== 0 &&
      user.info.experience &&
      user.info.experience.length !== 0 &&
      user.info.skills &&
      user.info.skills.length !== 0
    )
      dispatch(userActions.setActivated(true));
    else dispatch(userActions.setActivated(false));
  };

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (user) {
      myDetails.set("username", user.username);
    }
    await myDetails.save();
  };

  return (
    <div className={styles.profile}>
      <Card className={styles.introCard}>
        <div className={styles.avatar}>
          <img src="/assets/images/avatar 1.png" alt="avatar" />
        </div>

        <div className={styles.intro}>
          <div>
            {edit ? (
              <Input
                className={styles.infoInput}
                value={user && user.username}
                onChange={(e) =>
                  dispatch(userActions.setUsername(e.target.value))
                }
              />
            ) : (
              <h3>{user && user.username}</h3>
            )}
            <p>{user && user.info.education[0].designation}</p>
          </div>

          {edit ? (
            <IconButton
              icon={faCheck}
              size="xl"
              className={styles.iconButton}
              onClick={() => {
                setEdit(false);
                saveEdits();
              }}
            />
          ) : (
            <IconButton
              icon={faEdit}
              size="xl"
              className={styles.iconButton}
              onClick={() => {
                setEdit(true);
              }}
            />
          )}
        </div>

        <div className={styles.reputation}>
          <div className={styles.reputationTab}>
            <p>Posts</p>
            <p>5</p>
          </div>
          <div className={styles.reputationTab}>
            <p>Rating</p>
            <p>2</p>
          </div>
        </div>
      </Card>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <IconButton
            key={tab.component}
            icon={tab.icon}
            className={styles.tab}
            size="2xl"
            selected={component === tab.componentType}
            onClick={() => setComponent(tab.componentType)}
          />
        ))}
      </div>
      <BasicInfo />
      <Education />
      <Experience />
      <Skills />
      <Button
        text="Save Profile"
        style={{ marginBottom: "30px" }}
        onClick={saveProfileHandler}
      />
    </div>
  );
};

export default Profile;
