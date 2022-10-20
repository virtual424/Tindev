import {
  faCheck,
  faEdit,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Card from "../../Shared/Card/Card";
import Input from "../../Shared/Input/Input";
import styles from "./BasicInfo.module.css";
import Button from "../../Shared/Button/Button";
import { useState, useRef, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import IconButton from "../../Shared/IconButton/IconButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/reducers/userSlice";

const BasicInfo = () => {
  const user = useSelector((state) => state.userReducer.user);
  const [changeInInfo, setChangeInInfo] = useState(false);
  const dispatch = useDispatch();
  const { Moralis } = useMoralis();
  // const [basicInfo, setBasicInfo] = useState({});

  // useEffect(() => {
  //   if (user) {
  //     setBasicInfo({
  //       Contact: user && user.info.links.Contact,
  //       Email: user && user.info.links.Email,
  //       GitHub: user && user.info.links.GitHub,
  //       LinkedIn: user && user.info.links.LinkedIn,
  //       Hackerrank: user && user.info.links.Hackerrank,
  //       Other: user && user.info.links.Other,
  //     });
  //   }
  // }, [user]);

  const basicInfo = {
    Contact: user && user.info.links.Contact,
    Email: user && user.info.links.Email,
    GitHub: user && user.info.links.GitHub,
    LinkedIn: user && user.info.links.LinkedIn,
    Hackerrank: user && user.info.links.Hackerrank,
    Other: user && user.info.links.Other,
  };

  console.log(basicInfo);

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (basicInfo.Contact) {
      myDetails.set("Contact", basicInfo.Contact);
    }
    if (basicInfo.Email) {
      myDetails.set("Email", basicInfo.Email);
    }
    if (basicInfo.LinkedIn) {
      myDetails.set("LinkedIn", basicInfo.LinkedIn);
    }
    if (basicInfo.GitHub) {
      myDetails.set("GitHub", basicInfo.GitHub);
    }
    if (basicInfo.Hackerrank) {
      myDetails.set("Hackerrank", basicInfo.Hackerrank);
    }
    if (basicInfo.Other) {
      myDetails.set("Other", basicInfo.Other);
    }
    myDetails.set("activated", true);
    await myDetails.save();
    dispatch(userActions.setBasicInfo(basicInfo));
  };

  const saveInput = (key, value) => {
    basicInfo[key] = value;
  };

  return (
    <Card className={styles.BasicInfoCard}>
      <div className={`${styles.flexBox}`}>
        <BasicInfoTab
          title="Contact"
          content={basicInfo.Contact}
          icon={faPhone}
          change={changeInInfo}
          setChange={(value) => setChangeInInfo(value)}
          saveInput={saveInput}
        />
        <BasicInfoTab
          title="Email"
          content={basicInfo.Email}
          icon={faEnvelope}
          change={changeInInfo}
          setChange={(value) => setChangeInInfo(value)}
          saveInput={saveInput}
        />
      </div>
      <div className={`${styles.flexBox}`}>
        <BasicInfoTab
          title="GitHub"
          content={basicInfo.GitHub}
          url={basicInfo.GitHub}
          link={true}
          iconUrl="github"
          change={changeInInfo}
          setChange={(value) => setChangeInInfo(value)}
          saveInput={saveInput}
        />
        <BasicInfoTab
          title="LinkedIn"
          content={basicInfo.LinkedIn}
          url={basicInfo.LinkedIn}
          link={true}
          iconUrl="linkedin"
          change={changeInInfo}
          setChange={(value) => setChangeInInfo(value)}
          saveInput={saveInput}
        />
      </div>

      <div className={`${styles.flexBox}`}>
        <BasicInfoTab
          title="Other"
          content={basicInfo.Other}
          url={basicInfo.Other}
          link={true}
          iconUrl="code-editor"
          change={changeInInfo}
          setChange={(value) => setChangeInInfo(value)}
          saveInput={saveInput}
        />

        <BasicInfoTab
          title="Hackerrank"
          content={basicInfo.Hackerrank}
          url={basicInfo.Hackerrank}
          link={true}
          iconUrl="hackerrank"
          change={changeInInfo}
          setChange={(value) => setChangeInInfo(value)}
          saveInput={saveInput}
        />
      </div>

      {changeInInfo && (
        <Button
          className={styles.nextButton}
          text="Save"
          onClick={() => {
            saveEdits();
            setChangeInInfo(false);
          }}
          style={{ margin: "0" }}
        />
      )}
    </Card>
  );
};

export default BasicInfo;

const BasicInfoTab = ({
  title,
  content,
  icon,
  link,
  url,
  iconUrl,
  change,
  setChange,
  saveInput,
}) => {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(content);

  useEffect(() => {
    if (content) {
      setInputValue(content);
    }
  }, [content]);

  useEffect(() => {
    if (setChange && inputValue !== content && !change) {
      setChange(true);
    }
  }, [inputValue]);

  const contentComponent = edit ? (
    <Input
      className={styles.infoInput}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  ) : link ? (
    <Link to={url ? url : ""} className={styles.link}>
      {inputValue ? inputValue : "-"}
    </Link>
  ) : (
    <p>{inputValue ? inputValue : "-"}</p>
  );

  return (
    <div className={styles.basicInfoTab}>
      {iconUrl ? (
        <img
          src={`/assets/images/${iconUrl}.svg`}
          alt={title}
          className={styles.svgIcon}
        />
      ) : (
        <FontAwesomeIcon icon={icon} size="2xl" />
      )}

      <div>
        <h5>{title}</h5>
        {contentComponent}
      </div>

      {edit ? (
        <IconButton
          icon={faCheck}
          size="xl"
          className={styles.iconButton}
          onClick={() => {
            saveInput(title, inputValue);
            setEdit(false);
          }}
        />
      ) : (
        <IconButton
          icon={faEdit}
          size="xl"
          className={styles.iconButton}
          onClick={() => setEdit(true)}
        />
      )}
    </div>
  );
};
