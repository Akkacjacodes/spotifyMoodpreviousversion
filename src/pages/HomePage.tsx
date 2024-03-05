import Navbar from "@/components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const CLIENT_ID = "f2ccc382c5fe4389ac12da5be3b4fe23";
const CLIENT_SECRET = "acf648ddfe3d41b4b27d0fe868646367";

// interface Moods {
//   id: number;
//   mood: string;
//   img: string;
//   imgAlt: string;
// }
interface SpotifyPlaylist {
  id: number;
  spotifyId: string;
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
    mood: "chill",
    img: "https://img.freepik.com/free-photo/young-hipster-company-friends-vacation-summer-cafe-drinking-mojito-cocktails-happy-positive-style-smiling-happy-two-women-man-having-fun-together-talking-flirt-romance-three_285396-357.jpg?t=st=1709563915~exp=1709567515~hmac=4b66424e3eaec76c91d64a545f5a89e8bea83a5a32ee59c288f71ee2daf258f7&w=1800",
    imgAlt: "chill",
  },
  {
    id: 6,
    mood: "coding",
    img: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg?t=st=1709564045~exp=1709567645~hmac=d961eeba166f31653691d44b40e4ffafee8bf65240a99f151659caee861f4fc1&w=1800",
    imgAlt: "coding",
  },
  {
    id: 7,
    mood: "inspired",
    img: "https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2018/07/01153710/benefits-of-working-from-home.jpg",
    imgAlt: "inspired",
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState();
  const [isLoading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number[]>([]);
  const [playlistLink, setPlaylistLink] = useState("");
  const [playlistID, setPlaylistID] = useState("1SMzluTXEyXFmzJRphyOvb");

  const spotifyPlaylists = [
    { id: 1, spotifyId: "5BxqiXdL315dDipxbfKXdr" },
    { id: 2, spotifyId: "6vAzi95cMQeK4iNv8ttf2y" },
    { id: 3, spotifyId: "5xS3Gi0fA3Uo6RScucyct6" },
    { id: 4, spotifyId: "37i9dQZF1DWWY64wDtewQt" },
    { id: 5, spotifyId: "0n81ha8dSdYLDVc8VpCPsd" },
    { id: 6, spotifyId: "1a7845Km1tXbRnbPx45584" },
    { id: 7, spotifyId: "6X185BlQApNN7mjiFFhPdi" },
  ];

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
      .then((data) => setAccessToken(data.access_token));
  }, []);

  function getSpotifyIdsFromSelectedMoods(
    selectedMood: number[],
    spotifyPlaylists: SpotifyPlaylist[]
  ): string[] {
    const spotifyIds = selectedMood
      .map(
        (moodId) =>
          spotifyPlaylists.find((playlist) => playlist.id === moodId)?.spotifyId
      )
      .filter((spotifyId): spotifyId is string=> spotifyId !== undefined); // Removeing undefined entries

    return spotifyIds;
  }

  async function getPlaylist(selectedMood: number[]) {
    if (!selectedMood) {
      console.log("Please selectt the mood first");
      return;
    }
    setLoading(true);

    if (!accessToken) {
      console.log("Access token is not available.");
      setLoading(false);
      return;
    }
    const spotifyIds = getSpotifyIdsFromSelectedMoods(
      selectedMood,
      spotifyPlaylists
    );

    for (const spotifyId of spotifyIds) {
      let searchParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      let response = await fetch(
        `https://api.spotify.com/v1/playlists/${spotifyId}`,
        searchParameters
      );

      let json_response = await response.json();
      setPlaylistID(json_response.id);
      setPlaylistLink(`https://open.spotify.com/playlist/${playlistID}`);
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(playlistLink);
  }, [playlistLink]);

  const updateMoodData = (id: number) => {
    if (selectedMood.includes(id)) {
      setSelectedMood(selectedMood.filter((moodId) => moodId !== id));
    } else {
      setSelectedMood([...selectedMood, id]);
    }
  };

  useEffect(() => {
    console.log("The Selected Moods are:" + selectedMood);
  }, [selectedMood]);

  return (
    <>
      {isLoading ? (
        <>
          <div
            style={{
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <PropagateLoader
              color={"green"}
              loading={isLoading}
              cssOverride={{ color: "green" }}
              size={35}
              aria-label="Loading..."
            ></PropagateLoader>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <div className="flex w-full">
            <div className=" static bg-white pb-5 mt-0 w-1/2">
              <div className="mx-auto max-w-2xl px-4 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Moods</h2>

                <div className=" static grid grid-cols-1 place-items-center gap-x-6 gap-y-6 sm:grid-cols-2">
                  {moods.map((mood) => (
                    <a
                      key={mood.id}
                      onClick={() => updateMoodData(mood.id)}
                      className="group cursor-pointer"
                    >
                      <div
                       className={`w-64 h-40 overflow-hidden rounded-lg bg-gray-200 ${
                        selectedMood.includes(mood.id) ? "outline outline-green-500 outline-4 outline-offset-4" : ""
                      }`}
                      >
                        <img
                          tabIndex={0}
                          onClick={() => updateMoodData(mood.id)}
                          src={mood.img}
                          alt={mood.imgAlt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75  "
                        />
                      </div>
                      <h3 className="mt-4 text-sm text-gray-700">
                        {mood.imgAlt}
                      </h3>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <iframe
              className="w-1/2 h-auto inline-block "
              src={`https://open.spotify.com/embed/playlist/${playlistID}?utm_source=generator`}
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>

          <div className="flex px-12">
            <button
              onClick={() => getPlaylist(selectedMood)}
              type="button"
              className=" fixed left-0 bottom-0 m-12 items-center text-nowrap justify-center rounded-md border border-transparent bg-green-600 pl-5 pr-5 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Get The Playlist
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
