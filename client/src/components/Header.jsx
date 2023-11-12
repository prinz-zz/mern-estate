import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">
            <sub>PG</sub>
          </span>
          <span className="text-slate-700"> Estates</span>
        </h1>

        <form className="bg-slate-100 p-3 rounded-lg flex justify-between items-center">
          <input
            type="text"
            className="bg-transparent focus:outline-none w-24 sm:w-24"
            placeholder="Search..."
          />
          <FiSearch className="text-slate-500" />
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="signIn">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Sign In
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
