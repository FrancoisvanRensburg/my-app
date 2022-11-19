import styles from "@/styles/Modal.module.css";
import { FaTimes } from "react-icons/fa";
import { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface IProps {
  show: boolean;
  onClose: any;
  children: ReactNode;
  title?: string;
}

function Modal(props: IProps) {
  let { show, children, title, onClose } = props;
  const [isBrowser, setIsBrowser] = useState<boolean>(false);

  const modalRef = useRef();
  useOnClickOutside(modalRef, () => onClose());

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  function handleClose(e: any) {
    e.preventDefault();
    onClose();
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      {/*@ts-ignore The useClick outside already only fires if the ref is current*/}
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.header}>
          <a href={""} onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    // @ts-ignore
    return ReactDOM.createPortal(modalContent, document.getElementById("modal-root"));
  }

  return null;
}

export default Modal;
