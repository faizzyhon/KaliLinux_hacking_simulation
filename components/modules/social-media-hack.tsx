"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  AlertCircle,
  Search,
  Lock,
  ShieldAlert,
  CheckCircle,
  X,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  RefreshCw,
  Key,
  MessageSquare,
  TerminalIcon,
  Code,
} from "lucide-react"

export default function SocialMediaHack() {
  const [username, setUsername] = useState("")
  const [platform, setPlatform] = useState("instagram")
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [isHacking, setIsHacking] = useState(false)
  const [hackProgress, setHackProgress] = useState(0)
  const [hackComplete, setHackComplete] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupType, setPopupType] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [profileData, setProfileData] = useState<any>(null)
  const [glitchEffect, setGlitchEffect] = useState(false)

  const logEndRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const platforms = [
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "facebook", name: "Facebook", icon: Facebook },
    { id: "twitter", name: "Twitter", icon: Twitter },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  ]

  useEffect(() => {
    // Scroll to bottom when logs update
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [logs])

  // Trigger glitch effect occasionally
  useEffect(() => {
    if (isHacking || hackComplete) {
      const glitchInterval = setInterval(() => {
        setGlitchEffect(true)
        setTimeout(() => setGlitchEffect(false), 500)
      }, 5000)
      return () => clearInterval(glitchInterval)
    }
  }, [isHacking, hackComplete])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message])
  }

  const startScan = () => {
    if (!username || isScanning) return

    setIsScanning(true)
    setScanProgress(0)
    setScanComplete(false)
    setHackComplete(false)
    setShowPopup(false)
    setPopupType(null)
    setLogs([])
    setProfileData(null)

    addLog(`root@kali:~# ./recon.sh -t ${platform} -u ${username}`)
    addLog(`[*] Starting reconnaissance on ${platform} user: ${username}`)

    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + Math.random() * 5 + 1

        if (newProgress >= 100) {
          clearInterval(scanInterval)
          setIsScanning(false)
          setScanComplete(true)
          generateFakeProfile()
          return 100
        }

        // Add logs at specific progress points
        if (Math.floor(newProgress) === 20 && Math.floor(prev) < 20) {
          addLog(`[*] Searching for public ${platform} profile...`)
        }
        if (Math.floor(newProgress) === 40 && Math.floor(prev) < 40) {
          addLog(`[+] Profile found: ${username}`)
          addLog(`[*] Gathering public information...`)
        }
        if (Math.floor(newProgress) === 60 && Math.floor(prev) < 60) {
          addLog(`[*] Analyzing profile connections and activity...`)
        }
        if (Math.floor(newProgress) === 80 && Math.floor(prev) < 80) {
          addLog(`[*] Checking for linked accounts and email addresses...`)
        }
        if (Math.floor(newProgress) === 95 && Math.floor(prev) < 95) {
          addLog(`[+] Reconnaissance complete`)
        }

        return newProgress
      })
    }, 150)
  }

  const generateFakeProfile = () => {
    const platformIcon = platforms.find((p) => p.id === platform)?.icon || Instagram

    // Generate random follower/following counts
    const followers = Math.floor(Math.random() * 5000) + 100
    const following = Math.floor(Math.random() * 500) + 50
    const posts = Math.floor(Math.random() * 200) + 10

    // Generate random name
    const firstNames = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley", "Jamie", "Avery"]
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis"]
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const fullName = `${randomFirstName} ${randomLastName}`

    // Generate random email based on username
    const emailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"]
    const randomDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)]
    const email = `${username}@${randomDomain}`

    // Generate random phone number
    const phoneNumber = `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`

    // Generate random bio
    const bios = [
      "Living life to the fullest ✨",
      "Adventure seeker | Food lover | Travel enthusiast",
      "Professional photographer 📸",
      "Digital creator | DM for business inquiries",
      "Just here for the memes 😂",
    ]
    const randomBio = bios[Math.floor(Math.random() * bios.length)]

    const profile = {
      username,
      fullName,
      email,
      phoneNumber,
      bio: randomBio,
      followers,
      following,
      posts,
      isPrivate: Math.random() > 0.5,
      icon: platformIcon,
    }

    setProfileData(profile)

    // Add logs with the discovered information
    addLog(`[+] Profile information discovered:`)
    addLog(`    Username: ${username}`)
    addLog(`    Full Name: ${fullName}`)
    addLog(`    Email: ${email}`)
    addLog(`    Phone: ${phoneNumber}`)
    addLog(`    Followers: ${followers}`)
    addLog(`    Following: ${following}`)
    addLog(`    Posts: ${posts}`)
    addLog(`    Private Account: ${profile.isPrivate ? "Yes" : "No"}`)

    if (profile.isPrivate) {
      addLog(`[!] Note: This is a private account. Additional security measures may be in place.`)
    }

    addLog(`[*] Vulnerability assessment complete. Ready to execute attack vectors.`)
    addLog(`root@kali:~# `)
  }

  const startHack = () => {
    if (!scanComplete || isHacking) return

    setIsHacking(true)
    setHackProgress(0)
    setHackComplete(false)

    addLog(`root@kali:~# ./exploit.sh -t ${platform} -u ${username}`)
    addLog(`[*] Starting attack on ${platform} account: ${username}`)
    addLog(`[*] Attempting common attack vectors...`)

    const hackInterval = setInterval(() => {
      setHackProgress((prev) => {
        const newProgress = prev + Math.random() * 3 + 0.5

        if (newProgress >= 100) {
          clearInterval(hackInterval)
          setIsHacking(false)
          setHackComplete(true)
          addLog(`[+] Operation complete: Account access achieved`)
          addLog(`[+] Session token captured`)
          addLog(`root@kali:~# `)
          return 100
        }

        // Add logs at specific progress points
        if (Math.floor(newProgress) === 15 && Math.floor(prev) < 15) {
          addLog(`[*] Attempting password reset using discovered email: ${profileData.email}`)
        }
        if (Math.floor(newProgress) === 30 && Math.floor(prev) < 30) {
          addLog(`[*] Executing phishing attack targeting user...`)
        }
        if (Math.floor(newProgress) === 45 && Math.floor(prev) < 45) {
          addLog(`[*] Checking for password reuse across platforms...`)
        }
        if (Math.floor(newProgress) === 60 && Math.floor(prev) < 60) {
          addLog(`[+] Vulnerability found: Weak password recovery questions`)
        }
        if (Math.floor(newProgress) === 75 && Math.floor(prev) < 75) {
          addLog(`[*] Bypassing two-factor authentication...`)
        }
        if (Math.floor(newProgress) === 90 && Math.floor(prev) < 90) {
          addLog(`[*] Gaining access to account...`)
        }

        return newProgress
      })
    }, 200)
  }

  const showHackPopup = (type: string) => {
    setPopupType(type)
    setShowPopup(true)
  }

  const resetOperation = () => {
    setUsername("")
    setIsScanning(false)
    setScanProgress(0)
    setScanComplete(false)
    setIsHacking(false)
    setHackProgress(0)
    setHackComplete(false)
    setShowPopup(false)
    setPopupType(null)
    setLogs([])
    setProfileData(null)
  }

  const renderPopup = () => {
    if (!profileData) return null

    const PlatformIcon = profileData.icon

    switch (popupType) {
      case "login":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-gray-900 border border-blue-700 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`p-4 kali-titlebar flex justify-between items-center ${glitchEffect ? "glitch" : ""}`}>
                <div className="flex items-center">
                  <PlatformIcon className="w-6 h-6 mr-2 text-blue-400" />
                  <span className="text-blue-100 font-medium">
                    {platforms.find((p) => p.id === platform)?.name} Access
                  </span>
                </div>
                <button onClick={() => setShowPopup(false)} className="text-blue-400 hover:text-blue-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-gray-900 text-blue-100">
                <div className="mb-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-3 flex items-center justify-center border border-blue-700">
                    <User className="w-10 h-10 text-blue-400" />
                  </div>
                  <div className="text-blue-100 font-medium terminal-text">{profileData.username}</div>
                  <div className="text-blue-400 text-sm">{profileData.fullName}</div>
                </div>

                <div className="mb-4 bg-gray-800 p-3 rounded border border-blue-900">
                  <div className="text-green-400 font-mono mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>Access Granted</span>
                  </div>
                  <div className="text-blue-300 text-sm font-mono">
                    Session token:{" "}
                    {Array(32)
                      .fill(0)
                      .map(() => Math.floor(Math.random() * 16).toString(16))
                      .join("")}
                  </div>
                </div>

                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full bg-blue-800 text-blue-100 py-2 rounded hover:bg-blue-700 font-mono"
                >
                  Close Terminal
                </button>
              </div>
            </motion.div>
          </div>
        )

      case "messages":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-gray-900 border border-blue-700 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`p-4 kali-titlebar flex justify-between items-center ${glitchEffect ? "glitch" : ""}`}>
                <div className="flex items-center">
                  <PlatformIcon className="w-6 h-6 mr-2 text-blue-400" />
                  <span className="text-blue-100 font-medium">{profileData.username}'s Messages</span>
                </div>
                <button onClick={() => setShowPopup(false)} className="text-blue-400 hover:text-blue-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto bg-gray-900">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className="border-b border-blue-900 py-3 last:border-0">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 rounded-full bg-gray-800 mr-3 flex items-center justify-center border border-blue-900">
                        <User className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-blue-100 font-medium terminal-text">Contact {index + 1}</div>
                        <div className="text-blue-500 text-xs">Last active 2h ago</div>
                      </div>
                    </div>
                    <div className="text-blue-300 text-sm pl-13 font-mono">
                      {index % 2 === 0
                        ? "Hey, did you see my last message? I need your help with something..."
                        : "Can you send me that file we talked about? Thanks!"}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-800 text-center text-sm text-blue-400 font-mono border-t border-blue-900">
                This is an educational demonstration of private messages access.
              </div>
            </motion.div>
          </div>
        )

      case "profile":
        return (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-gray-900 border border-blue-700 rounded-lg w-full max-w-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`p-4 kali-titlebar flex justify-between items-center ${glitchEffect ? "glitch" : ""}`}>
                <div className="flex items-center">
                  <TerminalIcon className="w-6 h-6 mr-2 text-blue-400" />
                  <span className="text-blue-100 font-medium">Account Settings</span>
                </div>
                <button onClick={() => setShowPopup(false)} className="text-blue-400 hover:text-blue-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-gray-900">
                <div className="mb-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-800 mx-auto mb-3 flex items-center justify-center border border-blue-700">
                    <User className="w-10 h-10 text-blue-400" />
                  </div>
                  <div className="text-blue-100 font-medium terminal-text">{profileData.fullName}</div>
                  <div className="text-blue-400 text-sm font-mono">@{profileData.username}</div>
                </div>

                <div className="space-y-4 font-mono">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-900">
                    <div className="text-blue-400">Email</div>
                    <div className="text-blue-100">{profileData.email}</div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-900">
                    <div className="text-blue-400">Phone</div>
                    <div className="text-blue-100">{profileData.phoneNumber}</div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-900">
                    <div className="text-blue-400">Password</div>
                    <div className="text-blue-100">••••••••</div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-blue-900">
                    <div className="text-blue-400">Two-Factor Authentication</div>
                    <div className="text-red-500">Disabled</div>
                  </div>
                </div>

                <div className="mt-6 text-center text-sm text-blue-500 font-mono">
                  This is an educational demonstration of account settings access.
                </div>
              </div>
            </motion.div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="text-blue-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <User className="mr-2" />
          Social Engineering Toolkit
        </h2>
        <p className="text-blue-600 mb-4 text-sm">
          This tool demonstrates how social media accounts can be compromised. Enter a username to see a demonstration
          of reconnaissance and attack vectors.
        </p>
        <div className="flex items-center bg-gray-900 p-1 rounded border border-blue-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">
            Educational purposes only. No actual intrusion is performed. All data is fictional.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-900 border border-blue-700 rounded p-4 mb-4 kali-window">
            <h3 className="text-blue-400 mb-4 font-mono">Target Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-blue-600 mb-2 text-sm font-mono">Platform:</label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      className={`flex items-center justify-center p-2 rounded border ${
                        platform === p.id
                          ? "border-blue-500 bg-blue-900 bg-opacity-20 text-blue-400"
                          : "border-blue-900 text-blue-600 hover:border-blue-700"
                      }`}
                      onClick={() => setPlatform(p.id)}
                      disabled={isScanning || isHacking}
                    >
                      <p.icon className="w-4 h-4 mr-2" />
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-blue-600 mb-2 text-sm font-mono">Username or Profile URL:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isScanning || isHacking}
                    className="w-full bg-gray-900 border border-blue-700 text-blue-500 px-3 py-2 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    placeholder="username or URL"
                  />
                  <button
                    onClick={startScan}
                    disabled={!username || isScanning || isHacking}
                    className={`px-4 py-2 rounded-r border border-blue-700 ${
                      !username || isScanning || isHacking
                        ? "bg-blue-900 bg-opacity-10 text-blue-700"
                        : "bg-blue-900 bg-opacity-20 hover:bg-opacity-30 text-blue-500"
                    }`}
                  >
                    {isScanning ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                      >
                        <Search className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {(isScanning || scanComplete) && (
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span>Reconnaissance progress:</span>
                    <span>{Math.floor(scanProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-900 border border-blue-900 rounded-full h-2.5 mb-2">
                    <motion.div
                      className="bg-blue-500 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {scanComplete && !isHacking && !hackComplete && (
                <button
                  onClick={startHack}
                  className="w-full px-4 py-2 rounded border border-blue-700 bg-blue-900 bg-opacity-20 hover:bg-opacity-30 text-blue-500 font-mono"
                >
                  Execute Attack Vector
                </button>
              )}

              {(isHacking || hackComplete) && (
                <div>
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span>Attack progress:</span>
                    <span>{Math.floor(hackProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-900 border border-blue-900 rounded-full h-2.5 mb-2">
                    <motion.div
                      className="bg-blue-500 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${hackProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {hackComplete && (
                <div className="space-y-3">
                  <div className="p-3 bg-blue-900 bg-opacity-20 border border-blue-700 rounded">
                    <div className="text-center">
                      <div className="text-blue-400 font-medium mb-2 font-mono">Operation Complete</div>
                      <div className="text-blue-600 text-sm mb-3 font-mono">
                        The operation has demonstrated potential vulnerabilities. View the compromised account:
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => showHackPopup("login")}
                          className="flex flex-col items-center justify-center p-2 rounded border border-blue-900 hover:border-blue-700 text-blue-500"
                        >
                          <Key className="w-5 h-5 mb-1" />
                          <span className="text-xs">Login</span>
                        </button>
                        <button
                          onClick={() => showHackPopup("messages")}
                          className="flex flex-col items-center justify-center p-2 rounded border border-blue-900 hover:border-blue-700 text-blue-500"
                        >
                          <MessageSquare className="w-5 h-5 mb-1" />
                          <span className="text-xs">Messages</span>
                        </button>
                        <button
                          onClick={() => showHackPopup("profile")}
                          className="flex flex-col items-center justify-center p-2 rounded border border-blue-900 hover:border-blue-700 text-blue-500"
                        >
                          <User className="w-5 h-5 mb-1" />
                          <span className="text-xs">Profile</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={resetOperation}
                    className="w-full px-4 py-2 rounded border border-blue-700 text-blue-700 hover:text-blue-500 flex items-center justify-center font-mono"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Operation
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-900 border border-blue-700 rounded p-4 kali-window">
            <h3 className="text-blue-400 mb-4 font-mono">Protection Measures</h3>

            <div className="space-y-3 text-sm">
              <div>
                <h4 className="text-blue-500 mb-1 flex items-center font-mono">
                  <ShieldAlert className="w-4 h-4 mr-1" />
                  How to Protect Your Accounts:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-blue-600">
                  <li>Use strong, unique passwords for each account</li>
                  <li>Enable two-factor authentication</li>
                  <li>Be cautious of phishing attempts</li>
                  <li>Regularly check account activity</li>
                  <li>Limit personal information shared publicly</li>
                  <li>Use privacy settings to control who sees your content</li>
                  <li>Be careful with third-party applications</li>
                  <li>Keep your email account secure</li>
                </ul>
              </div>

              <div>
                <h4 className="text-blue-500 mb-1 flex items-center font-mono">
                  <Lock className="w-4 h-4 mr-1" />
                  Signs Your Account May Be Compromised:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-blue-600">
                  <li>Unexpected password changes</li>
                  <li>Unrecognized posts or messages</li>
                  <li>Login notifications from unknown locations</li>
                  <li>Friends receiving strange messages from you</li>
                  <li>Changes to account settings you didn't make</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-gray-900 border border-blue-700 rounded overflow-hidden h-full kali-window">
            <div className="kali-titlebar px-4 py-2 border-b border-blue-700 flex justify-between items-center">
              <span className="text-blue-100 font-mono flex items-center">
                <TerminalIcon className="w-4 h-4 mr-2" />
                Terminal Output
              </span>
              {(scanComplete || isScanning) && (
                <button onClick={resetOperation} className="text-xs text-blue-700 hover:text-blue-500 font-mono">
                  Reset
                </button>
              )}
            </div>
            <div
              ref={terminalRef}
              className={`bg-gray-900 p-4 h-[400px] overflow-y-auto font-mono text-sm ${glitchEffect ? "glitch" : ""}`}
            >
              {logs.length === 0 ? (
                <div className="text-blue-700 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Code className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>Enter a username and start the operation to see the process.</p>
                  </div>
                </div>
              ) : (
                <div>
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`mb-1 ${
                        log.includes("[+]")
                          ? "text-green-400"
                          : log.includes("[*]")
                            ? "text-blue-600"
                            : log.includes("[!]")
                              ? "text-yellow-500"
                              : log.includes("root@kali")
                                ? "text-blue-300"
                                : "text-blue-500"
                      }`}
                    >
                      {log}
                    </motion.div>
                  ))}
                  <div ref={logEndRef} />
                  {(isScanning || isHacking) && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                      className="inline-block w-2 h-4 bg-blue-500 ml-1"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderPopup()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
