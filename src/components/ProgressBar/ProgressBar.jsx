import { useEffect, useRef } from 'react';

import './ProgressBar.scss';

function ProgressBar() {
  const progressBarRef = useRef(null);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    progressBar.style.width = '100%';
  }, []);

  return <div className="progress-bar" ref={progressBarRef}></div>;
}

export default ProgressBar;
