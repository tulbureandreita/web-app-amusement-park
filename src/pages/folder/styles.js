import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  mainWrapper: {
    padding: 20,
  },
  buttonsWrapper: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
  },
  imageBox: {
    position: "relative",
    display: "inline-block",
  },
  checkbox: {
    position: "absolute !important",
    top: 5,
    left: 5,
    background: "#fff",
    borderRadius: 4,
  },
  image: {
    width: 150,
    height: 150,
    objectFit: "cover",
    borderRadius: 8,
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: 20,
    maxHeight: "80vh",
    overflowY: "auto",
    borderRadius: 8,
    minWidth: 300,
  },
  previewGrid: {
    marginTop: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 6,
  },
});
export default useStyles;
