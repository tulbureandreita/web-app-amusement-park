import { createUseStyles } from "react-jss";
const useStyles = createUseStyles({
  takePicturesContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: 24,
  },

  takePicturesButton: {
    padding: "12px 24px",
    fontSize: "1.1rem",
    fontWeight: 600,
    borderRadius: "2rem",
    textTransform: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
    boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
  },
});
export default useStyles;
