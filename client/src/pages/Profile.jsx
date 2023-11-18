import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserStart,
  updatedUserSuccess,
  updatedUserError,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserError,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserError,
} from "../redux/userSlice.js";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.put(
        `/api/user/update/${currentUser.id}`,
        formData
      );
      const data = await res.data;
      console.log(data);
      dispatch(updatedUserSuccess(data));
      toast.success("User updated successfully");
    } catch (error) {
      dispatch(updatedUserError(toast.error(error?.response?.data?.message)));
    }
  };

  const handleDelete = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser.id}`);
      const data = await res.data;
      dispatch(deleteUserSuccess(data));
      toast.success("User deleted successfully");
    } catch (error) {
      dispatch(deleteUserError(toast.error(error?.response?.data?.message)));
    }
  };

  const handleSignout = async (e) => {
    try {
      dispatch(signoutUserStart());
      const res = await axios.post("/api/auth/signout");
      const data = await res.data;
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserError(toast.error(error?.response?.data?.message)));
    }
  };

  const handleShowListings = async () => {
    try {
      const res = await axios.get(`/api/user/listings/${currentUser.id}`);
      const data = await res.data;
      console.log(data);
      setUserListings(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleListEdit = async () => {

  }
  const handleListDelete = async (listingId) => {
      
    try {
      const res = await axios.delete(`/api/listing/delete/${listingId}`);
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
      toast.success("Listing deleted Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="text-3xl font-semibold text-center my-10 ">Profile</div>
      <form onSubmit={handleUpload} className="flex flex-col gap-7">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          id="img-upload"
          onClick={() => fileRef.current.click()}
        />

        <div className="text-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Upload error (Image must be less than 2 MB)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-slate=700">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-700">Upload Sucessfull</span>
          ) : (
            ""
          )}
        </div>

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-xl focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-xl focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border p-3 rounded-xl focus:outline-none"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          to="/create-listing"
          className="bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-95 text-center disabled:opacity-75">
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between my-5 ">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <button onClick={handleShowListings} className="text-green-700 w-full">
        Show Listings
      </button>
      {userListings &&
        userListings.length > 0 &&
        
        <div className=''>
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
        {userListings.map((list) => (
          <div
            className="my-3 p-3 flex justify-between items-center border rounded-lg border-slate-300"
            key={list._id}>
            <Link
              to={`/listing/${list._id}`}
              className="flex justify-between items-center">
              <img
                src={list.imageUrls[0]}
                alt="listing image"
                className="w-16 h-16 object-contain rounded-lg"
              />
              <p>{list.name}</p>
            </Link>
            <div className="flex flex-col items-center gap-4">
              <button onClick={handleListEdit}>
                <FaEdit className="text-green-700" />
              </button>
              <button onClick={()=> handleListDelete(list._id)}>
                <FaTrash className="text-red-700" />
              </button>
            </div>
          </div>
        )
        )}
        </div>
        }
        
    </div>
  );
}
