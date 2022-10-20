import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import Sidebar from "./Components/SideBar/Sidebar.jsx";
import Navigation from "./Components/Shared/Navigation/Navigation";
import Authenticate from "./pages/Register/Authenticate";
import "./App.css";
import Public from "./Routes/Public";
import Feeds from "./Components/Feeds/Feeds";
import Rightbar from "./Components/RightBar/RightBar.jsx";
import Protected from "./Routes/Protected";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "./store/reducers/userSlice";

const App = () => {
  const { isAuthenticated, user } = useMoralis();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const {
        activated,
        ethAddress,
        skills,
        username,
        Email,
        Contact,
        GitHub,
        education,
        LinkedIn,
        experience,
        Other,
        Hackerrank,
      } = user.attributes;

      const newUser = {
        id: user.id,
        ethAddress,
        username,
        info: {
          links: {
            Contact,
            Email,
            GitHub,
            LinkedIn,
            Hackerrank,
            Other,
          },
          education,
          experience,
          skills,
        },
      };
      dispatch(userActions.setUser({ user: newUser }));
      dispatch(userActions.setActivated(activated));
    } else {
      dispatch(userActions.setUser({ user: null }));
    }
    dispatch(userActions.setIsAuthenticated(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <>
      <Navigation />
      <Public path="/" exact>
        <Authenticate />
      </Public>
      <Protected path="/feeds">
        <div className="page">
          <Sidebar />
          <Feeds />
          <Rightbar />
        </div>
      </Protected>
      <Protected path="/profile">
        <div className="page">
          <Sidebar />
          <Profile />
        </div>
      </Protected>
    </>
  );
};

export default App;
