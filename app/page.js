import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover" src="videoplayback.webm"> 
          <source src="../public/videoplayback.webm" type="video/webm" />
          Your browser does not support the video tag.
          </video> 
       

        {/* <iframe width="930" height="523" src="https://www.youtube.com/embed/B3ZbsOhNTas?loop=1&autoplay=1&mute=1&controls=0?playList=0" title="Sea Waves - Sound Effect" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" className="" allowfullscreen></iframe> */}
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Welcome to AI interview buddy</h1>
          <Link href="/dashboard" className="inline-block bg-primary text-white text-lg font-semibold py-3 px-8 rounded hover:bg-purple-700 transition duration-300">Go to Dashboard</Link>
        </div>
      </section>

    </div>
  )
}


