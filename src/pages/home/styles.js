import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  mainWrapper: {
    padding: 20,
  },
  folderItem: {
    cursor: "pointer",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
  },
});

export default useStyles;
