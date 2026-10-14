import { useState } from "react";
import FacialExpression from "./components/FacialExpression";
import MoodSongs from "./components/MoodSongs";
import Header from "./components/Header";


const App = () => {
  const [songs, setSongs] = useState([]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <FacialExpression setSongs={setSongs} />
        <MoodSongs songs={songs} />
      </main>
    </div>
  );
};

export default App;
