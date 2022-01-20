import { useEffect } from "react";

import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import ModalOverlay from "../modal-overlay/modal-overlay";

const MODAL_ROOT = document.getElementById("modal-root");

function Modal({ close, children, title }) {
  useEffect(() => {
    function closeOnEsc(e) {
      if (e.key === "Escape" || e.key === "Esc") {
        close();
      }
    }
    document.addEventListener("keyup", closeOnEsc);

    return () => {
      document.removeEventListener("keyup", closeOnEsc);
    };
  }, [close]);

  return ReactDOM.createPortal(
    <div>
      <ModalOverlay close={close} />
      <div className={styles.modal}>
        <span className={styles.close}>
          <CloseIcon type="primary" onClick={close} />
        </span>
        <h3
          className={
            styles.title + " text text_type_main-large pt-3 mt-10 pr-10 pl-10"
          }
        >
          {title}
        </h3>
        {children}
      </div>
    </div>,
    MODAL_ROOT
  );
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default Modal;