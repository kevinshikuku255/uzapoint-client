import React, { useEffect, useState } from "react";
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';

/**
 * An isntall component
 */
const Install = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);


//use effect
  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);


//click hundler
  const onClick = evt => {
        evt.preventDefault();
        if (!promptInstall) {
          return;
        }
        promptInstall.prompt();

  evt.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    // Clear the saved prompt since it can't be used again
    evt = null;
  });

  };


  if (!supportsPWA) {
    return null;
  }
  return (
    <button
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
     <p><GetAppOutlinedIcon/>Install </p>
    </button>
  );
};

export default Install;
