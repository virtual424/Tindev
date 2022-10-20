import Card from "../Shared/Card/Card";
import FeedCard from "../Shared/FeedCard/FeedCard";
import Input from "../Shared/Input/Input";
import Button from "../Shared/Button/Button";
import styles from "./Feeds.module.css";
import AddPost from "../AddPost/AddPost";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Feeds = () => {
  const navigate = useNavigate();
  const [isAddPost, setIsAddPost] = useState(false);
  const { Moralis } = useMoralis();

  const activated = useSelector((state) => state.userReducer.activated);
  const [projectArr, setprojectArr] = useState([]);

  useEffect(() => {
    async function getProjects() {
      try {
        const Projects = Moralis.Object.extend("Projects");
        const query = new Moralis.Query(Projects);
        const results = await query.find();
        setprojectArr(results);
      } catch (error) {
        console.error(error);
      }
    }
    getProjects();
  }, []);

  function changeToPost() {
    if (!activated) {
      return;
    }
    setIsAddPost(true);
  }

  function navToProfile() {
    navigate("/profile");
  }

  return (
    <div className={styles.feeds}>
      <Card className={styles.createPost}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            <img src="/assets/images/avatar 1.png" alt="avatar" />
          </div>
          <Input
            type="text"
            placeholder="What's on your mind?"
            onClick={changeToPost}
            disabled={!activated}
          />
        </div>
      </Card>
      {!activated && (
        <div className={styles.warning}>
          <Button text="Update" onClick={() => navigate("/profile")} />
          <span>
            Kindly complete your profile to access all the features of the
            portal.
          </span>
        </div>
      )}
      {isAddPost && <AddPost onCancel={() => setIsAddPost(false)} />}
      <hr />
      {projectArr.map((project) => (
        <>
          <FeedCard project={project} />
          <hr />
        </>
      ))}
    </div>
  );
};

export default Feeds;
