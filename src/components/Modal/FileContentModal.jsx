import "./FileContentModal.css";
import { createPortal } from "react-dom";

const FileContentModal = (props) => {
  const { name, content, close, path } = props;
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
          <span>
            {name}
            {props.path ? (
              <span style={{ color: "green" }}>
                {" "}
                <i className="fa-solid fa-right-long"></i> {" " + props.path}
              </span>
            ) : (
              ""
            )}
          </span>
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
    </div>,
    document.body
  );
};

export default FileContentModal;
