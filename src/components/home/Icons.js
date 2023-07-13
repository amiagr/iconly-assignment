import React from "react";
import '../../styles/home/Icons.css';
import { useGoogleLogout } from "react-google-login";

function Icons({ onLogout }) {
  const icons = [
    {
      id: 1,
      label: "Home",
      iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/home.png",
    },
    {
      id: 2,
      label: "Profile",
      iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/user-male-circle.png",
    },
    {
      id: 3,
      label: "Settings",
      iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/settings.png",
    },
    {
      id: 4,
      label: "Logout",
      iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/logout-rounded-up.png",
    },
    {
      id: 5,
      label: "Logout",
      iconUrl: "https://img.icons8.com/ios-filled/50/ffffff/logout-rounded-up.png",
    }
  ];

  const onLogoutSuccess = () => {
    onLogout();
  };

  const onFailure = () => {
    console.log("Logout failed");
  };

  const { signOut } = useGoogleLogout({
    clientId: '646263942180-6rii0ki94o9k04m4sq5oiefgfcoqadg9.apps.googleusercontent.com',
    onLogoutSuccess,
    onFailure
  });

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <div className="main">
      <div className="appbar">
        <h1 className="appbar-title">My Icons</h1>
        <button className="appbar-button" onClick={handleLogoutClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 20 20">
            <title>
              Log out
            </title>
            <path d="M3 3h8V1H3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8v-2H3z"/>
            <path d="M19 10l-6-5v4H5v2h8v4l6-5z"/>
          </svg>
        </button>
      </div>
      <div className="container">
        {icons.map((icon) => (
          <div key={icon.id} className="icon">
            <img src={icon.iconUrl} alt={icon.label} />
            <a className="icon-label" href={icon.iconUrl} target="_blank">{icon.label}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Icons;
