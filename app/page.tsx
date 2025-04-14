import KaliDesktop from "@/components/kali-desktop/desktop"
import BootAnimation from "@/components/boot-animation"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-blue-500 font-mono">
      <BootAnimation />
      <KaliDesktop />
      <div className="developer-credit">
        Developed by Muhammad Faizan | faizzyhon@gmail.com | faizzyhon.vercel.app
      </div>
    </div>\
