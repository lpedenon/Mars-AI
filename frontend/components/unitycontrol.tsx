// import React from 'react';

// // Optional: Extend the Window interface if needed
// declare global {
//   interface Window {
//     unityInstance?: any;
//   }
// }

// const UnityControls: React.FC = () => {
//   const handlePause = () => {
//     if (window.unityInstance) {
//       window.unityInstance.SendMessage('GameController', 'PauseGame');
//     } else {
//       console.error("unityInstance is not available");
//     }
//   };

//   const handlePlay = () => {
//     if (window.unityInstance) {
//       window.unityInstance.SendMessage('GameController', 'ResumeGame');
//     } else {
//       console.error("unityInstance is not available");
//     }
//   };

//   return (
//     <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000 }}>
//       <button onClick={handlePause}>Pause</button>
//       <button onClick={handlePlay}>Play</button>
//     </div>
//   );
// };

// export default UnityControls;

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    unityInstance?: any;
  }
}

const UnityControls: React.FC = () => {
  const [isUnityReady, setUnityReady] = useState(false);

  useEffect(() => {
    const checkUnityInstance = setInterval(() => {
      if (window.unityInstance) {
        setUnityReady(true);
        clearInterval(checkUnityInstance);
      }
    }, 500);
    return () => clearInterval(checkUnityInstance);
  }, []);

  const handlePause = () => {
    if (window.unityInstance) {
      window.unityInstance.SendMessage('GameController', 'PauseGame');
    } else {
      console.error("unityInstance is not available");
    }
  };

  const handlePlay = () => {
    if (window.unityInstance) {
      window.unityInstance.SendMessage('GameController', 'ResumeGame');
    } else {
      console.error("unityInstance is not available");
    }
  };

  return (
    <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1000 }}>
      <button onClick={handlePause} disabled={!isUnityReady}>Pause</button>
      <button onClick={handlePlay} disabled={!isUnityReady}>Play</button>
    </div>
  );
};

export default UnityControls;
