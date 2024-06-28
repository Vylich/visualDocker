import React, { memo, useEffect, useState } from "react";
import { EditImg } from "../EditImg/EditImg";
import { AddPost } from "../AddPost";
import { useSelector } from "react-redux";

const Buffer = memo(() => {
  const [isFormat, setIsFormat] = useState(false);
  const [newImg, setNewImg] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log(file);
  }, [file]);

  const src = useSelector((state) => state.img.img);
  console.log(src);
  return (
    <>
      {isFormat ? (
        <EditImg
          setIsFormat={setIsFormat}
          setFile={setFile}
          setNewImg={setNewImg}
          src={src}
        />
      ) : (
        <AddPost setIsFormat={setIsFormat} newImg={newImg} file={file} />
      )}
    </>
  );
});

export { Buffer };
