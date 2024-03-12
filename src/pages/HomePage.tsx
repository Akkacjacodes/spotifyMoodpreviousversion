import Navbar from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";



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

const spotifyPlaylists = [
  { id: 1, spotifyId: "5BxqiXdL315dDipxbfKXdr" },
  { id: 2, spotifyId: "6vAzi95cMQeK4iNv8ttf2y" },
  { id: 3, spotifyId: "5xS3Gi0fA3Uo6RScucyct6" },
  { id: 4, spotifyId: "37i9dQZF1DWWY64wDtewQt" },
  { id: 5, spotifyId: "0n81ha8dSdYLDVc8VpCPsd" },
  { id: 6, spotifyId: "1a7845Km1tXbRnbPx45584" },
  { id: 7, spotifyId: "6X185BlQApNN7mjiFFhPdi" },
  { id: 100, spotifyId: "1SMzluTXEyXFmzJRphyOvb" },
];

const HomePage: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number>();
  const [playlistIDs, setPlaylistIDs] = useState(["1SMzluTXEyXFmzJRphyOvb"]);

  function getPlaylist(selectedMood: number) {
    setLoading(true);
    let spotifyId = selectedMood
      ? spotifyPlaylists.find((playlist) => playlist.id === selectedMood)
          ?.spotifyId
      : "1SMzluTXEyXFmzJRphyOvb";

    //   .map(
    //     (moodId) =>
    //       spotifyPlaylists.find((playlist) => playlist.id === moodId)?.spotifyId
    //   )
    //   .filter((spotifyId): spotifyId is string => spotifyId !== undefined); // Removeing undefined entries
    if (spotifyId) {
      setPlaylistIDs([spotifyId]);
    } else {
      // Handle the case where there's no matching playlist or no mood selected
      setPlaylistIDs([]);
    }
    setLoading(false);
  }

  const updateMoodData = (id: number) => {
    if (selectedMood === id) {
      setSelectedMood(100);
    } else {
      setSelectedMood(id);
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
          <div className="flex flex-col md:flex-row w-full ">
            <iframe
              className="md:w-1/2 md:h-auto h-24 inline-block md:order-2 m-0 p-0 border-8 border-white"
              src={`https://open.spotify.com/embed/playlist/${playlistIDs}?utm_source=generator`}
              width="100%"
              height="100%"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            <div className=" static bg-white pb-5 mt-0 md:w-1/2 md:order-1 border-8 border-white">
              <div className="mx-auto max-w-2xl px-2 py-16 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
                <h2 className="sr-only">Moods</h2>

                <div className=" static grid grid-cols-2 place-items-center gap-x-6 gap-y-6 sm:grid-cols-2  ">
                  {moods.map((mood) => (
                    <a
                      key={mood.id}
                      onClick={() => updateMoodData(mood.id)}
                      className="group cursor-pointer"
                    >
                      <div
                        className={`w-64 md:w-40 h-40 lg:w-60 overflow-hidden rounded-lg bg-gray-200 ${
                          selectedMood === mood.id
                            ? "outline outline-green-500 outline-4 outline-offset-4"
                            : ""
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
          </div>

          <div className="flex px-12">
            <button
              onClick={() =>
                selectedMood !== undefined && getPlaylist(selectedMood)
              }
              type="button"
              style={{
                width: `calc(50% - 4rem)`, // Assuming a margin of 0.5rem on each side (left and right)
              }}
              className=" fixed left-1/2 md:left-0 sm:left-0 bottom-0 m-12 text-nowrap justify-center rounded-md border border-transparent bg-green-600 pl-5 pr-5 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
