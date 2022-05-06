import { useState } from "react";
import FileContentModal from "./Modal/FileContentModal";

const File = (props) => {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState("");
  const deleteEntity = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081" + props.path + props.name,
        { method: "DELETE" }
      );
      if (response.status !== 200) {
        throw new Error("Deletion failed");
      }
      props.onDelete(props.index);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchContent = async () => {
    try {
      const result = await fetch(
        "http://localhost:8081" + props.path + props.name,
        {
          method: "GET",
        }
      );
      if (result.status !== 200) throw new Error("Fetching content failed!");
      const blob = await result.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = props.name;
      a.click();
      const text = await blob.text();
      setContent(text);
      setModal(true);
    } catch (err) {
      throw err;
    }
  };

  const onClickHandler = async () => {
    await fetchContent();
    setModal(true);
  };

  const onDeleteHandler = () => {
    deleteEntity();
  };

  return (
    <>
      {modal && (
        <FileContentModal
          FileContentModal
          close={setModal}
          name={props.name}
          content={content}
        ></FileContentModal>
      )}
      <div className="folder__header" onClick={onClickHandler}>
        <div className="clickable__container clickable">
          <i className="fa-solid fa-file"></i>
          <span>{props.name}</span>
          <span
            style={{ fontSize: "10px", marginLeft: ".6rem", color: "gray" }}
            className="displayable"
          >
            {props.size} BYTE
          </span>
        </div>
        <i
          className="fa-solid fa-trash clickable displayable"
          style={{ marginLeft: "auto" }}
          onClick={(event) => {
            event.stopPropagation();
            onDeleteHandler();
          }}
        ></i>
      </div>
    </>
  );
};

export default File;
