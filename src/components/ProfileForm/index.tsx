import styles from "../../pages/Profile/styles.module.css";
import { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  getProfileInfo,
  patchProfileInfo,
  setProfileValue,
} from "../../services/actions/profileActions";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ProfileForm: React.FC = () => {
  const nameRef: any = useRef(null);
  const loginRef: any = useRef(null);
  const passwordRef: any = useRef(null);
  const onNameIconClick = () => {
    setTimeout(() => nameRef.current.focus(), 0);
  };
  const onLoginIconClick = () => {
    setTimeout(() => loginRef.current.focus(), 0);
  };
  const onPasswordIconClick = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
  };

  const dispatch = useAppDispatch();

  const { name, login, password } = useAppSelector((store) => store.profile);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProfileValue(e.target.name, e.target.value));
  };

  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(patchProfileInfo(name, login, password));
    },
    [name, login, password, dispatch]
  );

  const onFormReset = useCallback(() => {
    dispatch(getProfileInfo());
  }, [dispatch]);

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onFormChange}
          icon={"EditIcon"}
          value={name}
          name={"name"}
          error={false}
          onIconClick={onNameIconClick}
          errorText={"Ошибка"}
          size={"default"}
          ref={nameRef}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={onFormChange}
          icon={"EditIcon"}
          value={login}
          name={"login"}
          error={false}
          onIconClick={onLoginIconClick}
          errorText={"Ошибка"}
          size={"default"}
          ref={loginRef}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={onFormChange}
          icon={"EditIcon"}
          value={password}
          name={"password"}
          error={false}
          onIconClick={onPasswordIconClick}
          errorText={"Ошибка"}
          size={"default"}
          ref={passwordRef}
        />
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
        <div className={styles.button}>
          <Button
            type="primary"
            size="medium"
            onClick={onFormReset}
            htmlType="reset"
          >
            Отмена
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
