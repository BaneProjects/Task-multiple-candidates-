import { useState } from "react";
import img_1 from "../images/slika_1.jpg";
import img_2 from "../images/slika_2.jpg";
import img_3 from "../images/slika_3.png";
import img_4 from "../images/slika_4.jpg";
const Static = () => {
  const images = [img_1, img_2, img_3, img_4];
  const [selectedImg, setSelectedImg] = useState(images[0]);
  return (
    <>
      <div className="frame">
        <h1>Skills</h1>
        <div className="static-frame">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </p>
          <h1>Gallery</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.
          </p>
        </div>

        <div className="container">
          <img src={selectedImg} alt="selected" className="selected" />
          <div className="imgContainer">
            {images.map((img, index) => {
              console.log(img);
              return (
                <img
                  style={{
                    border: selectedImg === img ? "4px solid green" : "",
                  }}
                  alt={img}
                  src={img}
                  key={index}
                  onClick={() => setSelectedImg(img)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Static;
