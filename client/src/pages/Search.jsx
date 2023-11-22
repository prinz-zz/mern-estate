export default function Search() {
  const handleChange = () => {};

  return (
    <div className="p-3 max-w-full flex flex-col sm:flex-row gap-4">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term</label>
            <input
              className="border p-3 rounded-xl focus:outline-none w-full"
              placeholder="Search..."
              type="text"
              id="searchTerm"
            />
          </div>
          <div className="flex gap-6 flex-wrap pt-7">
            <label className='font-semibold'>Type: </label>
            <div className="flex gap-2 items-center">
              <input className="w-5 h-5" type="checkbox" id="rentAndsale" />
              <label>Rent & Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="rent" className="w-5 h-5" />
              <label>Rent</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="sale" className="w-5 h-5" />
              <label>Sale</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="offer" className="w-5 h-5" />
              <label>Offer</label>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap pt-7">
            <label className='font-semibold'>Amenities: </label>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="parking" className="w-5 h-5" />
              <label>Parking spot</label>
            </div>
            <div className="flex gap-2 items-center">
              <input type="checkbox" id="furnished" className="w-5 h-5" />
              <label>Furnished</label>
            </div>
          </div>
          <div className="flex gap-6 items-center pt-7">
            <label className='font-semibold'>Sort :</label>
            <select id="sort_order" className="border rounded-lg p-3">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg mt-7 w-full uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibol border-b p-3 text-slate-700">Listing results</h1>
      </div>
    </div>
  );
}
