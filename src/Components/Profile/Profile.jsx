import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import BasicInfo from "../Forms/BasicInfo/BasicInfo";
import Skills from "../Forms/Skills/Skills";
import Education from "../Forms/Education/Education";
import Card from "../Shared/Card/Card";
import IconButton from "../Shared/IconButton/IconButton";
import styles from "./Profile.module.css";
import Input from "../Shared/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userSlice";
import Experience from "../Forms/Experience/Experience";
import Button from "../Shared/Button/Button";
import UserService from "../../store/services/User";
import FeedCard from "../Shared/FeedCard/FeedCard";
import Rightbar from "../RightBar/RightBar";
import TabButton from "../Shared/TabButton/TabButton";
import { useLocation, useParams } from "react-router-dom";

const Components = {
  Resume: "resume",
  My: "all-posts",
  Req: "requirements",
};

const Profile = () => {
  const [selected, setSelected] = useState(Components.Resume);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.userReducer.user);
  const feeds = useSelector((state) => state.feedsReducer.feeds);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const isDiffUser = location && location.state && location.state.diffUser;

  useEffect(() => {
    async function fetchData() {
      try {
        const newUser = await UserService.getUser(userId);
        // dispatch(userActions.setUser({ newUser }));
      } catch (e) {
        dispatch(userActions.setError({ error: e.message }));
      }
    }

    if (isDiffUser) {
      fetchData();
    }
  }, [dispatch, userId]);

  const tabs = [
    {
      text: "Resume",
      type: Components.Resume,
    },
    {
      text: "My Posts",
      type: Components.My,
    },
    {
      text: "Requirements",
      type: Components.Req,
    },
  ];

  const saveProfileHandler = async () => {
    if (
      user.username &&
      user.info.links &&
      user.info.education &&
      user.info.education.length !== 0 &&
      user.info.experience &&
      user.info.experience.length !== 0 &&
      user.info.skills &&
      user.info.skills.length !== 0
    ) {
      dispatch(userActions.setActivated(true));

      await UserService.setActivated(user, true).catch((e) =>
        dispatch(userActions.setError({ error: e.message }))
      );
    } else {
      await UserService.setActivated(user, false).catch((e) =>
        dispatch(userActions.setError({ error: e.message }))
      );
      dispatch(userActions.setActivated(false));
    }
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
          </div>
          {!isDiffUser &&
            (edit ? (
              <IconButton
                icon={faCheck}
                size="xl"
                className={styles.iconButton}
                onClick={() => {
                  setEdit(false);
                  // saveEdits();
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
            ))}
        </div>
        <div className={`${styles.intro} ${styles.designation}`}>
          <div>
            {edit ? (
              <Input
                className={styles.infoInput}
                value={user && user.designation}
                onChange={(e) =>
                  dispatch(userActions.setDesignation(e.target.value))
                }
              />
            ) : (
              <h3>{user && user.designation}</h3>
            )}
          </div>

          {!isDiffUser &&
            (edit ? (
              <IconButton
                icon={faCheck}
                size="s"
                className={styles.iconButton}
                onClick={() => {
                  setEdit(false);
                }}
              />
            ) : (
              <IconButton
                icon={faEdit}
                size="s"
                className={styles.iconButton}
                onClick={() => {
                  setEdit(true);
                }}
              />
            ))}
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
          <TabButton
            content={tab.text}
            selected={selected === tab.type}
            onClickHandler={() => {
              setSelected(tab.type);
            }}
          />
        ))}
      </div>
      {selected === Components.Resume && (
        <>
          <BasicInfo />
          <Education />
          <Experience />
          <Skills />
          {!isDiffUser && (
            <Button
              text="Save Profile"
              style={{ marginBottom: "30px" }}
              onClick={saveProfileHandler}
            />
          )}
        </>
      )}
      {selected === Components.My && (
        <div className={styles.page2}>
          <div className={styles.posts}>
            {feeds
              .filter((feed) => feed.data.uid === user.uid)
              .map((feedData) => (
                <>
                  <FeedCard feedData={feedData} />
                  <hr />
                </>
              ))}
          </div>
          <Rightbar className={styles.profileRight} />
        </div>
      )}
      {selected === Components.Req && (
        <div className={styles.page2}>
          <div className={styles.posts}>
            {feeds
              .filter((feed) => feed.data.isRequirement === true)
              .map((feedData) => (
                <>
                  <FeedCard feedData={feedData} />
                  <hr />
                </>
              ))}
          </div>
          <Rightbar className={styles.profileRight} />
        </div>
      )}
    </div>
  );
};

export default Profile;
