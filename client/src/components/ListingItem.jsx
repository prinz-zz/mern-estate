import { useState } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  console.log(listing.offer);
  return (
    <div className="bg-white shadow-md hover:shadow-lg trasition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg mt-4 font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className=" h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">{listing.address}</p>
          </div>
          <div className="">
            <p className="line-clamp-3 text-gray-600 text-sm">
              {listing.description}
            </p>
          </div>
          <div className="text-gray-600 font-semibold">
            $
            {listing.offer
              ? listing.discountedPrice.toLocaleString("en-us")
              : listing.regularPrice.toLocaleString("en-us")}
            {listing.type === "rent" ? (
              " / month"
            ) : !listing.offer ? (
              ""
            ) : (
              <span className="text-sm bg-blue-700 text-white text-center p-1 rounded-md ml-2">
                Discount
              </span>
            )}
          </div>
          <div className="flex gap-2 text-slate-700">
            <p>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </p>
            <p>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
