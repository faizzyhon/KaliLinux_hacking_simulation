"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Terminal, AlertCircle } from "lucide-react"

export default function VirtualShell() {
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [outputHistory, setOutputHistory] = useState<{ command: string; output: string }[]>([])
  const [currentCommand, setCurrentCommand] = useState("")
  const [currentDirectory, setCurrentDirectory] = useState("/home/user")
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [outputHistory])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      processCommand()
    }
  }

  const processCommand = () => {
    if (!currentCommand.trim()) return

    const cmd = currentCommand.trim()
    setCommandHistory((prev) => [...prev, cmd])
    setCurrentCommand("")

    let output = ""

    // Process commands
    if (cmd === "help") {
      output = `Available commands:
help - Show this help message
ls - List directory contents
cd [directory] - Change directory
cat [file] - Display file contents
whoami - Display current user
pwd - Print working directory
ifconfig - Display network configuration
ps - Report process status
clear - Clear the terminal screen`
    } else if (cmd === "clear") {
      setOutputHistory([])
      return
    } else if (cmd === "whoami") {
      output = "user"
    } else if (cmd === "pwd") {
      output = currentDirectory
    } else if (cmd.startsWith("cd ")) {
      const dir = cmd.substring(3)
      if (dir === "..") {
        if (currentDirectory !== "/") {
          const parts = currentDirectory.split("/")
          parts.pop()
          setCurrentDirectory(parts.join("/") || "/")
          output = ""
        } else {
          output = ""
        }
      } else if (dir.startsWith("/")) {
        setCurrentDirectory(dir)
        output = ""
      } else {
        setCurrentDirectory(`${currentDirectory === "/" ? "" : currentDirectory}/${dir}`)
        output = ""
      }
    } else if (cmd === "ls" || cmd === "ls -la") {
      if (currentDirectory === "/home/user") {
        output = `total 32
drwxr-xr-x  5 user user 4096 Apr 14 10:23 .
drwxr-xr-x  3 root root 4096 Apr 14 09:15 ..
-rw-------  1 user user  220 Apr 14 09:15 .bash_history
-rw-r--r--  1 user user 3771 Apr 14 09:15 .bashrc
drwxr-xr-x  2 user user 4096 Apr 14 09:15 Documents
drwxr-xr-x  2 user user 4096 Apr 14 09:15 Downloads
-rw-r--r--  1 user user  807 Apr 14 09:15 .profile
-rw-r--r--  1 user user    0 Apr 14 10:23 .sudo_as_admin_successful
drwxr-xr-x  2 user user 4096 Apr 14 09:15 .ssh
-rw-r--r--  1 user user  168 Apr 14 10:23 todo.txt`
      } else if (currentDirectory === "/home/user/Documents") {
        output = `total 16
drwxr-xr-x 2 user user 4096 Apr 14 09:15 .
drwxr-xr-x 5 user user 4096 Apr 14 10:23 ..
-rw-r--r-- 1 user user  253 Apr 14 09:15 passwords.txt
-rw-r--r-- 1 user user  124 Apr 14 09:15 report.txt`
      } else if (currentDirectory === "/home/user/Downloads") {
        output = `total 12
drwxr-xr-x 2 user user 4096 Apr 14 09:15 .
drwxr-xr-x 5 user user 4096 Apr 14 10:23 ..
-rw-r--r-- 1 user user 1234 Apr 14 09:15 cybersim.zip`
      } else if (currentDirectory === "/") {
        output = `total 24
drwxr-xr-x   5 root root 4096 Apr 14 09:15 .
drwxr-xr-x   5 root root 4096 Apr 14 09:15 ..
drwxr-xr-x   2 root root 4096 Apr 14 09:15 bin
drwxr-xr-x   2 root root 4096 Apr 14 09:15 etc
drwxr-xr-x   3 root root 4096 Apr 14 09:15 home
drwxr-xr-x   2 root root 4096 Apr 14 09:15 var`
      } else {
        output = `total 8
drwxr-xr-x 2 root root 4096 Apr 14 09:15 .
drwxr-xr-x 5 root root 4096 Apr 14 09:15 ..`
      }
    } else if (cmd.startsWith("cat ")) {
      const file = cmd.substring(4)
      if (currentDirectory === "/home/user" && file === "todo.txt") {
        output = `TODO:
1. Update server security patches
2. Change default passwords
3. Configure firewall rules
4. Backup database`
      } else if (currentDirectory === "/home/user/Documents" && file === "passwords.txt") {
        output = `NOTE: This is a simulation file for educational purposes only.

admin:Password123
root:toor
user:user123

REMINDER: These are examples of weak passwords that should never be used in real systems!`
      } else if (currentDirectory === "/home/user/Documents" && file === "report.txt") {
        output = `Security Audit Report
Date: April 14, 2025
Status: Incomplete
Findings: 3 critical vulnerabilities found`
      } else {
        output = `cat: ${file}: No such file or directory`
      }
    } else if (cmd === "ifconfig") {
      output = `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::215:5dff:fe36:7a2a  prefixlen 64  scopeid 0x20<link>
        ether 00:15:5d:36:7a:2a  txqueuelen 1000  (Ethernet)
        RX packets 8935  bytes 13342770 (13.3 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 4568  bytes 648624 (648.6 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 1452  bytes 129456 (129.4 KB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1452  bytes 129456 (129.4 KB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`
    } else if (cmd === "ps" || cmd === "ps aux") {
      output = `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 171656  9100 ?        Ss   10:15   0:01 /sbin/init
root       125  0.0  0.1  94772  5356 ?        Ss   10:15   0:00 /lib/systemd/systemd-journald
root       167  0.0  0.0  30104  3208 ?        Ss   10:15   0:00 /usr/sbin/cron -f
root       168  0.0  0.1  70760  5188 ?        Ss   10:15   0:00 /lib/systemd/systemd-logind
syslog     169  0.0  0.0 141936  3208 ?        Ssl  10:15   0:00 /usr/sbin/rsyslogd -n
root       170  0.0  0.0   4396  1536 tty1     Ss+  10:15   0:00 /sbin/agetty -o -p -- \\u --noclear tty1 linux
root       172  0.0  0.1 291452  5440 ?        Ssl  10:15   0:00 /usr/lib/policykit-1/polkitd --no-debug
root       173  0.0  0.0  13372  3000 ?        Ss   10:15   0:00 /usr/sbin/sshd -D
user      1270  0.0  0.0  21420  3676 pts/0    Ss   10:23   0:00 bash
user      1325  0.0  0.0  38380  3764 pts/0    R+   10:30   0:00 ps aux`
    } else {
      output = `${cmd}: command not found`
    }

    setOutputHistory((prev) => [...prev, { command: cmd, output }])
  }

  return (
    <div className="text-green-500">
      <div className="mb-6">
        <h2 className="text-xl mb-4 flex items-center">
          <Terminal className="mr-2" />
          Virtual Shell
        </h2>
        <p className="text-green-600 mb-4 text-sm">
          This module simulates a Linux terminal environment. You can type commands and receive simulated responses.
        </p>
        <div className="flex items-center bg-black p-1 rounded border border-green-700 text-sm mb-4">
          <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
          <span className="text-yellow-500">Educational simulation only. No actual system commands are executed.</span>
        </div>
      </div>

      <div
        className="bg-black border border-green-700 rounded p-4 font-mono text-sm h-[400px] overflow-y-auto"
        ref={outputRef}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="mb-4">
          <div className="text-green-400">Welcome to CyberSim Virtual Shell</div>
          <div className="text-green-600">Type 'help' to see available commands</div>
        </div>

        {outputHistory.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="flex">
              <span className="text-green-700 mr-2">{currentDirectory === "/" ? "#" : "$"}</span>
              <span className="text-green-400">{item.command}</span>
            </div>
            <div className="text-green-600 whitespace-pre-wrap ml-4">{item.output}</div>
          </div>
        ))}

        <div className="flex items-center">
          <span className="text-green-700 mr-2">{currentDirectory === "/" ? "#" : "$"}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-green-400 flex-1"
            autoComplete="off"
            spellCheck="false"
          />
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            className="inline-block w-2 h-4 bg-green-500"
          />
        </div>
      </div>
    </div>
  )
}
