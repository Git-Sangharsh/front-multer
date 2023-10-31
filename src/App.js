import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState();

  const [image, setImage] = useState();

  const [imgName, setImgName] = useState();

  console.log("images is ", image);

const handleUpload = (e) => {
  const formdata = new FormData();

  formdata.append("file", file);
  formdata.append("imgName", imgName);

  axios
    .post("http://localhost:4000/upload", formdata)
    .then((res) => {
      console.log(res);
      // After a successful upload, update the 'image' state with the new image data.
      setImage([...image, { image: res.data.image, imgName: imgName }]);
    })
    .catch((err) => console.log("error while axios", err));
};


  useEffect(() => {
    axios
      .get("http://localhost:4000/getImage")
      // .then((res) => setImage(res.data[3].image))
      .then((res) => setImage(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleName = (e) => {
    setImgName(e.target.value);
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFile} />
      <button onClick={handleUpload}>Upload</button>

      <input type="text" onChange={handleName} placeholder="enter image name" />
      <br />
      {image ? (
        image.map((i) => (
          <div>
            <img
              src={`http://localhost:4000/images/${i.image}`}
              alt=""
              key={i._id}
              className="map-img"
            />
            <h1>{i.imgName}</h1>
          </div>
        ))
      ) : (
        <h1>Image is Loading</h1>
      )}

      {/* <img src={`http://localhost:4000/images/` + image} className="map-img" alt="" /> */}
    </div>
  );
};

export default App;
