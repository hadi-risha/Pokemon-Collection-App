import { useState } from 'react'
import Discover from './pages/Discover'
import Collection from './pages/Collection'
import { useCollection } from './context/CollectionContext'

function App() {
  const { collection } = useCollection()
  const [view, setView] = useState<'discover' | 'collection'>('discover')

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#697acf] to-[#7867e6] text-white ">
      
      {/* wrapper div for heading and buttons */}
      <div className="w-full bg-gray-100 py-6 px-4">
        <h1 className="text-black text-3xl font-bold text-center mb-3 max-[420px]:text-xl">
          🔥 Pokemon Collection App
        </h1>

        <p className="text-black font-medium text-center mb-4 max-w-[90%] mx-auto max-[420px]:text-sm max-[420px]:leading-snug">
          Discover, collect, and organize your favorite Pokemon!
        </p>

        <div className="flex justify-center gap-4 mb-2 flex-wrap max-[420px]:flex-col max-[420px]:items-center">
          <button
            onClick={() => setView('discover')}
            className={`px-4 py-2 rounded-full text-sm max-[420px]:w-full max-[420px]:text-sm
              ${view === 'discover'
                ? 'border-2 border-yellow-300 scale-105 font-semibold shadow-md cursor-pointer'
                : 'border-2 border-transparent font-semibold cursor-pointer'
              } 
              bg-[#7e17c2] text-white`}
          >
            🔍 Discover Pokemon
          </button>

          <button
            onClick={() => setView('collection')}
            className={`px-4 py-2 rounded-full text-sm max-[420px]:w-full max-[420px]:text-sm
              ${view === 'collection'
                ? 'border-2 border-yellow-300 scale-105 font-semibold shadow-md cursor-pointer'
                : 'border-2 border-transparent font-semibold cursor-pointer'
              } 
              bg-[#627af5] text-white`}
          >
            📚 My Collection ({collection.length})
          </button>
        </div>
      </div>


      {/* Page Component Render */}
      <div className="mt-6">
        {view === 'discover' ? <Discover /> : <Collection />}
      </div>
    </div>
  )
}



export default App
