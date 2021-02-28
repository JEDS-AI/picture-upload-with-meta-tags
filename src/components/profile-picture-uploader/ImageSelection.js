import React from "react";
import { Input, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
}));

const ImageSelection = (props) => {
  const { onChange } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Input type="file" onChange={onChange} />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </div>
  );
};

export default ImageSelection;
