import React, { useEffect, useState, memo, useCallback } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";

import styles from "./AddPost.module.scss";

import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../../redux/slices/auth";
import { EditImg } from "@pages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faFileArrowUp,
  faPlus,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";
import "./slider.scss";

import { removeApiUrl } from "../../components/Post";
import { setImg } from "../../../redux/slices/editingImg";

const AddPost = memo(({ setIsFormat, newImg, file }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const isUserDataLoaded = (state) => state.auth.data !== null;
  const userdata = useSelector((state) =>
    isUserDataLoaded(state) ? state.auth.data.user : null,
  );

  const [isLoading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [isCheckedComments, setIsCheckedComments] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [saveFromLink, setSaveFromLink] = useState(false);
  const [text, setText] = React.useState("");
  const [link, setLinks] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [linkMedia, setLinkMedia] = React.useState("");
  const [isValidLinkMedia, setIsValidLinkMedia] = useState(true);
  const [isSlider, setIsSlider] = useState(false);

  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = React.useState([]);
  const [video, setVideo] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [aspectRatio, setAspectRatio] = useState("");
  const inputFileRef = React.useRef(null);

  const [crop, setCrop] = useState({});
  const isEditing = Boolean(id);

  const [errorMessageTitle, setErrorMessageTitle] = useState(false);
  const [errorMessageTags, setErrorMessageTags] = useState(false);
  const [errorMessageImages, setErrorMessageImages] = useState(false);

  const [isEditingImg, setIsEditingImg] = useState(false);
  const dispatch = useDispatch();

  const getMeta = useCallback((imageUrl, callback) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = function () {
      callback(this.width, this.height, imageUrl);
    };
  }, []);

  const editImage = useCallback(() => {
    setIsEditingImg(true);
    setIsFormat(true);
  }, []);

  useEffect(() => {
    if (imageUrl) {
      dispatch(setImg(imageUrl));
      imageUrl.forEach((image) => {
        getMeta(image, (width, height, url) => {
          const aspect = width / height;
          if (aspect < 0.5625) {
            setAspectRatio((prev) => ({ ...prev, [url]: 0.5625 }));
          } else {
            setAspectRatio((prev) => ({ ...prev, [url]: width / height }));
            setCrop((prev) => ({ ...prev, [url]: { aspect } }));
          }
        });
      });
    }
  }, [imageUrl]);

  useEffect(() => {
    if (newImg) {
      setImageUrl((prev) => [...prev, newImg]);
    }
  }, [newImg]);

  useEffect(() => {
    if (file) {
      setImage((prev) => [...prev, file]);
    }
  }, [file]);

  const handleChangeFile = useCallback((evt) => {
    Array.from(evt.target.files)
      .filter((file) => file.type.includes("image"))
      .forEach((item) => {
        setImage((prev) => [...prev, item]);
      });

    Array.from(evt.target.files)
      .filter((file) => file.type.includes("video"))
      .forEach((item) => {
        setVideo((prev) => [...prev, item]);
      });

    const files = Array.from(evt.target.files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.type.includes("image")) {
        setImageUrl((prev) => [...prev, URL.createObjectURL(file)]);
      } else if (file.type.includes("video")) {
        setVideoUrls((prev) => [...prev, URL.createObjectURL(file)]);
      }
    }
  }, []);

  const onClickRemoveImage = useCallback(() => {
    setImageUrl([]);
    setImage([]);
    setVideo([]);
    setVideoUrls([]);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      const arrTags = tags.split(",").map((tag) => tag.trim());
      if (image.length < 1) {
        formData.append("image", "");
      }
      if (video.length < 1) {
        formData.append("video", "");
      }

      image.forEach((Img) => {
        formData.append("image", Img);
      });

      video.forEach((Vid) => {
        formData.append("video", Vid);
      });

      if (isCheckedComments) {
        formData.append("avialable_comment", true);
      }
      formData.append("name", title);
      arrTags.forEach((Tag) => {
        formData.append("tags", Tag);
      });
      formData.append("text", text);
      formData.append("author", userdata.username);

      console.log(formData);

      if (title && tags && (image.length || video.length)) {
        const { data } = isEditing
          ? await axios.patch(`/posts/${id}/`, formData)
          : await axios.post("/posts/", formData);
        console.log(data);
        navigate(`/posts/${data.slug}`);
      } else {
        if (!title) {
          setErrorMessageTitle(true);
        }
        if (!tags) {
          setErrorMessageTags(true);
        }
        if (!image.length && video.length) {
          setErrorMessageImages(false);
        } else if (image.length && !video.length) {
          setErrorMessageImages(false);
        } else {
          setErrorMessageImages(true);
        }
        alert("Заполните обязательные поля");
      }
    } catch (err) {
      console.warn(err);
      alert("Не удалось создать пост");
    }
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.name);
          setImageUrl(data.image);
          setImage(data.image);
          setVideoUrls(data.video);
          setVideo(data.video);
          setText(data.text);
          setTags(data.tags.join(","));
        })
        .catch((err) => {
          console.warn(err);
          alert("Не удалось получить пост");
        });
    }
  }, []);

  const handleCheckedComments = useCallback(() => {
    if (isCheckedComments === true) {
      setIsCheckedComments(false);
      return;
    }
    if (isCheckedComments === false) {
      setIsCheckedComments(true);
      return;
    }
  }, []);

  const openOptions = useCallback(() => {
    if (isOpen === true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (saveFromLink === true) {
      setSaveFromLink(false);
    } else {
      setSaveFromLink(true);
    }
  }, []);

  const addLinkMedia = useCallback(async () => {
    try {
      const response = await fetch(linkMedia);
      const blob = await response.blob();
      const extension = linkMedia.split(".").pop().toLowerCase();

      const isImage = ["jpeg", "jpg", "gif", "png"].includes(extension);
      const isVideo = ["mp4", "avi", "mov", "wmv", "flv"].includes(extension);

      if (isImage) {
        const file = new File([blob], "image.jpg", { type: "image/jpeg" });
        setImage((prev) => [...prev, file]);
        setImageUrl((prev) => [...prev, linkMedia]);
      } else if (isVideo) {
        const file = new File([blob], "video.mp4", { type: "video/mp4" });
        setVideo((prev) => [...prev, file]);
        setVideoUrls((prev) => [...prev, linkMedia]);
      } else {
        throw new Error("Неподдерживаемый формат медиа-файла");
      }

      setIsValidLinkMedia(true);
    } catch (err) {
      alert("Неверная ссылка на медиа-файл");
      setIsValidLinkMedia(false);
    }
  }, []);

  const handleMediaUrlChange = useCallback((val) => {
    setLinkMedia(val);
    const urlPattern =
      /^((http|https):\/\/.*\.(jpeg|jpg|gif|png|mp4|avi|mov|wmv|flv))|(data:(image|video)\/(jpeg|jpg|gif|png|mp4|avi|mov|wmv|flv);base64,([A-Za-z0-9+/=]+))$/;

    if (urlPattern.test(val)) {
      setIsValidLinkMedia(true);
    } else {
      setIsValidLinkMedia(false);
    }
  }, []);

  if (!window.localStorage.getItem("accessff")) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.root}>
      <header className={styles.headerAddPost}>
        <h2>Создание поста</h2>
        <button onClick={onSubmit}>
          {isEditing ? "Сохранить" : "Опубликовать"}
        </button>
      </header>
      <div className={styles.wrap}>
        <div className={styles.fileWrapper}>
          <div className={styles.imageBlockWrap}>
            <div className={styles.imageBlock}>
              {!imageUrl.length && !videoUrls.length && (
                <button
                  className={styles.buttonImage}
                  onClick={() => inputFileRef.current.click()}
                >
                  <FontAwesomeIcon icon={faFileArrowUp} />
                  <span>Выберите файл</span>{" "}
                  <span>
                    Рекомендуем использовать файлы высокого качества в формате
                    .jpg (размером меньше 20MB) или .mp4 (размером меньше 200MB)
                  </span>
                </button>
              )}

              <input
                ref={inputFileRef}
                type="file"
                multiple
                onChange={handleChangeFile}
                hidden
              />

              {image.length || video.length ? (
                <>
                  <button className="prev">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button className="next">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                  <button
                    className={styles.buttonAddMore}
                    onClick={() => inputFileRef.current.click()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button onClick={editImage} className={styles.buttonEditImg}>
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    initialSlide={0}
                    navigation={{
                      prevEl: ".prev",
                      nextEl: ".next",
                    }}
                    allowTouchMove={true}
                    loop
                    className={styles.sliderWrap}
                  >
                    {imageUrl.map((link, i) => (
                      <SwiperSlide
                        className={styles.slide}
                        style={{ aspectRatio: aspectRatio[link] }}
                        key={i}
                      >
                        <img
                          className={styles.image}
                          src={
                            isEditing && typeof link === "object"
                              ? `${removeApiUrl(link.image)}`
                              : `${link}`
                          }
                          alt={"uploaded"}
                          style={{ aspectRatio: aspectRatio[link] }}
                        />
                      </SwiperSlide>
                    ))}
                    {videoUrls.map((link, i) => (
                      <SwiperSlide
                        className={styles.slideVideo}
                        style={{ aspectRatio: aspectRatio[link] }}
                        key={i}
                      >
                        <video
                          className={styles.video}
                          src={
                            isEditing && typeof link === "object"
                              ? `${removeApiUrl(link.video)}`
                              : `${link}`
                          }
                          autoPlay
                          controls
                          style={{ aspectRatio: aspectRatio[link] }}
                          alt="Uploaded"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              ) : null}
              {(imageUrl && imageUrl.length) || videoUrls.length ? (
                <button
                  className={styles.buttonImageDel}
                  onClick={onClickRemoveImage}
                >
                  Удалить
                </button>
              ) : null}
            </div>
            {errorMessageImages && (
              <span className={styles.error}>Загрузите хотя бы один файл</span>
            )}
          </div>

          {saveFromLink && (
            <div className={styles.addWrapper}>
              <div className={styles.field}>
                <label htmlFor="upload-tags">Ссылка на изображение</label>
                <input
                  type="text"
                  name="tags"
                  id="upload-tags"
                  placeholder="Добавить ссылку на изображение"
                  value={linkMedia}
                  onChange={(e) => handleMediaUrlChange(e.target.value)}
                />
                {!isValidLinkMedia && (
                  <p style={{ color: "red" }}>
                    Please enter a valid image URL for
                  </p>
                )}
                <button className={styles.addLink} onClick={addLinkMedia}>
                  Добавить
                </button>
              </div>
            </div>
          )}
          <button className={styles.buttonLink} onClick={handleClick}>
            Сохранить из URL-адреса
          </button>
        </div>
        <div className={styles.addWrapper}>
          <div className={styles.field}>
            <label htmlFor="upload-title">Название</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Добавить название"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              onBlur={() => {
                if (title) {
                  setErrorMessageTitle(false);
                } else {
                  setErrorMessageTitle(true);
                }
              }}
              id="upload-title"
            />
            {errorMessageTitle && (
              <span className={styles.error}>обязательное поле</span>
            )}
          </div>
          <div className={styles.field}>
            <label htmlFor="upload-text">Описание</label>
            <textarea
              name="description"
              id="upload-text"
              placeholder="Добавить описание"
              value={text}
              rows={5}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="upload-link">Ссылка</label>
            <input
              type="text"
              name="link"
              id="upload-link"
              placeholder="Добавить ссылку"
              value={link}
              onChange={(e) => setLinks(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="upload-tags">Теги</label>
            <input
              type="text"
              name="tags"
              required
              id="upload-tags"
              placeholder="Добавить теги (через запятую)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              onBlur={() => {
                if (tags) {
                  setErrorMessageTags(false);
                } else {
                  setErrorMessageTags(true);
                }
              }}
            />
            {errorMessageTags && (
              <span className={styles.error}>обязательное поле</span>
            )}
          </div>
          <div className={styles.moreOption}>
            <div className={styles.select} onClick={openOptions}>
              <p>Дополнительные настройки</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ color: "#7A4AD8" }}
              />
            </div>
            <div className={isOpen ? styles.options : styles.optionsClose}>
              <div className={styles.option}>
                <label onClick={handleCheckedComments} htmlFor="">
                  <input
                    className={styles.hidden_checkbox}
                    type="checkbox"
                    name="comments"
                    id="upload-comments"
                    checked={isCheckedComments}
                    readOnly
                  />
                  <span className={styles.container__checkbox}></span>
                  <span>Разрешить комментировать</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export { AddPost };
