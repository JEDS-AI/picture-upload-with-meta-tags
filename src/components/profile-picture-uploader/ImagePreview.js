import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    height: 400,
    overflow: "hidden",
  },
  img: {
    backgroundColor: "#C3C3C3",
    maxHeight: 400,
  },
}));

const ImagePreview = (props) => {
  const { image } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img
        className={classes.img}
        height="400px"
        src={image ? image : undefined}
        alt=""
      />
    </div>
  );
};

ImagePreview.defaultProps = {
  image: {},
};

export default ImagePreview;
