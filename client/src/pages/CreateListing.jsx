import { useState } from "react";
import { app } from "../firebase.js";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imgUploadError, setImgUploadError] = useState(false);

  console.log(formData);

  //////////////
  const handleImageUpload = (e) => {
    if (files.length > 0 && files.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImgUploadError(false);
      }).catch((error) => {
        setImgUploadError(toast.error('Image upload failed (2mb max per image)'));
      });
      
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-xl focus:outline-none"
            placeholder="name"
            type="text"
            id="name"
            maxLength="60"
            minLength="10"
            required
          />
          <textarea
            className="border p-3 rounded-xl focus:outline-none"
            placeholder="Description"
            type="text"
            id="Description"
            maxLength="60"
            minLength="10"
            required
          />
          <input
            className="border p-3 rounded-xl focus:outline-none"
            placeholder="Address"
            type="text"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="sale" className="w-5" />
              <label>Sell</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rent" className="w-5" />
              <label>Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="parking" className="w-5" />
              <label>Parking spot</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="furnished" className="w-5" />
              <label>Furnished</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="offer" className="w-5" />
              <label>Offer</label>
            </div>
          </div>

          <div className="flex gap-8 flex-wrap">
            <div className="flex gap-6 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                className="border border-grey p-3 rounded-xl focus:outline-none"
                required
              />
              <label>Bedrooms</label>
            </div>
            <div className="flex gap-6 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                className="border border-gray p-3 rounded-xl focus:outline-none"
                required
              />
              <label>Bathrooms</label>
            </div>
            <div className="flex gap-6 items-center">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                className="border border-gray p-3 rounded-xl focus:outline-none"
                required
              />
              <label>Regular Price / month</label>
            </div>
            <div className="flex gap-6 items-center">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                className="border border-gray p-3 rounded-xl focus:outline-none"
                required
              />
              <label>Discounted Price / month</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-700 ml-2">
              The first image will be cover (max 6).
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="images/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="border border-green-600 text-green-700 p-3 rounded-lg uppercase hover:text-white hover:bg-green-800">
              Upload
            </button>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center disabled:opacity-75">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
