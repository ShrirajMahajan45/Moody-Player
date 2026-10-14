import { useEffect, useState } from "react";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";

const MoodSongs = ({ songs }) => {
  const [isPlaying, setIsPlaying] = useState(null);

  const handlePlayPause = (index) => {
    if (isPlaying === index) {
      setIsPlaying(null);
    } else {
      setIsPlaying(index);
    }
  };

  useEffect(() => {
    setIsPlaying(null);
  }, [songs]);
  return (
    // <div className="mx-auto w-full max-w-2xl space-y-3 p-4">
    //   <h1>Recommended Songs</h1>
    //   {songs.map((song, index) => (
    //     <div
    //       key={index}
    //       className="flex items-center justify-between rounded-xl bg-zinc-900 px-5 py-4 text-white shadow-md transition hover:bg-zinc-800"
    //     >
    //       {/* Song Information */}
    //       <div className="min-w-0">
    //         <h3 className="truncate text-lg font-semibold">{song.title}</h3>

    //         <p className="mt-1 truncate text-sm text-zinc-400">{song.artist}</p>
    //       </div>

    //       {/* Play / Pause */}
    //       <button
    //         onClick={() => handlePlayPause(index)}
    //         className="ml-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
    //       >
    //         {isPlaying === index ? (
    //           <i className="ri-pause-large-line font-extrabold "></i>
    //         ) : (
    //           <i className="ri-play-large-fill font-extrabold  "></i>
    //         )}
    //       </button>

    //       {isPlaying === index && (
    //         <audio
    //           src={song.audio}
    //           autoPlay={isPlaying === index}
    //           className="invisible "
    //         ></audio>
    //       )}
    //     </div>
    //   ))}
    // </div>

    <section className="mt-12">
      {/* Section heading */}
      <div className="mb-6">
        <p className="text-sm font-medium text-[#1ed760]">YOUR MUSIC</p>

        <h2 className="mt-1 text-3xl font-bold">Recommended Songs</h2>

        <p className="mt-2 text-sm text-gray-400">
          Music selected based on your detected mood
        </p>
      </div>

      {/* Song list */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#181818]">
        {songs?.map((song, index) => (
          <div
            key={index}
            className="group flex items-center gap-4 border-b border-white/5 px-5 py-4 transition last:border-none hover:bg-[#282828]"
          >
            {/* Number / Music icon */}
            <div className="flex w-8 justify-center">
              <span className="text-sm text-gray-500 group-hover:hidden">
                {index + 1}
              </span>

              <FaMusic
                className="hidden text-[#1ed760] group-hover:block"
                size={14}
              />
            </div>

            {/* Song details */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-white">
                {song.title}
              </h3>

              <p className="mt-1 truncate text-sm text-gray-400">
                {song.artist}
              </p>
            </div>

            {/* Play / Pause */}
            <button
              onClick={() => handlePlayPause(index)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black opacity-100 transition hover:scale-105 hover:bg-[#1ed760]"
            >
              {isPlaying === index ? (
                <FaPause size={14} />
              ) : (
                <FaPlay size={14} className="ml-0.5" />
              )}
            </button>
            {isPlaying === index && (
              <audio
                src={song.audio}
                autoPlay={isPlaying === index}
                className="invisible "
              ></audio>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoodSongs;
