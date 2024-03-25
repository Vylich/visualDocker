import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AuthErrorModal from "../../components/ModalLogin/Error";
import AuthSuccessModal from "../../components/ModalLogin/Success";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../img/logo/Logo.svg";

import styles from "./Login.module.scss";
import {
  fetchLogin,
  fetchUserData,
  selectIsAuth,
} from "../../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [userName, setUserName] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [typePass, setTypePass] = useState("password");
  const navigate = useNavigate();

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleAuthError = () => {
    setIsErrorModalOpen(true);
  };

  const handleAuthSuccess = (username) => {
    setIsSuccessModalOpen(true);
  };

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchUserData(values));

    console.log(data);
    if (!data.payload) {
      handleAuthError();
    }

    if ("access" in data.payload) {
      window.localStorage.setItem("access", data.payload.access);
      window.localStorage.setItem("refresh", data.payload.refresh);
      const user = await dispatch(fetchLogin());
      if (user.payload) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        navigate("/home");
        if (
          !users.find((item) => item.username === user.payload.user.username)
        ) {
          const obj = {
            id: user.payload.user.id,
            username: user.payload.user.username,
            avatar: user.payload.user.avatar,
            access: data.payload.access,
            refresh: data.payload.refresh,
          };
          users.push(obj);
          window.localStorage.setItem("users", JSON.stringify(users));
          window.localStorage.setItem("username", user.payload.user.username);
          window.localStorage.setItem("avatar", user.payload.user.avatar);
          console.log(user.payload);
          navigate("/home");
        }

      }
    }
  };

  const handleChecked = () => {
    if (isChecked === true) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  const handleShow = () => {
    if (isShowPass) {
      setIsShowPass(false);
      setTypePass("text");
    } else {
      setIsShowPass(true);
      setTypePass("password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__block}>
        <header className={styles.container__header}>
          <img src={logo} width={70} alt="Логотип" />
          <h2>Вход Visual</h2>
        </header>
        <form
          className={styles.container__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.field}>
            <input
              type="text"
              required
              autoComplete="off"
              placeholder="Телефон или почта"
              {...register("email", { required: "Укажите почту" })}
            />
          </div>
          <div className={styles.field}>
            <input
              type={typePass}
              required
              placeholder="Пароль"
              {...register("password", { required: "Укажите пароль" })}
            />
            <button
              type="button"
              onClick={handleShow}
              className={styles.showPass}
            >
              {!isShowPass ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </button>
          </div>
          <div className={styles.container__additional}>
            <div className={styles.container__remember}>
              <label onClick={handleChecked} htmlFor="form-remember">
                <input
                  className={styles.hidden_checkbox}
                  type="checkbox"
                  name="policy"
                  id="form-policy"
                  checked={isChecked}
                  readOnly
                />
                <span className={styles.container__checkbox}></span>
                <span>Запомнить меня</span>
              </label>
            </div>
            <div>
              <Link>Забыли пароль?</Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={isValid ? styles.btnLogin : styles.disabled}
          >
            Войти
          </button>
        </form>
      </div>
      <div className={styles.container__block}>
        <div className={styles.container__register}>
          <p>У вас еще нет аккаунта?</p>
          <Link to="/login/reg">Зарегистрироваться</Link>
        </div>
      </div>
      <AuthErrorModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        errorMessage="Ошибка авторизации"
      />
      <AuthSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        username={userName}
      />
    </div>
  );
};
