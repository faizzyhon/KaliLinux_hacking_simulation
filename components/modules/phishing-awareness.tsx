"use client"

import type React from "react"

import { useState } from "react"
import { FileSearch, AlertCircle, Mail, Eye, EyeOff, Info } from "lucide-react"

export default function PhishingAwareness() {
  const [step, setStep] = useState(0)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setSubmitted(true)
      setTimeout(() => {
        setStep(1)
      }, 1500)
    }
  }

  const resetSimulation = () => {
    setStep(0)
    setEmail("")
    setPassword("")
    setSubmitted(false)
  }

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <FileSearch className="mr-2" />
          Phishing Awareness
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module demonstrates how phishing attacks work by simulating a fake login page. After submission, you'll
          see what information could be captured.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">Educational simulation only. No actual data is stored or transmitted.</span>
        </div>
      </div>

      {step === 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-white text-black rounded-lg overflow-hidden shadow-lg">
              <div className="bg-blue-600 p-4 text-white">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-2" />
                  <h3 className="text-lg font-semibold">CloudMail Login</h3>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={submitted}
                    className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                      submitted ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {submitted ? "Logging in..." : "Sign In"}
                  </button>
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                    href="#"
                  >
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-black border border-green-700 rounded p-4">
            <div className="flex items-center mb-4">
              <Info className="w-5 h-5 mr-2 text-green-400" />
              <h3 className="text-green-400 text-lg">Phishing Simulation Guide</h3>
            </div>
            <div className="text-green-600 text-sm space-y-3">
              <p>
                This is a simulated phishing page designed to look like a legitimate login form. In real phishing
                attacks, these pages are designed to look identical to legitimate services.
              </p>
              <p>
                Enter any email and password to see what information could be captured in a real phishing attack. No
                data will be stored or transmitted.
              </p>
              <p>Common signs of phishing:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Suspicious URLs (not matching the official domain)</li>
                <li>Poor spelling and grammar</li>
                <li>Urgent requests for personal information</li>
                <li>Threats or unusual promises</li>
                <li>Unexpected attachments</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-black border border-green-700 rounded-lg overflow-hidden mb-6">
            <div className="bg-red-900 bg-opacity-30 p-4 border-b border-green-700 flex justify-between items-center">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                <h3 className="text-red-500">Phishing Demonstration Complete</h3>
              </div>
              <button
                onClick={resetSimulation}
                className="text-xs text-green-700 hover:text-green-500 border border-green-700 px-2 py-1 rounded"
              >
                Reset Simulation
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-xl text-green-400 mb-4">Information that could be captured:</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black border border-green-900 rounded p-4">
                  <h4 className="text-green-400 mb-2">User Credentials</h4>
                  <div className="text-green-600 font-mono">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-green-700">Email:</div>
                      <div className="col-span-2">{email}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-green-700">Password:</div>
                      <div className="col-span-2">{password}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black border border-green-900 rounded p-4">
                  <h4 className="text-green-400 mb-2">Browser Information</h4>
                  <div className="text-green-600 font-mono">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-green-700">User Agent:</div>
                      <div className="col-span-2 text-xs">
                        Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
                        Chrome/112.0.0.0 Safari/537.36
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-green-700">Language:</div>
                      <div className="col-span-2">en-US</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-green-700">Platform:</div>
                      <div className="col-span-2">Win32</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black border border-green-900 rounded p-4">
                  <h4 className="text-green-400 mb-2">IP & Location Data</h4>
                  <div className="text-green-600 font-mono">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-green-700">IP Address:</div>
                      <div className="col-span-2">192.168.1.105</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-green-700">Location:</div>
                      <div className="col-span-2">New York, United States</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-green-700">ISP:</div>
                      <div className="col-span-2">Comcast Cable</div>
                    </div>
                  </div>
                </div>

                <div className="bg-black border border-green-900 rounded p-4">
                  <h4 className="text-green-400 mb-2">Session Information</h4>
                  <div className="text-green-600 font-mono">
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-green-700">Timestamp:</div>
                      <div className="col-span-2">{new Date().toISOString()}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div className="text-green-700">Cookies:</div>
                      <div className="col-span-2">session_id=a1b2c3d4e5f6</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-green-700">Referrer:</div>
                      <div className="col-span-2">https://email-security-alert.example.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded text-yellow-500">
                <h4 className="flex items-center mb-2">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  How to protect yourself:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Always verify the URL before entering credentials</li>
                  <li>Enable two-factor authentication when available</li>
                  <li>Don't click on suspicious links in emails</li>
                  <li>Use different passwords for different services</li>
                  <li>Keep your browser and security software updated</li>
                  <li>Report phishing attempts to your IT department or the service being impersonated</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
