import Navbar from "@/components/ui/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";


type PlaylistItem = {
  description: string;
  images: { url: string }[];
  name: string;
  playlistId: number[];
  id: string;
};

type DataState = {
  message: string;
  playlists: PlaylistItem[];
};

const NewPopular = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState<DataState>({ message: "", playlists: [] });
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  async function getRequest() {
    try {
      const response = await axios.get(`${baseURL}/newpopular`);
      console.log(response)

      //
      setData({
        message: response.data.message,
        playlists: response.data.playlists.items,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);

      setData({ message: "Failed to load playlists", playlists: [] });
    }
  }

  useEffect(() => {
    getRequest();
  }, []);

  const handleClick = (index: number) => () => {
    const selectedPlaylistId = data.playlists[index]?.id;
    if (selectedPlaylistId) {
      setPlaylistId(selectedPlaylistId);
    } else {
      console.log("No playlist found at this index:", index);
    }
    console.log(playlistId);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col md:flex-row w-full ">
        <iframe
          className="md:w-1/2 md:h-auto h-24 inline-block md:order-2 m-0 p-0 border-8 border-white"
          src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`}
          width="100%"
          height="100%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
        <div className=" static bg-white pb-5 mt-0 md:w-1/2 md:order-1 border-8 border-white">
          <div className="mx-auto max-w-2xl px-2 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
            <div className=" static grid grid-cols-3 place-items-center gap-x-6 gap-y-6 sm:grid-cols-2  ">
              {data.playlists.map((playlist, index) => (
                <div
                  key={index}
                  onClick={handleClick(index)}
                  className="playlist"
                >
                  {playlist.images && playlist.images[0] && (
                    <img
                      src={playlist.images[0].url}
                      alt="Playlist cover"
                      style={{ width: "200px" }}
                      className="h-full w-full object-cover object-center group-hover:opacity-75  "
                    />
                  )}
                  <h3 className="max-w-2xl overflow-hidden">{playlist.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPopular;
