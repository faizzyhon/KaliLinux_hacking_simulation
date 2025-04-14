"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, AlertCircle, Search, User, MessageSquare, Calendar, Clock } from "lucide-react"

export default function DarkWebExplorer() {
  const [activeTab, setActiveTab] = useState("forum")

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <Globe className="mr-2" />
          Dark Web Explorer (Fictional)
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module presents a fictional representation of dark web forums and marketplaces for educational purposes.
          All content is simulated.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">
            Educational simulation only. This is a fictional representation with no connection to actual dark web
            content.
          </span>
        </div>
      </div>

      <div className="bg-black border border-green-700 rounded overflow-hidden">
        <div className="bg-black text-green-400 px-4 py-2 border-b border-green-700 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm flex-1 text-center">
            <span className="font-mono">onion://darkweb.simulation.edu</span>
          </div>
        </div>

        <div className="p-4 bg-gray-950">
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl text-green-400 font-mono">DarkSim Network</div>
            <div className="flex items-center text-xs text-green-700">
              <Clock className="w-3 h-3 mr-1" />
              <span>Connection: Simulated</span>
            </div>
          </div>

          <div className="flex mb-4 border-b border-green-900">
            <button
              className={`px-4 py-2 text-sm ${activeTab === "forum" ? "text-green-400 border-b-2 border-green-500" : "text-green-700 hover:text-green-600"}`}
              onClick={() => setActiveTab("forum")}
            >
              Forums
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === "marketplace" ? "text-green-400 border-b-2 border-green-500" : "text-green-700 hover:text-green-600"}`}
              onClick={() => setActiveTab("marketplace")}
            >
              Marketplace
            </button>
            <button
              className={`px-4 py-2 text-sm ${activeTab === "security" ? "text-green-400 border-b-2 border-green-500" : "text-green-700 hover:text-green-600"}`}
              onClick={() => setActiveTab("security")}
            >
              Security Guide
            </button>
          </div>

          {activeTab === "forum" && (
            <div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-black border border-green-900 text-green-500 px-3 py-2 pl-10 rounded focus:outline-none focus:ring-1 focus:ring-green-700"
                    placeholder="Search forums..."
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-green-700" />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-green-400 mb-2 text-lg">Popular Discussions</h3>

                <div className="space-y-3">
                  {[
                    {
                      title: "Security vulnerabilities in IoT devices",
                      replies: 42,
                      author: "anonymous_researcher",
                      date: "2 hours ago",
                    },
                    {
                      title: "Guide: Setting up secure communications",
                      replies: 128,
                      author: "privacy_advocate",
                      date: "1 day ago",
                    },
                    {
                      title: "Discussion: Latest encryption standards",
                      replies: 76,
                      author: "crypto_expert",
                      date: "3 days ago",
                    },
                    {
                      title: "Tutorial: Advanced OPSEC techniques",
                      replies: 94,
                      author: "security_specialist",
                      date: "5 days ago",
                    },
                  ].map((thread, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-green-900 rounded p-3 hover:bg-green-900 hover:bg-opacity-10 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <div className="text-green-400">{thread.title}</div>
                        <div className="text-green-700 text-xs flex items-center">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {thread.replies}
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs">
                        <div className="text-green-600 flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {thread.author}
                        </div>
                        <div className="text-green-700 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {thread.date}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-green-400 mb-2 text-lg">Forum Categories</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      name: "Security Research",
                      threads: 1245,
                      description: "Discussion of security vulnerabilities and research",
                    },
                    {
                      name: "Privacy Tools",
                      threads: 876,
                      description: "Tools and techniques for maintaining privacy",
                    },
                    {
                      name: "Cryptography",
                      threads: 543,
                      description: "Encryption methods and cryptographic discussions",
                    },
                    { name: "Network Security", threads: 921, description: "Securing networks and communications" },
                  ].map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="border border-green-900 rounded p-3 hover:bg-green-900 hover:bg-opacity-10 cursor-pointer"
                    >
                      <div className="text-green-400">{category.name}</div>
                      <div className="text-green-700 text-xs mt-1">{category.threads} threads</div>
                      <div className="text-green-600 text-xs mt-2">{category.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "marketplace" && (
            <div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-black border border-green-900 text-green-500 px-3 py-2 pl-10 rounded focus:outline-none focus:ring-1 focus:ring-green-700"
                    placeholder="Search marketplace..."
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-green-700" />
                </div>
              </div>

              <div className="mb-6">
                <div className="p-3 bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded text-yellow-500 text-sm">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span>
                      Educational Notice: This is a simulated marketplace for educational purposes only. All listings
                      are fictional.
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-green-400 mb-2 text-lg">Featured Listings</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      title: "Advanced VPN Service",
                      price: "0.015 BTC",
                      seller: "privacy_provider",
                      rating: "4.9/5",
                      category: "Security Software",
                    },
                    {
                      title: "Secure Communication Tool",
                      price: "0.008 BTC",
                      seller: "crypto_dev",
                      rating: "4.7/5",
                      category: "Privacy Tools",
                    },
                    {
                      title: "Network Analysis Suite",
                      price: "0.025 BTC",
                      seller: "security_vendor",
                      rating: "4.8/5",
                      category: "Security Software",
                    },
                    {
                      title: "Encrypted Storage Solution",
                      price: "0.012 BTC",
                      seller: "data_protector",
                      rating: "4.6/5",
                      category: "Privacy Tools",
                    },
                  ].map((listing, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-green-900 rounded p-3 hover:bg-green-900 hover:bg-opacity-10 cursor-pointer"
                    >
                      <div className="flex justify-between">
                        <div className="text-green-400">{listing.title}</div>
                        <div className="text-green-500 font-mono text-sm">{listing.price}</div>
                      </div>
                      <div className="text-green-700 text-xs mt-1">{listing.category}</div>
                      <div className="flex justify-between mt-2 text-xs">
                        <div className="text-green-600 flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {listing.seller}
                        </div>
                        <div className="text-green-600">Rating: {listing.rating}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-green-400 mb-2 text-lg">Categories</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: "Security Software", listings: 156 },
                    { name: "Privacy Tools", listings: 98 },
                    { name: "Secure Communication", listings: 74 },
                    { name: "Encryption Services", listings: 63 },
                    { name: "Network Security", listings: 87 },
                    { name: "Digital Forensics", listings: 42 },
                    { name: "Security Education", listings: 53 },
                    { name: "Penetration Testing", listings: 67 },
                  ].map((category, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.4 }}
                      className="border border-green-900 rounded p-2 hover:bg-green-900 hover:bg-opacity-10 cursor-pointer text-center"
                    >
                      <div className="text-green-400 text-sm">{category.name}</div>
                      <div className="text-green-700 text-xs mt-1">{category.listings} listings</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <div className="mb-6">
                <h3 className="text-green-400 mb-4 text-lg">Dark Web Security Guide</h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="text-green-500 mb-2">Understanding the Dark Web</h4>
                    <p className="text-green-600">
                      The dark web refers to content that exists on darknets, overlay networks that use the Internet but
                      require specific software, configurations, or authorization to access. The dark web forms a small
                      part of the deep web, which is not indexed by standard search engines.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-green-500 mb-2">Risks and Concerns</h4>
                    <p className="text-green-600 mb-2">
                      While the dark web has legitimate uses for privacy and security, it also hosts illegal activities.
                      Common risks include:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-green-600">
                      <li>Malware distribution</li>
                      <li>Scams and fraud</li>
                      <li>Identity theft</li>
                      <li>Illegal marketplaces</li>
                      <li>Surveillance by various entities</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-green-500 mb-2">Security Best Practices</h4>
                    <ul className="list-disc pl-5 space-y-1 text-green-600">
                      <li>Use a dedicated, secure operating system</li>
                      <li>Keep all software updated</li>
                      <li>Use strong encryption and authentication</li>
                      <li>Disable JavaScript when browsing</li>
                      <li>Never reveal personal information</li>
                      <li>Use cryptocurrency with privacy features for transactions</li>
                      <li>Verify all links before clicking</li>
                      <li>Use PGP encryption for communications</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-green-500 mb-2">Legal and Ethical Considerations</h4>
                    <p className="text-green-600">
                      While privacy tools themselves are legal in most jurisdictions, many activities on the dark web
                      are illegal. Understanding the legal framework of your jurisdiction is essential. Always respect
                      privacy, security, and ethical boundaries.
                    </p>
                  </div>

                  <div className="p-3 bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded text-yellow-500">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      <span>
                        Remember: This simulation is for educational purposes only. The actual dark web contains illegal
                        content and activities that are not represented here.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
