import React from "react";
import _ from "lodash";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 8,
    height: 80,
  },
  chip: {
    margin: 2,
    padding: 8,
  },
}));

const ImageMETATags = (props) => {
  const { labelAnnotations, loading } = props;
  const classes = useStyles();

  const showLoadingIndicator = () => {
    return <CircularProgress />;
  };

  const generateChips = () => {
    if (!_.isEmpty(labelAnnotations)) {
      return labelAnnotations.map((item) => (
        <Chip
          className={classes.chip}
          key={item.mid}
          size="small"
          color="primary"
          label={item.description}
        />
      ));
    }
    return undefined;
  };

  return (
    <div className={classes.container}>
      {loading ? showLoadingIndicator() : generateChips()}
    </div>
  );
};

ImageMETATags.defaultProps = {
  labelAnnotations: [],
  loading: false,
};

export default ImageMETATags;
