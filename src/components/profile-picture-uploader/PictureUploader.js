import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ImagePreview from "./ImagePreview";
import ImageMETATags from "./ImageMETATags";
import ImageSelection from "./ImageSelection";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(() => ({
  grid: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
  },
}));

const PictureUploader = () => {
  const classes = useStyles();
  const APIkey = "YOUR-API-KEY-HERE";
  const [image, setImage] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [APIResponse, setAPIResponse] = React.useState([]);

  const detectFaces = async (image) => {
    // required body for Google Cloud Vision API call
    const body = JSON.stringify({
      requests: [
        {
          image: {
            content: image,
          },
          features: [
            {
              type: "LABEL_DETECTION",
              maxResults: 20,
            },
          ],
        },
      ],
    });

    return fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${APIkey}`,
      {
        method: "POST",
        body: body,
      }
    ).then((response) => {
      if (response.ok) {
        return response.json().then((json) => json);
      }
    });
  };

  const handleImageInput = (event) => {
    if (event.target.files && event.target.files[0]) {
      // display loading
      setLoading(true);
      // display image in ImagePreview
      setImage(URL.createObjectURL(event.target.files[0]));
      // prepare image for upload with FileReader
      const reader = new FileReader();
      reader.onload = async (readerEvent) => {
        // calling detectFaces func
        await detectFaces(btoa(readerEvent.target.result)).then((response) => {
          // update API response to update ImageMETATags
          console.log(response.responses[0].labelAnnotations);
          setAPIResponse(response.responses[0].labelAnnotations);
          // hide loading
          setLoading(false);
        });
      };
      reader.readAsBinaryString(event.target.files[0]);
    }
  };

  return (
    <Grid container>
      <Grid item xs={4} />
      <Grid item xs={4} className={classes.grid}>
        <Paper className={classes.paper}>
          <ImagePreview image={image} />
          <ImageMETATags labelAnnotations={APIResponse} loading={loading} />
          <ImageSelection image={image} onChange={handleImageInput} />
        </Paper>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default PictureUploader;
