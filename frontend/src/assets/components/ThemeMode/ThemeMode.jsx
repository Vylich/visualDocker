import React, { useState, useEffect } from 'react';


function ThemeMode() {
  const [theme, setTheme] = useState('light');

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const initialTheme = darkModeMediaQuery.matches ? 'dark' : 'light';
    setTheme(initialTheme);

    const darkModeChangeListener = (e) => setTheme(e.matches ? 'dark' : 'light');
    darkModeMediaQuery.addListener(darkModeChangeListener);

    return () => {
      darkModeMediaQuery.removeListener(darkModeChangeListener);
    };
  }, []);

  useEffect(() => {
    const bg = `var(--bg-theme-${theme})`;
    const text = `var(--text-theme-${theme})`;
    const modal = `var(--modal-theme-${theme})`;
    const bgSec = `var(--bg-sec-theme-${theme})`;
    const searchText = `var(--search-theme-text-${theme})`;
    const searchBg = `var(--search-theme-bg-${theme})`;
    const searchBgHover = `var(--search-theme-bg-hover-${theme})`;
    const imageAdd = `var(--image-add-placeholder-${theme})`;
    const iconDate = `var(--color-icon-date-${theme})`;
    const headerText = `var(--color-header-text-${theme})`;
    const borderInput = `var(--border-input-${theme})`;
    const bgInput = `var(--bg-input-${theme})`;







    document.body.style.setProperty('--bg', bg);
    document.body.style.setProperty('--text', text);
		document.body.style.setProperty('--modal', modal);
		document.body.style.setProperty('--bg-sec', bgSec);
		document.body.style.setProperty('--text-search', searchText);
		document.body.style.setProperty('--bg-search', searchBg);
		document.body.style.setProperty('--bg-search-hover', searchBgHover);
		document.body.style.setProperty('--image-add', imageAdd);
		document.body.style.setProperty('--icon-date', iconDate);
		document.body.style.setProperty('--header-text', headerText);
		document.body.style.setProperty('--border-input', borderInput);
		document.body.style.setProperty('--bg-input', bgInput);





  }, [theme]);

  return (
    <div>
      <button onClick={handleToggle}>Toggle Theme</button>
    </div>
  );
}

export {ThemeMode};