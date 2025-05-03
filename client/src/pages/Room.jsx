import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirect

export default function Room() {
  const localVideo = useRef();
  const [remoteVideos, setRemoteVideos] = useState([]);
  const navigate = useNavigate(); // Use navigate hook for redirection
  const [localStream, setLocalStream] = useState(null); // State to store the local stream

  useEffect(() => {
    async function getCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.current.srcObject = stream;
        setLocalStream(stream); // Save the stream for later cleanup

        // Fake multiple remote videos for testing
        const remotes = Array.from({ length: 20 }).map(() => stream);
        setRemoteVideos(remotes);
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    }

    getCamera();

    // Cleanup function to stop streams when component is unmounted
    return () => {
      if (localStream) {
        const tracks = localStream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks to disconnect
      }
    };
  }, []);

  // Handle the disconnect button click
  const handleDisconnect = () => {
    // Stop the local video and audio stream when disconnecting
    if (localStream) {
      const tracks = localStream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
    }

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-[#202124] overflow-hidden">
    {/* Left Side: Local Video */}
    <div className="flex-1 flex justify-center items-center p-2 sm:p-4 overflow-hidden">
      <div className="relative w-full aspect-video max-w-5xl bg-black rounded-2xl overflow-hidden shadow-lg">
        <video
          ref={localVideo}
          autoPlay
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
        <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
          You
        </div>
      </div>
    </div>
  
    {/* Right Side: Remote Participants */}
    <div className="w-full md:w-64 bg-[#3c4043] p-2 sm:p-4 overflow-x-auto md:overflow-y-auto flex flex-row md:flex-col gap-2 md:gap-4 max-h-36 md:max-h-full">
      {remoteVideos.map((stream, index) => (
        <div
          key={index}
          className="relative flex-shrink-0 w-32 h-20 sm:w-36 sm:h-24 md:w-full md:h-36 bg-black rounded-xl overflow-hidden shadow"
        >
          <video
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            ref={(el) => {
              if (el) el.srcObject = stream;
            }}
          />
          <div className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 text-xs px-1 rounded">
            Guest {index + 1}
          </div>
        </div>
      ))}
    </div>
  
    {/* Disconnect Button */}
    <button
      onClick={handleDisconnect}
      className="fixed bottom-4 right-4 bg-red-500 text-white px-5 py-2 rounded-full shadow hover:bg-red-700 z-50"
    >
      Disconnect
    </button>
  </div>
  
  
  
  
  );
}
