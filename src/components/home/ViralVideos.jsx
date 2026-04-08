import { motion } from 'framer-motion'
import { Play, Heart, MessageCircle, TrendingUp, Check } from 'lucide-react'

import video1 from '../../assets/videos/video1.webm'
import video2 from '../../assets/videos/video2.webm'
import video3 from '../../assets/videos/video3.webm'
import video4 from '../../assets/videos/video4.webm'

const VIDEOS = [
  { id: 1, src: video1, views: '1.2M', likes: '84K' },
  { id: 2, src: video2, views: '840K', likes: '52K' },
  { id: 3, src: video3, views: '2.1M', likes: '120K' },
  { id: 4, src: video4, views: '950K', likes: '64K' },
]

export default function ViralVideos() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="transformations">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-8 mb-16">
           <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                 <div className="w-10 h-10 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                    <TrendingUp size={20} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500">Trending Transformations</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none mb-4">
                 Visualizing <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Viral Excellence</span>
              </h2>
           </div>

           <a 
             href="https://www.instagram.com/fixmyhomellc/" 
             target="_blank" 
             rel="noopener noreferrer"
             className="group px-10 py-5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-2xl hover:shadow-pink-500/20 transition-all hover:-translate-y-1"
           >
             <Play size={20} />
             Follow on Instagram
           </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {VIDEOS.map((video, idx) => (
              <motion.div 
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-100 shadow-2xl"
              >
                 <video 
                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                   muted 
                   loop 
                   playsInline
                   autoPlay
                 >
                   <source src={video.src} type="video/webm" />
                 </video>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent " />
                 
                 {/* Social Overlay */}
                 <div className="absolute right-6 bottom-32 flex flex-col gap-6 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex flex-col items-center">
                       <button className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                          <Heart size={24} fill="currentColor" />
                       </button>
                       <span className="text-[10px] font-black mt-1 uppercase">{video.likes}</span>
                    </div>
                    <div className="flex flex-col items-center">
                       <button className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                          <MessageCircle size={24} fill="currentColor" />
                       </button>
                       <span className="text-[10px] font-black mt-1 uppercase">Comm</span>
                    </div>
                    <div className="flex flex-col items-center">
                       <button className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                          <Check size={24} fill="currentColor" />
                       </button>
                       <span className="text-[10px] font-black mt-1 uppercase">Share</span>
                    </div>
                 </div>

                 {/* Views Header */}
                 <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/20">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{video.views} Views</span>
                 </div>

                 {/* Play Button Overlay */}
                 <div className="absolute inset-0 flex items-center justify-center transition-all group-hover:scale-125">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-3xl rounded-full flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100">
                       <Play size={32} fill="currentColor" />
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>

      </div>
    </section>
  )
}
