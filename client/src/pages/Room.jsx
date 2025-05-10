import React, { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

// Import icons from a library like react-icons or use SVG directly
// For this example, I'll create simple icon components
const MicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" x2="12" y1="19" y2="22"></line>
  </svg>
)

const MicOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" x2="22" y1="2" y2="22"></line>
    <path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2"></path>
    <path d="M5 10v2a7 7 0 0 0 12 0v-2"></path>
    <path d="M12 19v3"></path>
    <path d="M8 22h8"></path>
    <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33"></path>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12"></path>
  </svg>
)

const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
)

const CameraOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" x2="22" y1="2" y2="22"></line>
    <path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-3"></path>
    <path d="M14.5 4h-5l-2.5 3"></path>
    <path d="M8.8 16a4 4 0 0 1 6.4 0"></path>
    <path d="M12 13a2 2 0 0 1 2-2"></path>
  </svg>
)

const MonitorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="3" rx="2"></rect>
    <line x1="8" x2="16" y1="21" y2="21"></line>
    <line x1="12" x2="12" y1="17" y2="21"></line>
  </svg>
)

const LogOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" x2="9" y1="12" y2="12"></line>
  </svg>
)

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const MoreVerticalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </svg>
)

export default function Room() {
  const localVideo = useRef(null)
  const navigate = useNavigate()

  const [localStream, setLocalStream] = useState(null)
  const [remoteUsers, setRemoteUsers] = useState([])
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCamOn, setIsCamOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isMobileParticipantsOpen, setIsMobileParticipantsOpen] = useState(false)
  const [showDropdownId, setShowDropdownId] = useState(null)
  const [showTooltip, setShowTooltip] = useState(null)

  const isAdmin = true // Toggle this based on user role

  // Create refs for remote users outside the useEffect
  const remoteUserRefs = useRef([])

  useEffect(() => {
    startLocalMedia()

    // Simulate remote users
    const fakeUsers = Array.from({ length: 4 }).map((_, i) => {
      // Create refs if they don't exist
      if (!remoteUserRefs.current[i]) {
        remoteUserRefs.current[i] = React.createRef()
      }

      return {
        id: i,
        name: `Guest ${i + 1}`,
        videoRef: remoteUserRefs.current[i],
        isCamOn: true,
        isMicOn: true,
        stream: null,
      }
    })
    setRemoteUsers(fakeUsers)

    return () => stopAllTracks(localStream)
  }, [])

  const startLocalMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setLocalStream(stream)
      if (localVideo.current) {
        localVideo.current.srcObject = stream
      }
    } catch (err) {
      console.error("Failed to access local media:", err)
    }
  }

  const stopAllTracks = (stream) => {
    stream?.getTracks().forEach((track) => track.stop())
  }

  const toggleMic = async () => {
    if (!localStream) return

    if (isMicOn) {
      localStream.getAudioTracks().forEach((track) => track.stop())
      setIsMicOn(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const newTrack = stream.getAudioTracks()[0]
        const videoTracks = localStream.getVideoTracks()
        const newStream = new MediaStream([...videoTracks, newTrack])
        setLocalStream(newStream)
        if (localVideo.current) {
          localVideo.current.srcObject = newStream
        }
        setIsMicOn(true)
      } catch (err) {
        console.error("Failed to toggle microphone:", err)
      }
    }
  }

  const toggleCam = async () => {
    if (!localStream) return

    if (isCamOn) {
      localStream.getVideoTracks().forEach((track) => track.stop())
      if (localVideo.current) {
        localVideo.current.srcObject = null
      }
      setIsCamOn(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        const newTrack = stream.getVideoTracks()[0]
        const audioTracks = localStream.getAudioTracks()
        const newStream = new MediaStream([...audioTracks, newTrack])
        setLocalStream(newStream)
        if (localVideo.current) {
          localVideo.current.srcObject = newStream
        }
        setIsCamOn(true)
      } catch (err) {
        console.error("Failed to toggle camera:", err)
      }
    }
  }

  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop screen sharing and revert to camera
      await toggleCam()
      setIsScreenSharing(false)
      return
    }

    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })

      stopAllTracks(localStream)
      setLocalStream(screenStream)
      if (localVideo.current) {
        localVideo.current.srcObject = screenStream
      }
      setIsScreenSharing(true)
      setIsCamOn(false)
    } catch (err) {
      console.error("Failed to share screen:", err)
    }
  }

  const adminToggleRemote = (id, type) => {
    setRemoteUsers((prev) =>
      prev.map((user) => {
        if (user.id === id) {
          return { ...user, [type]: !user[type] }
        }
        return user
      }),
    )
  }

  const handleDisconnect = () => {
    stopAllTracks(localStream)
    navigate("/")
  }

  const toggleDropdown = (id) => {
    setShowDropdownId(showDropdownId === id ? null : id)
  }

  const toggleMobileParticipants = () => {
    setIsMobileParticipantsOpen(!isMobileParticipantsOpen)
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-white overflow-hidden">
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main video area */}
        <div className="flex-1 p-2 md:p-4 overflow-hidden flex flex-col">
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-black shadow-lg flex items-center justify-center">
            {isCamOn || isScreenSharing ? (
              <video
                ref={localVideo}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${!isScreenSharing ? "transform scale-x-[-1]" : ""}`}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 mb-4 rounded-full bg-zinc-700 flex items-center justify-center text-3xl">
                  Y
                </div>
                <span className="text-xl">Camera is off</span>
              </div>
            )}

            {/* Local user info */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${isMicOn ? "bg-blue-600" : "bg-red-600"}`}>
                {isMicOn ? <MicIcon /> : <MicOffIcon />}
                <span className="text-sm">You</span>
              </div>
              {isScreenSharing && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-600">
                  <MonitorIcon />
                  <span className="text-sm">Sharing screen</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop participants sidebar */}
        <div className="hidden md:flex flex-col w-80 bg-zinc-800 border-l border-zinc-700 overflow-y-auto">
          <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
            <h2 className="font-semibold flex items-center">
              <UsersIcon className="w-4 h-4 mr-2" />
              Participants ({remoteUsers.length + 1})
            </h2>
          </div>

          <div className="p-2 flex flex-col gap-3 overflow-y-auto">
            {/* Local user in participants list */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center">Y</div>
                <div>
                  <p className="font-medium">You</p>
                  <div className="flex gap-1 mt-1">
                    <div className={`flex items-center p-1 rounded-md ${isMicOn ? "bg-zinc-700" : "bg-red-600"}`}>
                      {isMicOn ? <MicIcon className="w-3 h-3" /> : <MicOffIcon className="w-3 h-3" />}
                    </div>
                    <div className={`flex items-center p-1 rounded-md ${isCamOn ? "bg-zinc-700" : "bg-red-600"}`}>
                      {isCamOn ? <CameraIcon className="w-3 h-3" /> : <CameraOffIcon className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remote participants */}
            {remoteUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <div className="flex gap-1 mt-1">
                      <div
                        className={`flex items-center p-1 rounded-md ${user.isMicOn ? "bg-zinc-700" : "bg-red-600"}`}
                      >
                        {user.isMicOn ? <MicIcon className="w-3 h-3" /> : <MicOffIcon className="w-3 h-3" />}
                      </div>
                      <div
                        className={`flex items-center p-1 rounded-md ${user.isCamOn ? "bg-zinc-700" : "bg-red-600"}`}
                      >
                        {user.isCamOn ? <CameraIcon className="w-3 h-3" /> : <CameraOffIcon className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                </div>

                {isAdmin && (
                  <div className="relative">
                    <button onClick={() => toggleDropdown(user.id)} className="p-2 rounded-full hover:bg-zinc-700">
                      <MoreVerticalIcon className="h-4 w-4" />
                    </button>
                    {showDropdownId === user.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-zinc-800 rounded-md shadow-lg z-10 border border-zinc-700">
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-zinc-700"
                          onClick={() => {
                            adminToggleRemote(user.id, "isMicOn")
                            toggleDropdown(user.id)
                          }}
                        >
                          {user.isMicOn ? "Mute participant" : "Unmute participant"}
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-zinc-700"
                          onClick={() => {
                            adminToggleRemote(user.id, "isCamOn")
                            toggleDropdown(user.id)
                          }}
                        >
                          {user.isCamOn ? "Turn off camera" : "Turn on camera"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile participants panel */}
      {isMobileParticipantsOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 md:hidden">
          <div className="bg-zinc-800 max-h-[80vh] w-full absolute bottom-0 rounded-t-xl">
            <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
              <h2 className="font-semibold flex items-center">
                <UsersIcon className="w-4 h-4 mr-2" />
                Participants ({remoteUsers.length + 1})
              </h2>
              <button onClick={toggleMobileParticipants} className="p-2 rounded-full hover:bg-zinc-700">
                ✕
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3 overflow-y-auto max-h-[60vh]">
              {/* Local user in participants list */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center">Y</div>
                  <div>
                    <p className="font-medium">You</p>
                    <div className="flex gap-1 mt-1">
                      <div className={`flex items-center p-1 rounded-md ${isMicOn ? "bg-zinc-700" : "bg-red-600"}`}>
                        {isMicOn ? <MicIcon className="w-3 h-3" /> : <MicOffIcon className="w-3 h-3" />}
                      </div>
                      <div className={`flex items-center p-1 rounded-md ${isCamOn ? "bg-zinc-700" : "bg-red-600"}`}>
                        {isCamOn ? <CameraIcon className="w-3 h-3" /> : <CameraOffIcon className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remote participants */}
              {remoteUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-700/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <div className="flex gap-1 mt-1">
                        <div
                          className={`flex items-center p-1 rounded-md ${user.isMicOn ? "bg-zinc-700" : "bg-red-600"}`}
                        >
                          {user.isMicOn ? <MicIcon className="w-3 h-3" /> : <MicOffIcon className="w-3 h-3" />}
                        </div>
                        <div
                          className={`flex items-center p-1 rounded-md ${user.isCamOn ? "bg-zinc-700" : "bg-red-600"}`}
                        >
                          {user.isCamOn ? <CameraIcon className="w-3 h-3" /> : <CameraOffIcon className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isAdmin && (
                    <div className="relative">
                      <button onClick={() => toggleDropdown(user.id)} className="p-2 rounded-full hover:bg-zinc-700">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </button>
                      {showDropdownId === user.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-zinc-800 rounded-md shadow-lg z-10 border border-zinc-700">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-zinc-700"
                            onClick={() => {
                              adminToggleRemote(user.id, "isMicOn")
                              toggleDropdown(user.id)
                            }}
                          >
                            {user.isMicOn ? "Mute participant" : "Unmute participant"}
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-zinc-700"
                            onClick={() => {
                              adminToggleRemote(user.id, "isCamOn")
                              toggleDropdown(user.id)
                            }}
                          >
                            {user.isCamOn ? "Turn off camera" : "Turn on camera"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div className="flex items-center justify-center gap-2 p-4 bg-zinc-800 border-t border-zinc-700">
        <div className="relative">
          <button
            onClick={toggleMic}
            onMouseEnter={() => setShowTooltip("mic")}
            onMouseLeave={() => setShowTooltip(null)}
            className={`rounded-full h-12 w-12 flex items-center justify-center ${
              isMicOn ? "bg-zinc-700 hover:bg-zinc-600" : "bg-red-600 hover:bg-red-700"
            }`}
            aria-label={isMicOn ? "Mute microphone" : "Unmute microphone"}
          >
            {isMicOn ? <MicIcon className="h-5 w-5" /> : <MicOffIcon className="h-5 w-5" />}
          </button>
          {showTooltip === "mic" && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black rounded text-xs whitespace-nowrap">
              {isMicOn ? "Mute microphone" : "Unmute microphone"}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleCam}
            onMouseEnter={() => setShowTooltip("cam")}
            onMouseLeave={() => setShowTooltip(null)}
            className={`rounded-full h-12 w-12 flex items-center justify-center ${
              isCamOn ? "bg-zinc-700 hover:bg-zinc-600" : "bg-red-600 hover:bg-red-700"
            }`}
            aria-label={isCamOn ? "Turn off camera" : "Turn on camera"}
          >
            {isCamOn ? <CameraIcon className="h-5 w-5" /> : <CameraOffIcon className="h-5 w-5" />}
          </button>
          {showTooltip === "cam" && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black rounded text-xs whitespace-nowrap">
              {isCamOn ? "Turn off camera" : "Turn on camera"}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleScreenShare}
            onMouseEnter={() => setShowTooltip("screen")}
            onMouseLeave={() => setShowTooltip(null)}
            className={`rounded-full h-12 w-12 flex items-center justify-center ${
              isScreenSharing ? "bg-blue-600 hover:bg-blue-700" : "bg-zinc-700 hover:bg-zinc-600"
            }`}
            aria-label={isScreenSharing ? "Stop sharing" : "Share screen"}
          >
            <MonitorIcon className="h-5 w-5" />
          </button>
          {showTooltip === "screen" && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black rounded text-xs whitespace-nowrap">
              {isScreenSharing ? "Stop sharing" : "Share screen"}
            </div>
          )}
        </div>

        {/* Mobile participants button */}
        <div className="relative md:hidden">
          <button
            onClick={toggleMobileParticipants}
            onMouseEnter={() => setShowTooltip("participants")}
            onMouseLeave={() => setShowTooltip(null)}
            className="rounded-full h-12 w-12 flex items-center justify-center bg-zinc-700 hover:bg-zinc-600"
            aria-label="Show participants"
          >
            <UsersIcon className="h-5 w-5" />
          </button>
          {showTooltip === "participants" && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black rounded text-xs whitespace-nowrap">
              Show participants
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={handleDisconnect}
            onMouseEnter={() => setShowTooltip("disconnect")}
            onMouseLeave={() => setShowTooltip(null)}
            className="rounded-full h-12 w-12 flex items-center justify-center bg-red-600 hover:bg-red-700"
            aria-label="Leave meeting"
          >
            <LogOutIcon className="h-5 w-5" />
          </button>
          {showTooltip === "disconnect" && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black rounded text-xs whitespace-nowrap">
              Leave meeting
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
