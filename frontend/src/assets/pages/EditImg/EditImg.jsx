import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import styles from "./EditImg.module.scss";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import domtoimage from "dom-to-image";
import { Filters } from "@components";
import useOnclickOutside from "react-cool-onclickoutside";
import { v4 } from "uuid";

const EditImg = memo(({ src, setIsFormat, setNewImg, setFile }) => {
  const [orientation, setOrientation] = useState("vertical");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [isTransform, setIsTransform] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [filter, setFilter] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [isSlider, setIsSlider] = useState(false);
  const [filters, setFilters] = useState([
    {
      name: "Без фильтра",
      value: "none",
      symbol: "",
      max: "",
      on: false,
      preview: "",
    },
    {
      name: "Оттенки серого",
      value: "grayscale",
      symbol: "%",
      max: "100",
      on: false,
      preview: "100",
    },
    {
      name: "Инверсия",
      value: "invert",
      symbol: "%",
      max: "101",
      on: false,
      preview: "100",
    },
    {
      name: "Сепия",
      value: "sepia",
      symbol: "%",
      max: "99",
      on: false,
      preview: "100",
    },
    {
      name: "Размытие",
      value: "blur",
      symbol: "px",
      max: "20",
      on: false,
      preview: "5",
    },
    {
      name: "Яркость",
      value: "brightness",
      symbol: "",
      max: "1.1",
      on: false,
      preview: "0.5",
    },
    {
      name: "Контрасность",
      value: "contrast",
      symbol: "%",
      max: "200",
      on: false,

      preview: "200",
    },
    {
      name: "Насыщенность",
      value: "saturate",
      symbol: "%",
      max: "201",
      on: false,

      preview: "200",
    },
    {
      name: "Оттенок",
      value: "hue-rotate",
      symbol: "deg",
      max: "360",
      on: false,

      preview: "90",
    },
    {
      name: "Непрозрачность",
      value: "opacity",
      symbol: "",
      preview: "0.5",
      max: "1",
      on: false,
    },
  ]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const ref = useOnclickOutside(() => setIsTransform(false));
  const [canvasStyle, setCanvasStyle] = useState({
    width: "",
    height: "",
  });
  const [overlayHole, setOverlayHole] = useState({
    width: "",
    height: "",
    left: "",
    top: "",
  });

  const divRef = useRef();
  const wrapRef = useRef();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current.offsetWidth) {
      setCanvasStyle({
        width: canvasRef.current.offsetWidth,
        height: canvasRef.current.offsetHeight,
      });
    }
    if (divRef.current && wrapRef.current) {
      const parentRect = wrapRef.current.getBoundingClientRect();
      const childRect = divRef.current.getBoundingClientRect();

      setOverlayHole({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,

        top: childRect.top - parentRect.top,
        left: childRect.left - parentRect.left,
      });
    }
  }, [aspectRatio, isTransform, isFiltersOpen, canvasRef.current]);

  const changeAspectRatio = useCallback((value) => {
    setAspectRatio(value);
  }, []);

  const captureDiv = useCallback(() => {
    setIsTransform(false);
    if (divRef.current) {
      domtoimage
        .toPng(divRef.current, {
          width: overlayHole.width,
          height: overlayHole.height,
          quality: 1,
        })
        .then(function (dataUrl) {
          setNewUrl(dataUrl);
          setNewImg(dataUrl);

          setIsFormat(false);
          fetch(dataUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], `image-${v4()}.png`, {
                type: "image/png",
              });
              setFile(file);
            });
        })
        .catch(function (error) {
          console.error("Ошибка при попытке создания изображения", error);
        });
    }
  }, [overlayHole]);

  const verticalOrientation = [
    {
      name: "1:1",
      value: 1,
    },
    {
      name: "4:5",
      value: 0.8,
    },
    {
      name: "9:16",
      value: 0.5625,
    },
    {
      name: "3:4",
      value: 0.75,
    },
    {
      name: "1:2",
      value: 0.5,
    },
    {
      name: "2:3",
      value: 0.6666666666666666,
    },
  ];

  const horizontalOrientation = [
    {
      name: "1:1",
      value: 1,
    },
    {
      name: "16:9",
      value: 1.7777777777777777,
    },
    {
      name: "3:2",
      value: 1.5,
    },
    {
      name: "4:3",
      value: 1.3333333333333333,
    },
    {
      name: "5:4",
      value: 1.25,
    },
    {
      name: "2:1",
      value: 2,
    },
  ];

  const handleOrientationChange = useCallback((val) => {
    if (val !== "vertical") {
      setOrientation("horizontal");
    } else {
      setOrientation("vertical");
    }
  }, []);

  const checkFilter = useCallback((value, f) => {
    console.log(value.replace(/\(.*?\)/g, ""));
    if (value === "none()") {
      setFilter([]);
      filters.forEach((el) => (el.on = false));

      setIsSlider(false);
    } else {
      if (filter.some((item) => item.includes(f))) {
        setFilter(
          filter.filter(
            (el) =>
              el.replace(/\(.*?\)/g, "") !== value.replace(/\(.*?\)/g, ""),
          ),
        );
        filters.find((el) => el.value === f).on = false;
      } else {
        setFilter((prev) => [...prev, value]);
        filters.find((el) => el.value === f).on = true;
        setIsSlider(true);
      }
    }
  }, []);

  const formatFilter = useCallback((filters) => {
    let res = "";
    if (filters.length) {
      res = filters.join(" ");
    }
    return res;
  }, []);

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2>Редактор изображения</h2>
        <button onClick={captureDiv}>Сохранить</button>
      </header>
      <div className={styles.rootWrap}>
        <div ref={wrapRef} className={styles.canvasWrap}>
          <div
            style={{
              aspectRatio: aspectRatio,
              overflow: isTransform ? "visible" : "hidden",
            }}
            ref={ref}
            className={styles.border}
          >
            <div
              className={styles.imgBlock}
              ref={divRef}
              style={{
                backgroundColor: bgColor,
                overflow: isTransform ? "visible" : "hidden",
                aspectRatio: aspectRatio,
              }}
            >
              <Draggable
                bounds={{
                  left: -Number(canvasStyle.width) + 20,
                  top: -Number(canvasStyle.height) + 20,
                  right: Number(overlayHole.width) - 20,
                  bottom: Number(overlayHole.height) - 20,
                }}
              >
                <Resizable lockAspectRatio defaultSize={{ width: 350 }}>
                  <div
                    onClick={() => setIsTransform(true)}
                    className={styles.canvas}
                    style={{ borderColor: isTransform ? "red" : "transparent" }}
                    ref={canvasRef}
                  >
                    <img
                      src={src}
                      alt="EditImg"
                      style={{ filter: formatFilter(filter) }}
                    />
                    {isTransform && (
                      <div className={styles.decoratorsWrapp}>
                        <span className={styles.decoratorRound}></span>
                        <span className={styles.decoratorRound}></span>
                        <span className={styles.decoratorRound}></span>
                        <span className={styles.decoratorRound}></span>
                        <span className={styles.decoratorSquircle}></span>
                        <span className={styles.decoratorSquircle}></span>
                        <span className={styles.decoratorSquircle}></span>
                        <span className={styles.decoratorSquircle}></span>
                      </div>
                    )}
                  </div>
                </Resizable>
              </Draggable>
            </div>
          </div>
          <div className={styles.overlay}>
            <svg height="100%" width="100%">
              <defs>
                <mask id="Mask">
                  <rect
                    fill="#fff"
                    height="100%"
                    width="100%"
                    x="0"
                    y="0"
                  ></rect>
                  <rect
                    fill="#000"
                    height={overlayHole.height}
                    width={overlayHole.width}
                    rx=""
                    ry=""
                    style={{
                      transform: `translate(${overlayHole.left}px, ${overlayHole.top}px)`,
                    }}
                  ></rect>
                </mask>
              </defs>
              <rect
                height="100%"
                mask="url(#Mask)"
                style={{ fill: "rgba(239, 239, 239, 0.7)" }}
                width="100%"
                x="0"
                y="0"
              ></rect>
            </svg>
          </div>
        </div>
        {!isFiltersOpen ? (
          <div className={styles.settings}>
            <div className={styles.block}>
              <h3>Ориентация</h3>
              <div className={styles.buttons}>
                <button
                  className={orientation === "vertical" ? styles.active : ""}
                  onClick={() => handleOrientationChange("vertical")}
                >
                  вертикальная
                </button>
                <button
                  className={orientation === "horizontal" ? styles.active : ""}
                  onClick={() => handleOrientationChange("horizontal")}
                >
                  горизонтальная
                </button>
              </div>
            </div>
            <div className={styles.block}>
              <h3>Соотношение сторон</h3>

              <div className={styles.aspectRatio}>
                {orientation === "vertical" &&
                  verticalOrientation.map((item) => (
                    <button
                      onClick={() => changeAspectRatio(item.value)}
                      key={item.name}
                      className={
                        aspectRatio === item.value ? styles.active : ""
                      }
                    >
                      {item.name}
                    </button>
                  ))}
                {orientation === "horizontal" &&
                  horizontalOrientation.map((item) => (
                    <button
                      onClick={() => changeAspectRatio(item.value)}
                      key={item.name}
                      className={
                        aspectRatio === item.value ? styles.active : ""
                      }
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            </div>
            <div className={styles.block}>
              <h3>Цвет фона</h3>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
            <div className={styles.block}>
              <button
                className={styles.btnFilters}
                onClick={() => setIsFiltersOpen(true)}
              >
                Настроить фильтры
              </button>
            </div>
          </div>
        ) : (
          <Filters
            filterOld={filter}
            setFilterOld={setFilter}
            src={src}
            filters={filters}
            checkFilter={checkFilter}
            setIsFiltersOpen={setIsFiltersOpen}
            isSlider={isSlider}
            setIsSlider={setIsSlider}
          />
        )}
      </div>
    </div>
  );
});

export { EditImg };
