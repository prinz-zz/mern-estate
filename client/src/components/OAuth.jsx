import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/userSlice.js';

export default function OAuth() {
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider)
      const resData = {
        name: result.user.displayName,
        email : result.user.email,
        photo : result.user.photoURL
      }
      const res = await axios.post('api/auth/google', resData)
      const data = await res.data;
      dispatch(signInSuccess(data))
      
    } catch (error) {
      console.log("Could not signin with Google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
      Continue with Google
    </button>
  );
}
