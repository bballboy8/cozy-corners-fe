export const LoadStyleSheet = (path, onLoadCallback) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = "text/css";
    link.href = path;
    
    // Add load event listener to ensure CSS is fully loaded before calling the callback
    link.onload = () => {
      if (onLoadCallback) {
        onLoadCallback(); // Run the callback function once the CSS is loaded
      }
    };
    document.head.appendChild(link);
  };
  