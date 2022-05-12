import { ThemeProvider } from "@emotion/react";
import { Button, createTheme, TextField } from "@mui/material";
import { useRef } from "react";
import { useForm, Controller } from "react-hook-form";

import "./ModalContent.css";

let theme = createTheme({
  palette: {
    primary: {
      main: "rgba(45, 45, 45, 0.904)",
    },
  },
});

const ModalContent = ({
  type,
  onFolderSubmit,
  onFileSubmit,
  onLinkSubmit,
  err,
}) => {
  let content;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const file = useRef(null);
  const folderSubmitHandler = (data) => {
    console.log(data);
    onFolderSubmit(data);
  };

  const linkSubmitHandler = (data) => {
    onLinkSubmit(data);
  };

  const fileSubmitHandler = (event) => {
    event.preventDefault();
    onFileSubmit(file.current);
  };
  switch (type) {
    case "FOLDER":
      content = (
        <ThemeProvider theme={theme}>
          <form
            onSubmit={handleSubmit(folderSubmitHandler)}
            style={{
              display: "inherit",
              flexDirection: "column",
              gap: " .7rem",
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  variant="standard"
                  label="Folder name"
                  {...field}
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                ></TextField>
              )}
              rules={{
                required: "Folder name required",
                pattern: {
                  message: "Invalid folder name",
                  value: /^[a-zA-Z._0-9]+$/,
                },
              }}
            ></Controller>
            {err && (
              <div
                style={{
                  padding: ".5rem 2rem",
                  borderStyle: "solid ",
                  borderColor: "#5f2120",
                  borderRadius: "6px",
                  textAlign: "center",
                  backgroundColor: "#fdeded",
                  color: "#5f2120",
                }}
              >
                A server error occurred
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit" disabled={false}>
                Submit
              </Button>
            </div>
          </form>
        </ThemeProvider>
      );
      break;
    case "FILE":
      content = (
        <ThemeProvider theme={theme}>
          <form
            onSubmit={fileSubmitHandler}
            style={{
              display: "inherit",
              flexDirection: "column",
              gap: " .7rem",
            }}
          >
            <input
              type="file"
              label="Folder name"
              required={true}
              ref={file}
            ></input>
            {err && (
              <div
                style={{
                  display: "block",
                  padding: ".5rem 2rem",
                  borderStyle: "solid ",
                  borderColor: "#5f2120",
                  borderRadius: "6px",
                  textAlign: "center",
                  backgroundColor: "#fdeded",
                  color: "#5f2120",
                }}
              >
                A server error occurred
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit" disabled={false}>
                Submit
              </Button>
            </div>
          </form>
        </ThemeProvider>
      );
      break;
    case "LINK":
      content = (
        <ThemeProvider theme={theme}>
          <form
            onSubmit={handleSubmit(linkSubmitHandler)}
            style={{
              display: "inherit",
              flexDirection: "column",
              gap: " .7rem",
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  variant="standard"
                  label="Link name"
                  {...field}
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                ></TextField>
              )}
              rules={{
                required: "Folder name required",
                pattern: {
                  message: "Invalid folder name",
                  value: /^[a-zA-Z._0-9]+$/,
                },
              }}
            ></Controller>
            <Controller
              name="target"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  variant="standard"
                  label="Path to file"
                  {...field}
                  error={error ? true : false}
                  helperText={error ? error.message : ""}
                ></TextField>
              )}
              rules={{
                required: "Path to file required",
                pattern: {
                  message: "Invalid path",
                  value: /^\/([a-zA-Z._0-9])+(\/[a-zA-Z._0-9]+)*/,
                },
              }}
            ></Controller>
            {err && (
              <div
                style={{
                  display: "block",
                  padding: ".5rem 2rem",
                  borderStyle: "solid ",
                  borderColor: "#5f2120",
                  borderRadius: "6px",
                  textAlign: "center",
                  backgroundColor: "#fdeded",
                  color: "#5f2120",
                }}
              >
                A server error occurred
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit" disabled={false}>
                Submit
              </Button>
            </div>
          </form>
        </ThemeProvider>
      );
      break;
    default:
      <div></div>;
      break;
  }
  return (
    <div
      className="content__container"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {content}
    </div>
  );
};

export default ModalContent;
