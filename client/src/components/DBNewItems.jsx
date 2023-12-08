import React, { useState } from "react";
import { statuses } from "../utils/styles";
import { Spiner } from '../components';
import { FaCloudUploadAlt, MdDelete } from "../assets/icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { alertDanger, alertNULL, alertSuccess } from "../context/actions/alertActions";
import { buttonClick } from "../animations";
import { motion } from "framer-motion";

const DBNewItems = () => {
  const [itemName, setItemName] = useState("");
  const [ price, setPrice ] = useState("");
  const [ category, setCategory ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ progress, setProgress ] = useState(null);
  const [ imageDownloadURL, setImageDownloadURL ] = useState(null);

  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();


  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', 
    (snapshot) => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    (error) => {
      dispatch(alertDanger(`Error : ${error}`));
      setTimeout(() => {
        dispatch(alertNULL());
      }, 3000);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImageDownloadURL(downloadURL);
        setIsLoading(false);
        setProgress(null)
        dispatch(alertSuccess("Image Upload to the Cloud"));
        setTimeout(() => {
          dispatch(alertNULL());
        }, 3000);
      })
    } 
    );
  };

  const deleteImageFromFirebase = () => {

  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField
          type="text"
          placeholder={"Item name here..."}
          stateFunc={setItemName}
          stateValue={itemName}
        />

        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border
          border-gray-200 backdrop-blur-md ${data.category === category ? 'bg-red-400 text-primary' : 'bg-transparent'}`}
              >
                {data.title}
              </p>
            ))}
        </div>

        {/* FOR price section */}
        <InputValueField
          type="number"
          placeholder={"Item Price here..."}
          stateFunc={setPrice}
          stateValue={price}
        />

        {/* For image upload section */}
        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          { isLoading ? 
          (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spiner />
              {progress}
            </div>
          ) : 
            <>
            {!imageDownloadURL ? (
              <>
              <label>
                <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer">
                  <div className="flex flex-col justify-center items-center cursor-pointer">
                    <p className="font-bold text-4xl">
                      <FaCloudUploadAlt className="-rotate-0" />
                    </p>
                    <p className="text-lg text-textColor">
                      Click to upload an image
                    </p>
                  </div>
                </div>
                <input
                type="file"
                name="upload-image"
                accept="image/*"
                onChange={uploadImage}
                className="w-0 h-0"    
                />
              </label>
              </>
            ): <>
                <div className="relative w-full h-full overflow-hidden rounded-md">
                  <motion.img 
                  whileHover={{ scale: 1.15 }}
                  src={imageDownloadURL}
                  className=" w-full h-full object-none"                  
                  />

                  <motion.button
                  {...buttonClick}
                  className=" absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none
                  hover:shadow-md duration-500 transition-all ease-in-out"
                  onClick={() => deleteImageFromFirebase(imageDownloadURL)}>
                    <MdDelete className="-rotate-0"/>
                  </motion.button>
                </div>
               </> }
            </>
          }
        </div>

      </div>
    </div>
  );
};

export const InputValueField = ({
  type,
  placeholder,
  stateValue,
  stateFunc,
}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-lightOverlay shadow-md outline-none 
    rounded-md border border-gray-200 focus:border-red-400"
        value={stateValue}
        onChange={(e) => stateFunc(e.target.value)}
      />
    </>
  );
};

export default DBNewItems;
