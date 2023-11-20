import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  console.log(listing);

  useEffect(() => {
    try {
      const fetchlandlord = async () => {
        const res = await axios.get(`/api/user/${listing.userRef}`);
        const data = res.data;
        setLandlord(data);
      };
      fetchlandlord();
    } catch (error) {
      console.log(error);
    }
  }, [listing.userRef]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landlord && (
        <>
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            value={message}
            rows="5"
            className="w-full border p-3 rounded-lg outline-none"
            onChange={handleChange}
            placeholder="Enter your message"></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-center text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-75">
            Send message
          </Link>
        </>
      )}
    </>
  );
}
