import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';


const faqs = [
  {
    question: "Is QuickVideoConf really free to use?",
    answer:
      "Yes! QuickVideoConf is 100% free. No registration, no hidden fees, and no time limits for video meetings.",
  },
  {
    question: "Do I need to install anything to join a video call?",
    answer:
      "Nope! QuickVideoConf runs directly in your browser using WebRTC. No app installs or plugins required.",
  },
  {
    question: "Is my video call secure?",
    answer:
      "Yes. We use peer-to-peer WebRTC technology with end-to-end encryption, so your conversations stay private.",
  },
  {
    question: "Can I use this on mobile?",
    answer:
      "Yes, QuickVideoConf is fully responsive and works well on mobile devices.",
  },
];

export default function Home() {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleCreateRoom = async () => {
    try {
      const res = await api.post('/room/create');
      if (res.data?.roomCode) {
        navigate(`/room/${res.data.roomCode}`);
      } else {
        console.error('No room code returned');
      }
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleJoinRoom = () => {
    const trimmedCode = roomCode.trim();
    if (trimmedCode.length > 0) {
      navigate(`/room/${trimmedCode}`);
    }
  };

  return (
  <>
      <div className="flex flex-col justify-center items-center py-16 md:py-24 overflow-hidden px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl text-center space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Secure, Fast & Free Video Conferencing
        </h1>
        <p className="text-gray-500 text-base sm:text-lg md:text-2xl">
          Use QuickVideoConf to host private HD video meetings. Perfect for remote teams, online classes, and quick catch-ups.
        </p>


        {/* Create / Join section */}
        <div className="flex flex-col gap-4 sm:flex-row justify-center items-center p-4">
          <button
            onClick={handleCreateRoom}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            Create Room
          </button>

          <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
            <input
              type="text"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="border p-3 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoinRoom}
              disabled={roomCode.trim().length === 0}
              className={`px-6 py-3 rounded-full border transition cursor-pointer ${roomCode.trim().length > 0
                  ? "text-blue-600 border-blue-600 hover:bg-blue-100"
                  : "text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
            >
              Join Room
            </button>
          </div>
        </div>

        <hr className="border-gray-300 my-6" />
      </div>
      
    </div>
    <section className="max-w-3xl mx-auto px-4 ">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded">
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-4 py-3 font-medium flex justify-between items-center hover:bg-gray-50"
            >
              {faq.question}
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-2 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  </>

  );
}
