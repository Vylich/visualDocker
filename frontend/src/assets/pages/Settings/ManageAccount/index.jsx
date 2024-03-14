import React, { useEffect, useState } from "react";
import styles from "./ManageAccount.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeleteAccount,
  fetchLogin,
  logout,
} from "../../../../redux/slices/auth";
import axios from "../../../../axios";
import { useNavigate } from "react-router-dom";

const ManageAccount = ({
  password,
  setPassword,
  email,
  setEmail,
  gender,
  setGender,
  birthday,
  setBirthday,
  setIdUser,
  selectedValue,
  setSelectedValue,
}) => {
  const userdata = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLogin());
  }, []);

  useEffect(() => {
    if (userdata) {
      setEmail(userdata.user.email);
      setGender(userdata.user.gender);
      setBirthday(new Date(userdata.user.birthday).toISOString().slice(0, 10));
      setIdUser(userdata.user.id);
    }
  }, [userdata]);

  const delAccount = () => {
    if (window.confirm("Вы правда хотите удалить аккаунт?")) {
      dispatch(fetchDeleteAccount(userdata.user.id)).then(() => {
        dispatch(logout());
        navigate("/login");
        window.localStorage.removeItem("access");
        window.localStorage.removeItem("refresh");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("avatar");
      });
    }
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2>Управление Аккаунтом</h2>
        <p>Вы можете изменить персональные данные или тип аккаунта.</p>
      </header>
      <div className={styles.block}>
        <h3>Ваш аккаунт</h3>
        <div className={styles.blockWrap}>
          <div className={styles.field}>
            <label className={styles.labelText} htmlFor="email">
              Электронная почта • Скрытая информация
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
          <div className={styles.fieldPass}>
            <div className={styles.field}>
              <label className={styles.labelText} htmlFor="pass">
                Пароль
              </label>
              <input
                type="text"
                name="pass"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="pass"
              />
            </div>
            <button>Изменить</button>
          </div>
          <div className={styles.fieldBusiness}>
            <div>
              <h4>Переход на бизнес-аккаунт</h4>
              <p>
                С бизнес-аккаунтом вы получите доступ к таким инструментам, как
                рекламные объявления и аналитика, которые помогут вывести ваш
                бизнес на новый уровень в Visual.
              </p>
            </div>
            <button>Изменить тип</button>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <h3>Персональные данные</h3>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.labelText} htmlFor="birthday">
              Дата рождения
            </label>
            <input
              type="date"
              name="birthday"
              placeholder="Дата рождения"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              id="birthday"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.labelText}>Пол</label>
            <div className={styles.radioInput}>
              <div className={styles.inputItem}>
                {" "}
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  id="male"
                />
                <label htmlFor="male">Мужской</label>
              </div>
              <div className={styles.inputItem}>
                {" "}
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  id="female"
                />
                <label htmlFor="female">Женский</label>
              </div>
              <div className={styles.inputItem}>
                <input
                  type="radio"
                  name="gender"
                  value=""
                  checked={gender === ""}
                  onChange={(e) => setGender(e.target.value)}
                  id="none"
                />
                <label htmlFor="none">Не указывать</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <h3>Деактивация и удаление</h3>
        <div className={styles.blockWrap}>
          <div className={styles.blockWrapDelete}>
            <div>
              <h4>Удаление данных и аккаунта</h4>
              <p>
                Безвозвратное удаление данных и всего, что связано с аккаунтом
              </p>
            </div>
            <button onClick={delAccount}>Удалить аккаунт</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccount;

//      <div className={styles.field}>
//        <label className={styles.labelText} htmlFor="pass">
//          Страна/регион
//        </label>
//        <select
//          name="country"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//        >
//          <option value="ru">Санкт-Петербург</option>
//          <option value="en">Москва</option>
//        </select>
//      </div>
//      <div className={styles.field}>
//        <label className={styles.labelText} htmlFor="pass">
//          Язык
//        </label>
//        <select
//          name="lang"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//          id="pass"
//        >
//          <option value="ru">Русский</option>
//          <option value="en">Английский</option>
//        </select>
//      </div>
//
//
//
//
//
// 	<div className={styles.blockWrapDelete}>
// 		<div>
// 			<h4>Отключить аккаунт</h4>
// 			<p>Временно скройте профиль</p>
// 		</div>
// 		<button>Отключить аккаунт</button>
// 	</div>
