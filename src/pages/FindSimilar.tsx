import { ChangeEvent,FormEvent, useState } from "react";
import Navbar from "@/components/ui/Navbar";

const FindSimilar = () => {
    const [searchQuery, setSearchQuery] = useState('');

  
  const handleInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
        console.log('No input');
      }
    setSearchQuery(event.target.value); 
  };

 
  const onSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted with query:', searchQuery.trim()); 
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="m-20">
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900 "
        >
          Find your song
        </label>
        <form onSubmit={onSubmit}>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <i className="bi bi-search-heart"></i>
          </div>
          <input
            type="text"
            name="searchSong"
            id="searchSong"
            className="block w-full rounded-md border-gray-300 py-1.5 pl-10 pr-20 text-gray-900 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Search song name, artist, album"
            value={searchQuery} 
            onChange={handleInputChange} 
          />
          {/* <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Curren
          </label>
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        </div> */}
          <button
            type="submit"
            className=" fixed md:left-0 sm:left-0 bottom-0 m-12 text-nowrap justify-center rounded-md border border-transparent bg-green-600 pl-5 pr-5 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Get The Playlist
          </button>
        </div>
        </form>
      </div>
    </>
  );
};

export default FindSimilar;
