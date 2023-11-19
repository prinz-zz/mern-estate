import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const fetchListings = async () => {
        setLoading(true);
        const res = await axios.get(
          `/api/listing/getListing/${params.listingId}`
        );
        const data = await res.data;
        setListing(data);
        setLoading(false);
        setError(false);
      };
      fetchListings();
    } catch (error) {
      setError(error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  }, [params.listingId]);

  //console.log(listing);

  return (
    <main>
      {loading && <p className="text-center py-4 text-2xl">Loading...</p>}
      {listing && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="h-[550px]" style={{ background: `url(${url}) center no-repeat`, backgroundSize : 'cover'}}>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </main>
  );
}
