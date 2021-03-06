import styles from "./styles.module.css";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import Loader from "../../components/Loader";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  postForgotPasswordRequest,
  setForgotPasswordFormValue,
} from "../../services/actions/forgotPasswordActions";

interface LocationState {
  from: {
    pathname: string;
  };
}

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { email } = useAppSelector((store) => store.forgotPassword.form);
  const { forgotPasswordRequest, forgotPasswordFailed } = useAppSelector(
    (store) => store.forgotPassword
  );
  const { isLoggedIn } = useAppSelector((store) => store.profile);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setForgotPasswordFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(postForgotPasswordRequest(email, history));
    },
    [email, dispatch, history]
  );

  if (isLoggedIn) {
    return (
      <Redirect
        // Если объект state не является undefined, вернём пользователя назад.
        to={location?.state?.from || "/"}
      />
    );
  }

  return (
    <main className={styles.section}>
      <div className={styles.container}>
        {forgotPasswordRequest ? (
          <Loader />
        ) : forgotPasswordFailed ? (
          <h1>Произошла ошибка при отправке данных</h1>
        ) : (
          <>
            <h2 className={styles.heading}>Восстановление пароля</h2>
            <form className={styles.form} onSubmit={onFormSubmit}>
              <div className={styles.input}>
                <Input
                  type={"email"}
                  placeholder={"Укажите e-mail"}
                  onChange={onFormChange}
                  value={email}
                  error={false}
                  errorText={"Ошибка"}
                  size={"default"}
                  name={"email"}
                />
              </div>
              <div className={styles.button}>
                <Button type="primary" size="medium">
                  Восстановить
                </Button>
              </div>
            </form>
            <div className={styles.footer}>
              <p className={styles.text}>Вспомнили пароль?</p>
              <Link className={styles.text} to="/login">
                Войти
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default ForgotPassword;
