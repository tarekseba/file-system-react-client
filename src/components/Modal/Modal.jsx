import "./Modal.css";
import { createPortal } from "react-dom";
import ModalContent from "./ModalContent/ModalContent";

const Modal = (props) => {
  const { type, close, onFolderSubmit, onFileSubmit, onLinkSubmit, err } =
    props;
  return createPortal(
    <div
      className="modal__wrapper"
      onClick={
        close
          ? (event) => {
              close(false);
            }
          : null
      }
    >
      <ModalContent
        type={type}
        onSubmitHandler={null}
        onFileSubmit={onFileSubmit}
        onFolderSubmit={onFolderSubmit}
        onLinkSubmit={onLinkSubmit}
        err={err}
      ></ModalContent>
      {/* <Content
        difficulty={difficulty}
        dispatch={close}
        difficultyAction={difficultyAction}
        winner={winner}
      /> */}
    </div>,
    document.body
  );
};

export default Modal;
