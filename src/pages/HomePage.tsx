import Navbar from "@/components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const CLIENT_ID = "f2ccc382c5fe4389ac12da5be3b4fe23";
const CLIENT_SECRET = "acf648ddfe3d41b4b27d0fe868646367";


interface Moods {
  id: number;
  mood: string;
  img: string;
  imgAlt: string;
}

const moods = [
  {
    id: 1,
    mood: "happy",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT0x5B6IOUQPD8roxnvEtLS4hq80o_fOkkyw&usqp=CAU",
    imgAlt: "happy",
  },
  {
    id: 2,
    mood: "sad",
    img: "https://2.bp.blogspot.com/-U_mWEJ_JXo8/UVCHs4pQmaI/AAAAAAAANAQ/daU86umV1mc/s1600/alone-boy-sad-cute-sadness.jpg",
    imgAlt: "sad",
  },
  {
    id: 3,
    mood: "excited",
    img: "https://img.freepik.com/free-photo/full-shot-young-people-partying-outdoors_23-2149646125.jpg?t=st=1709111128~exp=1709114728~hmac=43714cb716cfbc68b09738884249f97dc02f8d35f45040ac303cfb1c5a080c0f&w=826",
    imgAlt: "excited",
  },
  {
    id: 4,
    mood: "angry",
    img: "https://m.media-amazon.com/images/I/51VVDO7qEHL._UXNaN_FMjpg_QL85_.jpg",
    imgAlt: "angry",
  },
  {
    id: 5,
    mood: "relaxed",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyN-GmJJ1jTA7g_pQkzrzI3EWRS-_HcLffoA&usqp=CAU",
    imgAlt: "relaxed",
  },
  {
    id: 6,
    mood: "seduction",
    img: "https://m.media-amazon.com/images/I/3120rV0W0UL._UXNaN_FMjpg_QL85_.jpg",
    imgAlt: "seduction",
  },
  {
    id: 7,
    mood: "inspired",
    img: "https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2018/07/01153710/benefits-of-working-from-home.jpg",
    imgAlt: "inspired",
  },
];
const updateMoodData = (id: number) => {
  return () => {
    console.log("Updating mood data for id:", id);
  };
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const[accessToken, setAccessToken]=useState();

  const [plalistLink, setPlaylistLink] = useState("");


  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
  
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data => setAccessToken(data.access_token)));
  }, []);




  async function getPlaylist (){

  
  let searchParameters={
      method:'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
      }
  };
      let response = await fetch('https://api.spotify.com/v1/playlists/' + '5BxqiXdL315dDipxbfKXdr?si=ca1f991337364365' , searchParameters)
      // .then(response => response.json())
      // .then(data => { console.log(data)})
      // console.log(response)

      let json_response = await response.json()
      // console.log(json_response)
      let playlistID = json_response.id;
      setPlaylistLink(`https://open.spotify.com/playlist/${playlistID}`)
      window.open(`https://open.spotify.com/playlist/${playlistID}`, '_blank');
      

      // let playlist1 = response.data
      
      // console.log("The playlist is " + playlist1);
      // // // Get request with Arist ID grab all the albums from that artist
      // var albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit')
      // .then(response => response.json())
      // .then(data => {console.log(data)};
      // // console.log(data);
      // // });
    }



  const navigateToPage = (): void => {
    navigate("/PlaylistPage");
  };

  return (
    <>
      <Navbar />
      <div className="bg-white pb-40 mt-10">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Moods</h2>

          <div className="grid grid-cols-1 place-items-center gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {moods.map((mood) => (
              <a key={mood.id} href={mood.img} className="group">
                <div className=" w-64 h-40 overflow-hidden rounded-lg bg-gray-200">
                  <img
                    onClick={() => updateMoodData(mood.id)}
                    src={mood.img}
                    alt={mood.imgAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{mood.imgAlt}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-4 px-12">
        <button
          onClick={navigateToPage}
          type="submit"
          className=" w-full max-w-[calc(100%-100px)] m-12 items-center text-nowrap justify-center rounded-md border border-transparent bg-indigo-600 pl-5 pr-5 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Get The Playlist
        </button>

        <button onClick={getPlaylist} className='btn btn-dark'>get Happy Playlist</button>
      </div>
    </>
  );
};

export default HomePage;
