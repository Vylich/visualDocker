import React, { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

const Filters = ({
  src,
  filters,
  checkFilter,
  setIsFiltersOpen,
  filterOld,
  setFilterOld,
  isSlider,
  setIsSlider,
}) => {
  const [sliderValues, setSliderValues] = useState("");
  const [value, setValue] = useState("");
  const [currentFilter, setCurrentFIlter] = useState("");
  const [currentSymbol, setCurrentSymbol] = useState("");

  const updateSlider = (val) => {
    if (val !== "") {
      setSliderValues(val);
    }
  };

  const updateValue = (filters, filterName, newValue, symbol) => {
    const newFilters = filters.map((filter) =>
      filter.includes(filterName)
        ? filter.replace(/\(([^)]+)\)/, `(${newValue}${symbol})`)
        : filter,
    );
    setFilterOld(newFilters);
    // console.log(filters, filterOld, filterName, newValue, newFilters);
  };

  const onUpdate = (index) => {
    setValue(Number(index));
    updateValue(filterOld, currentFilter, Number(index), currentSymbol);
  };

  useEffect(() => {
    console.log(currentFilter);
  }, [currentFilter]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span
          onClick={() => {
            setIsFiltersOpen(false);
            setIsSlider(false);
          }}
          className={styles.backBtn}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <h3>Фильтры</h3>
      </div>
      <div className={styles.filtersWrap}>
        {filters.map((item, i) => (
          <div
            onClick={() => {
              setIsSlider(false);
              updateSlider(item.max);
              checkFilter(
                `${item.value}(${item.max}${item.symbol})`,
                item.value,
              );
              setCurrentFIlter(item.value);
              setCurrentSymbol(item.symbol);
            }}
            style={{ borderColor: item.on ? "#7a4ad8" : "transparent" }}
            key={i}
            className={styles.filter}
          >
            <img
              src={src}
              alt="filter"
              style={{ filter: `${item.value}(${item.preview}${item.symbol})` }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className={styles.filterDepth}>
        {isSlider && (
          <Nouislider
            range={{ min: 0, max: sliderValues !== 0 && Number(sliderValues) }}
            start={Number(sliderValues)}
            connect={[true, false]}
            onSlide={(index) => onUpdate(index)}
          />
        )}
      </div>
    </div>
  );
};

export { Filters };
