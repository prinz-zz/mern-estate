import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ListingItem from "../components/ListingItem";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

export default function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  console.log("Offer :", offerListings);
  // console.log("Sale :", saleListings);
  // console.log("Rent :", rentListings);

  useEffect(() => {
    //////FETCH OFFER///////
    const fetchOfferListings = async () => {
      try {
        const res = await axios.get(`/api/listing/get?offer=true&limit=4`);
        const data = await res.data;
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    //////FETCH RENT///////
    const fetchRentListings = async () => {
      const res = await axios.get(`/api/listing/get?type=rent&limit=4`);
      const data = await res.data;
      setRentListings(data);
    };

    //////FETCH SALE///////
    const fetchSaleListings = async () => {
      const res = await axios.get(`/api/listing/get?type=sale&limit=4`);
      const data = await res.data;
      setSaleListings(data);
    };

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br /> place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm ">
          <p>
            <sub>PG</sub>Estates is the best place find your perfect placeto
            live.
            <br />
            We have wide range of properties for you to choose them.
          </p>
        </div>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
          Let's Start now...
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                className="h-[500px] "
                style={{
                  background: `url(${item.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* Swiper */}

      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-6 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent Offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}>
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 w-full">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div className="mt-5">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}>
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 w-full">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div className="mt-5">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-slate-700">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}>
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 w-full">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
