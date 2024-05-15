import React, { useState, useEffect } from "react";
import styles from "./ThemeMode.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function ThemeMode() {
  const [theme, setTheme] = useState("light");

  const handleToggle = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      const initialTheme = darkModeMediaQuery.matches ? "dark" : "light";
      setTheme(initialTheme);

      const darkModeChangeListener = (e) =>
        setTheme(e.matches ? "dark" : "light");
      darkModeMediaQuery.addListener(darkModeChangeListener);

      return () => {
        darkModeMediaQuery.removeListener(darkModeChangeListener);
      };
    } else {
      setTheme(localStorage.getItem("theme"));
    }
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
    const hoverLink = `var(--link-text-hover-${theme})`;
    const linkSettings = `var(--link-settings-${theme})`;
    const iconHeader = `var(--icon-header-${theme})`;

    document.body.style.setProperty("--bg", bg);
    document.body.style.setProperty("--text", text);
    document.body.style.setProperty("--modal", modal);
    document.body.style.setProperty("--bg-sec", bgSec);
    document.body.style.setProperty("--text-search", searchText);
    document.body.style.setProperty("--bg-search", searchBg);
    document.body.style.setProperty("--bg-search-hover", searchBgHover);
    document.body.style.setProperty("--image-add", imageAdd);
    document.body.style.setProperty("--icon-date", iconDate);
    document.body.style.setProperty("--header-text", headerText);
    document.body.style.setProperty("--border-input", borderInput);
    document.body.style.setProperty("--bg-input", bgInput);
    document.body.style.setProperty("--hover-link", hoverLink);
    document.body.style.setProperty("--link-settings", linkSettings);
    document.body.style.setProperty("--icon-header", iconHeader);
  }, [localStorage.getItem("theme"), theme]);

  return (
    <div>
      <button className={styles.toggleTheme} onClick={handleToggle}>
        {theme === "light" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>
    </div>
  );
}

export { ThemeMode };

