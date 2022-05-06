import "./FileContentModal.css";
import { createPortal } from "react-dom";

const FileContentModal = (props) => {
  const { name, content, close } = props;
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
      <div
        className="content__container2"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="content__header">
          <span>{name}</span>
          <i
            className="fa-solid fa-circle-xmark"
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={() => {
              close(false);
            }}
          ></i>
        </div>
        <div className="content__content">{content}</div>
      </div>
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

export default FileContentModal;
