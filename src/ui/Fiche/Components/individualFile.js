import React, { Component } from 'react';

const styles = {
  imageDiv: {border: "2px solid #555", maxWidth:"300pt", minWidth:'100pt', height: "160px",  marginLeft:"15px", marginBottom: "15px", background: "#777", position:"relative", overflow: "hidden"},
  images: {height: "100%", verticalAlign:"middle",  textAlign:"center", margin:"0 auto"},
  text: {
    fontSize:"large",
    margin: "40px auto",
    fontWeight:"bold",
    color:"#fff",
    textTransform: "uppercase",
    textAlign:"center"
  }
};

export default class IndividualFile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {image} = this.props;
    if(image.ext == undefined || (image.ext == "png" || image.ext == "jpg" || image.ext == "jpeg")){
      return (
        <div style={styles.imageDiv} className="image">
          <div className="imageInfo">{image.name}</div>
          <img  src={"/cdn/storage/Images/"+image._id+"/original/"+image._id+".png"} style={styles.images} />
        </div>)
    } else {
      return (<a href={"/cdn/storage/Images/"+image._id+"/original/"+image._id+"."+image.ext}>
        <div style={styles.imageDiv} className="image">
          <div className="imageInfo">{image.name}</div>
          <div style={styles.text}>{image.ext}</div>
        </div></a>)
    }
  }
};
