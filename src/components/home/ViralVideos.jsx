import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Heart, MessageCircle, TrendingUp, Check, X } from 'lucide-react'
const V_PATH = '/assets/portfolio/portfolio-assets/videos-portfolio'

const VIDEOS = [
  { id: 1, src: `${V_PATH}/patio-espanol-v3.webm`, views: '110K', likes: '5K', type: 'video/webm' },
  { id: 2, src: `${V_PATH}/reel-c6085.webm`, views: '88K', likes: '3.2K', type: 'video/webm' },
  { id: 3, src: `${V_PATH}/reel-1.webm`, views: '410K', likes: '30K', type: 'video/webm' },
  { id: 4, src: `${V_PATH}/reel-5.webm`, views: '550K', likes: '45K', type: 'video/webm' },
  { id: 5, src: `${V_PATH}/img-0467.webm`, views: '320K', likes: '20K', type: 'video/webm' },
  { id: 6, src: `${V_PATH}/img-0085.webm`, views: '200K', likes: '12K', type: 'video/webm' },
  { id: 7, src: `${V_PATH}/img-0332.webm`, views: '150K', likes: '8K', type: 'video/webm' },
  { id: 8, src: `${V_PATH}/img-0776.webm`, views: '95K', likes: '4K', type: 'video/webm' },
  { id: 9, src: `${V_PATH}/video1.webm`, views: '1.2M', likes: '84K', type: 'video/webm' },
  { id: 10, src: `${V_PATH}/video2.webm`, views: '840K', likes: '52K', type: 'video/webm' },
  { id: 11, src: `${V_PATH}/video3.webm`, views: '2.1M', likes: '120K', type: 'video/webm' },
  { id: 12, src: `${V_PATH}/video4.webm`, views: '950K', likes: '64K', type: 'video/webm' },
]

export default function ViralVideos() {
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeVideo])

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
              onClick={() => setActiveVideo(video)}
              className="group relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-100 shadow-2xl cursor-pointer"
            >
              <video
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                muted
                loop
                playsInline
                autoPlay
              >
                <source src={video.src} type={video.type || 'video/mp4'} />
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

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-50"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-[85vh] max-w-[65vh] rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl"
            >
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              >
                <source src={activeVideo.src} type={activeVideo.type || 'video/mp4'} />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
