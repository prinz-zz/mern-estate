export default function Profile() {
  const handleChange = () => {};

  return (
    <div className="p3 max-w-lg mx-auto">
      <div className="text-3xl font-semibold text-center my-10 ">Profile</div>
      <form className="flex flex-col gap-7">
        <input
          type="username"
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
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
          Update
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between my-5 ">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
