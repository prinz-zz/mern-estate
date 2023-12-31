import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      setLoading(true);
      const res = await axios.post("/api/auth/signUp", formData);
      const data = await res.data;
      console.log(data);
      setLoading(false);
      navigate("/signIn");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="border p-3 rounded-xl focus:outline-none"
          required
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        {/* <OAuth/> */}
      </form>
      <div className="my-3">
        <p>
          Have an account?
          <Link to="/signIn" className="text-blue-700 ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
