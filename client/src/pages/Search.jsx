import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  console.log(listings);

  const handleChange = (e) => {
    ////////////INPUT STRING
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSearchData({ ...searchData, type: e.target.id });
    }

    //////INPUT TEXT
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }

    ///////////INPUT BOOLEAN
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSearchData({
        ...searchData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    ///////////INPUT SELECT
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchData({ ...searchData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("type", searchData.type);
    urlParams.set("sort", searchData.sort);
    urlParams.set("order", searchData.order);
    urlParams.set("parking", searchData.parking);
    urlParams.set("furnished", searchData.furnished);
    urlParams.set("offer", searchData.offer);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const orderFromUrl = urlParams.get("order");
    const sortFromUrl = urlParams.get("sort");
    const offerFromUrl = urlParams.get("offer");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      orderFromUrl ||
      sortFromUrl ||
      offerFromUrl ||
      furnishedFromUrl
    ) {
      setSearchData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        order: orderFromUrl || "desc",
        sort: sortFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await axios.get(`/api/listing/get?${searchQuery}`);
        const data = await res.data;
        setListings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, [location.search]);

  return (
    <div className="p-3 max-w-full flex flex-col sm:flex-row gap-4">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term
            </label>
            <input
              className="border p-3 rounded-xl focus:outline-none w-full"
              placeholder="Search..."
              type="text"
              id="searchTerm"
              value={searchData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-6 flex-wrap pt-7">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2 items-center">
              <input
                className="w-5 h-5"
                type="checkbox"
                id="rentAndsale"
                onChange={handleChange}
                checked={searchData.type === "all"}
              />
              <label>Rent & Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5"
                onChange={handleChange}
                checked={searchData.type === "rent"}
              />
              <label>Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="sale"
                className="w-5 h-5"
                onChange={handleChange}
                checked={searchData.type === "sale"}
              />
              <label>Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5"
                onChange={handleChange}
                checked={searchData.offer}
              />
              <label>Offer</label>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap pt-7">
            <label className="font-semibold">Amenities: </label>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5"
                onChange={handleChange}
                checked={searchData.parking}
              />
              <label>Parking</label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5"
                onChange={handleChange}
                checked={searchData.furnished}
              />
              <label>Furnished</label>
            </div>
          </div>
          <div className="flex gap-6 items-center pt-7">
            <label className="font-semibold">Sort :</label>
            <select
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={"createdAt_desc"}>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg mt-7 w-full uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibol border-b p-3 text-slate-700">
          Listings results:
        </h1>

        <div className="flex-1">
          <h1 className="">Loading results</h1>
          <div className="p-7 flex flex-wrap">
            {!loading && listings.length === 0 && (
              <p className="text-xl text-slate-700">'No Listing found'</p>
            )}
            {loading && (
              <p className="text-xl text-slate-700 text-center">Loading...</p>
            )}
            {!loading &&
              listings &&
              listings.map((listing, index) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
