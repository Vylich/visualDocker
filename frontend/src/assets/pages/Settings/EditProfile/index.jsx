import { useState, useRef, useEffect, memo, useCallback } from "react";
import styles from "./EditProfile.module.scss";
import axios from "../../../../axios";
import avatarDefault from "../../../../img/avatar-default.svg";

import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../../../redux/slices/auth";

const EditProfile = memo(
  ({
    imageUrl,
    setImageUrl,
    name,
    setName,
    surname,
    setSurname,
    username,
    setUsername,
    setIdUser,
    setUrl,
    setDescription,
    url,
    description,
    idUser,
    image,
    setImage,
  }) => {
    // const [imageUrl, setImageUrl] = useState('')
    // const [name, setName] = useState('')
    // const [surname, setSurname] = useState('')
    // const [username, setUsername] = useState('')
    const userdata = useSelector((state) => state.auth.data);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(fetchLogin());
    }, []);
    useEffect(() => {
      if (userdata) {
        setName(userdata.user.first_name);
        setSurname(userdata.user.last_name);
        setUsername(userdata.user.username);
        setUrl(userdata.user.url);
        setDescription(userdata.user.description);
        setIdUser(userdata.user.id);
        setImage(userdata.user.avatar);
      }
    }, [userdata]);

    const inputFileRef = useRef(null);

    const handleChangeFile = useCallback(async (evt) => {
      setImage(evt.target.files[0]);
      setImageUrl(URL.createObjectURL(evt.target.files[0]));
      console.log(imageUrl);

      //  const users = JSON.parse(localStorage.getItem("users")) || [];
      //  const invalidObj = users.find((item) => item.username === username);
      //  const newUsers = users.splice(users.indexOf(invalidObj), 1);
      //  window.localStorage.setItem("users", JSON.stringify(newUsers));

      //  const obj = {
      //    username: userdata.user.username,
      //    avatar: userdata.user.avatar,
      //    refresh: invalidObj.refresh,
      //    access: invalidObj.access,
      //  };
      //  users.push(obj);
      //  window.localStorage.setItem("users", JSON.stringify(users));
    }, []);

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h2>Изменение Профиля</h2>
          <p>
            Позаботьтесь о конфиденциальности личных данных. Добавляемая вами
            информация видна всем, кто может просматривать ваш профиль.
          </p>
        </header>
        <div className={styles.wrapper}>
          <div className={styles.image}>
            <label>Аватар</label>
            <div className={styles.imageBlock}>
              <input
                ref={inputFileRef}
                type="file"
                onChange={handleChangeFile}
                hidden
              />
              <img
                className={styles.image}
                src={
                  imageUrl
                    ? imageUrl
                    : image
                      ? `https://visualapp.ru${image}`
                      : avatarDefault
                }
                alt="Avatar"
              />
              <button onClick={() => inputFileRef.current.click()}>
                Изменить
              </button>
            </div>
          </div>
          <div className={styles.name}>
            <div className={styles.field}>
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                name="name"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="surname">Фамилия</label>
              <input
                type="text"
                name="surname"
                placeholder="Фамилия"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                id="surname"
              />
            </div>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="description">Описание</label>
              <textarea
                name="description"
                id="description"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="web-site">Веб-сайт</label>
              <input
                type="text"
                name="web-site"
                placeholder="Веб-сайт"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                id="web-site"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="username">Имя пользователя</label>
              <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export { EditProfile };
