import Navbar from "../components/ui/Navbar";
import axios from "axios";
import React from "react";
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

const baseURL = 'https://5d55bd72-55b9-4785-8f11-e06014ee8714-prod.e1-us-cdp-2.choreoapis.dev/rmmd/spotifymoodbackend/now-popular-service-e9d/v1.0'
// const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log(baseURL);
// const yourAccessToken= import.meta.env.yourAccessToken;

const NewPopular = () => {
  const [data, setData] = useState<DataState>({ message: "", playlists: [] });
  const [playlistId, setPlaylistId] = useState<string | null>(null);


  async function getRequest() {
    try {
      const config = {
        headers: {
          "Authorization": `Bearer eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJlMzg3MjBjOC1lN2IxLTQ1MWMtYjI1Zi0wNDY5YWMyYmI3ZjZAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6cHJvZHVjdGlvbiIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJzcG90aWZ5IHByZXZpb3VzIHZlcnNpb24gYmFja2VuZCAtIE5ldyBQb3B1bGFyIFNlciIsImNvbnRleHQiOiJcLzVkNTViZDcyLTU1YjktNDc4NS04ZjExLWUwNjAxNGVlODcxNFwvcm1tZFwvc3BvdGlmeS1wcmV2aW91cy12ZXJzaW9uLWJhY2tlbmRcL25ldy1wb3B1bGFyLXNlcnZpY2UtNDQwXC92MS4wIiwicHVibGlzaGVyIjoiY2hvcmVvX3Byb2RfYXBpbV9hZG1pbiIsInZlcnNpb24iOiJ2MS4wIiwic3Vic2NyaXB0aW9uVGllciI6bnVsbH1dLCJleHAiOjE3MTQ0MjU2MTIsInRva2VuX3R5cGUiOiJJbnRlcm5hbEtleSIsImlhdCI6MTcxNDQyNTAxMiwianRpIjoiMDczNjQwY2EtMWRkYS00ZmY5LTljYzItNTM3YzEwMTVlOGM1In0.RksW5pEOJp7thK96l_sJP0S1ZA3OxwR2tfadySmql2v18FdfooSoqF6qRBlOJQ9Au2i08u-3we_ACUkZc16LWfw1MmR4YNagPm05AJqtsADsBBf3O5UU1YI6fVFX_jIyCl-oW1DVEoYjyALn82n1RLxHOElFm-i94Mit4az88LPUX8LJ5N2DrI9QeUi5HByuZYMxGRgtEvuUJF6Chnn-ThDCvgIQocbqCHSsg0dO3yCmodzwtAAnCm5FaQiM-ilSaWNYZBvKUr2OYzUEg9U2nYARog6JcuygDuCZDDdaPQG5whs9LE0G5NpxA1b1zZl1GLxWP4Vu82em7d0tS3gmO1TwLIYg_SZZ-Ce-Hnyc1kSsK_le93Ia1q7joDwrAOUdgItFL_eH9gdnRAkCqg1vldab3Q9LKmE0kMfdk2t9ioKMoCiml_KTOZ2MCbzuskKtKWRRWZaklelpwYRYqQraTpH96ObKWxS5dCCnumVmTLnjFryfU0GfYO0_wL9uZBT8T5XjGh_3VqEjcL98A1NMtjQixrUTj4AeRTZKspmIEB6Lc0KhNyengKfk8uAHM6p4_Z5THC0SJgbiY8nRyKKNTHa4PZhMbFWLSH4HWaoa4RDg46iNfJm8Cu1H6kFiqlMhjT5w_YOkOQpc_WmcMAp883IXpg0Vl7LLu3xXBf4Hjco`, // Replace 'your_access_token' with the actual token
          "Custom-Header": "Hello", // Add any other headers here
        },
      };

      const response = await axios.get(`${baseURL}/newpopular`, config);
      console.log(response);

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
