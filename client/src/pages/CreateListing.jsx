import { useState } from "react";
import { app } from "../firebase.js";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    name: "",
    description: "",
    address: "",
    type: "rent",
    regularPrice: 50,
    discountedPrice: 0,
    bedrooms: 1,
    bathrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
  });
  const [imgUploadError, setImgUploadError] = useState(false);
  const [upLoading, setUpLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  ///console.log(currentUser.id);

  //console.log(formData);

  //////////////
  const handleImageUpload = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUpLoading(true);
      setImgUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImgUploadError(false);
        })
        .catch((error) => {
          setImgUploadError(
            toast.error("Image upload failed (2mb max per image)")
          );
          setUpLoading(false);
        });
    } else {
      setImgUploadError(
        toast.error("You can only upload 6 images per listing")
      );
      setUpLoading(false);
    }
  };

  ////////////////////////////////
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
          setUpLoading(true);
        },
        (error) => {
          reject(error);
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
            setUpLoading(false);
          });
          toast.success("Image Upload Success");
        }
      );
    });
  };

  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
    toast.success("Image(s) deleted successfully");
  };

  ////////////////////////////////////////////////////////////////
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    /////////BOOLEAN////////
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return toast.error("You must upload at least one image");
      }
      if (+formData.regularPrice < +formData.discountedPrice) {
        return toast.error("Discounted price must be lower than regular price");
      }
      setLoading(true);
      setError(false);
      const res = await axios.post("/api/listing/create", {
        ...formData,
        userRef: currentUser.id,
      });
      const data = await res.data;
      console.log(data);
      setLoading(false);
      setError(false);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            className="border p-3 rounded-xl focus:outline-none"
            placeholder="name"
            type="text"
            id="name"
            maxLength="60"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            className="border p-3 rounded-xl focus:outline-none"
            placeholder="Description"
            type="textarea"
            id="description"
            maxLength="1000"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            className="border p-3 rounded-xl focus:outline-none"
            placeholder="Address"
            type="text"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center">
              <input
                className="w-5"
                type="checkbox"
                id="sale"
                className="w-5 h-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <label>Sell</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <label>Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <label>Parking spot</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <label>Furnished</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5"
                onChange={handleChange}
                checked={formData.offer}
              />
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
                onChange={handleChange}
                value={formData.bedrooms}
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
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <label>Bathrooms</label>
            </div>
            <div className="flex gap-6 items-center">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                className="border border-gray p-3 rounded-xl focus:outline-none"
                required
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <label>Regular Price / month</label>
            </div>

            {formData.offer && (
              <div className="flex gap-6 items-center">
                <input
                  type="number"
                  id="discountedPrice"
                  min="0"
                  max="100000"
                  className="border border-gray p-3 rounded-xl focus:outline-none"
                  required
                  onChange={handleChange}
                  value={formData.discountedPrice}
                />
                <label>Discounted Price / month</label>
              </div>
            )}
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
              disabled={upLoading}
              className="border border-green-600 text-white bg-green-600 p-3 rounded-lg uppercase hover:text-white hover:bg-green-800 disabled:opacity-50">
              {upLoading ? "Uploading..." : "upload"}
            </button>
          </div>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((imageUrl, index) => (
              <div
                key={imageUrl}
                className="flex justify-between p-3 items-center">
                <img
                  src={imageUrl}
                  alt="listing image"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button type="button" onClick={() => handleImageDelete(index)}>
                  <FaTrash className="bg-red-700 text-white p-1 w-7 h-7 rounded-lg" />
                </button>
              </div>
            ))}

          <button
            disabled={loading || upLoading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center disabled:opacity-75">
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
