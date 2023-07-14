import React, { useEffect, useState } from "react";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../../styles/home/Icons.css';
import { useGoogleLogout } from "react-google-login";
import Snackbar from "../global/Snackbar";

function Icons({ onLogout }) {
  const [icons, setIcons] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, sethasMore] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const iconsPerPage = 100;

  useEffect(() => {
    loadIcons();
  }, []);

  async function loadIcons() {
    setIsLoading(true);

    await axios.get(
      `http://localhost:8000/api/icons?page=${currentPage}&per_page=${iconsPerPage}`
    ).then(({ data }) => {
      if (data.to === data.total) {
        sethasMore(true)
      }
      setCurrentPage(currentPage + 1);
      setIcons([...icons, ...data.data]);
    }).catch(err => {
      openSnackbar('Something went wrong with API call!', err)
    });

    setIsLoading(false);
  }

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

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
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
      <InfiniteScroll
        className="container"
        dataLength={icons.length} //This is important field to render the next data
        next={loadIcons}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={loadIcons}
        pullDownToRefresh
        pullDownToRefreshThreshold={10}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {icons.map((icon) => (
          <div key={icon.id} className="icon">
            <img src={icon.svg_url} alt={icon.label} />
            <a className="icon-label" href={icon.svg_url} target="_blank" rel="noreferrer">{icon.label}</a>
          </div>
        ))}
      </InfiniteScroll>
      <Snackbar message={snackbarMessage} show={showSnackbar} onClose={handleSnackbarClose} />
    </div>
  );
}

export default Icons;
