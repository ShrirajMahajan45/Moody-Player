import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

function FacialExpression({ setSongs }) {
  const videoRef = useRef(null);

  // 1. Load Models
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  // 2. Start Video
  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
  };

  // 3. Handle Video Play

  async function detectMood() {
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    let mostProbableExpression = 0;
    let _expression = "";
    // console.log(detections.expressions)

    for (const expression of Object.keys(detections.expressions)) {
      if (mostProbableExpression < detections.expressions[expression]) {
        mostProbableExpression = detections.expressions[expression];
        _expression = expression;
      }
    }

    console.log(_expression);

    // to get data from our server , we hit the our api http://localhost:3000/songs?mood=happy which is our backend server
    axios.get(`http://localhost:3000/songs?mood=${_expression}`).then((res) => {
      // console.log(res.data);
      setSongs(res.data.songs);
    });
  }

  // Load models when component mounts
  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    // <div className="w-full flex justify-center items-center p-10 gap-10">
    //   <video
    //     ref={videoRef}
    //     autoPlay
    //     muted

    //     className="w-75 h-50 rounded-xl aspect-video object-cover"
    //   />
    //   <button
    //     onClick={detectMood}
    //     className="px-3 py-2 rounded bg-blue-500 text-white font-semibold text-xl"
    //   >
    //     Detect Face
    //   </button>
    // </div>

    //  Face Detection Section
    <section className="grid items-center gap-8 rounded-2xl bg-[#181818] p-6 shadow-xl md:grid-cols-[1fr_auto]">
      {/* Camera */}
      <div className="overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          className="aspect-video w-full object-cover"
          autoPlay
          muted
        />
      </div>

      {/* Detection */}
      <div className="flex flex-col items-center justify-center px-6 text-center md:items-start md:text-left">
        <span className="mb-3 rounded-full bg-[#1ed760]/10 px-3 py-1 text-xs font-medium text-[#1ed760]">
          Mood Detection
        </span>

        <h2 className="text-2xl font-bold">Discover your mood</h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
          Let us detect your facial expression and recommend music that matches
          your mood.
        </p>

        <button
          onClick={detectMood}
          className="mt-6 rounded-full bg-[#1ed760] px-7 py-3 font-semibold text-black transition hover:scale-105 hover:bg-[#1fdf64]"
        >
          Detect Face
        </button>
      </div>
    </section>
  );
}

export default FacialExpression;
