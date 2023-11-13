import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInError } from '../redux/userSlice.js';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state)=> state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    //e.preventDefault();
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await axios.post("/api/auth/signIn", formData);
      const data = res.data;
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInError(toast.error(error?.response?.data?.message)))
    }
  };

  return (
    <div className="p3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border p-3 rounded-xl focus:outline-none"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border p-3 rounded-xl focus:outline-none"
          required
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="my-3">
        <p>
          Dont have an account? 
          <Link to="/signUp" className="text-blue-700 ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
