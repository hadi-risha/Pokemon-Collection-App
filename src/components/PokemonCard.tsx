// handling single pokemon card in discover page
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCollection } from '../context/CollectionContext'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import PokemonModal from './PokemonModal'

interface Props {
  name: string
  url: string
}

const typeColors: Record<string, string> = {
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  poison: 'bg-purple-400',
  flying: 'bg-gray-400',
  electric: 'bg-yellow-300',
  psychic: 'bg-pink-400',
  dragon: 'bg-indigo-400',
}

const PokemonCard = ({ name, url }: Props) => {
  const { addToCollection, removeFromCollection, isInCollection } = useCollection()
  const { data } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => axios.get(url).then(res => res.data),
  })

  const [showModal, setShowModal] = useState(false)
  if (!data) return null

  const { sprites, types, stats } = data
  const hp = stats.find((s: any) => s.stat.name === 'hp')?.base_stat
  const attack = stats.find((s: any) => s.stat.name === 'attack')?.base_stat
  const defense = stats.find((s: any) => s.stat.name === 'defense')?.base_stat
  const isCollected = isInCollection(data.id)

  const handleCardClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <div
        className="relative bg-white text-black rounded-xl p-4 py-8 shadow-lg w-[300px] overflow-hidden cursor-pointer"
        onClick={handleCardClick}
      >
        {/* top line */}
        <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-red-500 via-yellow-400 to-purple-500 rounded-t-xl" />

        {/* add/remove */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            isCollected ? removeFromCollection(data.id) : addToCollection(data)
          }}
          className={`absolute top-4 right-3 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer ${
            isCollected ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {isCollected ? <FaTimes size={12} /> : <FaPlus size={12} />}
        </button>

        <div className='p-2 rounded-full bg-gradient-to-b from-[#f28add] to-[#e835c4] w-fit mx-auto'>
          <img src={sprites.front_default} alt={name} className="w-20 h-20" />
        </div>

        <h2 className="text-lg font-bold capitalize text-center mt-2">{name}</h2>

        <div className="flex justify-center flex-wrap gap-2 mt-2 mb-4">
          {types.map((t: any) => (
            <span
              key={t.slot}
              className={`text-xs px-2 py-[3px] rounded-full text-white font-bold ${
                typeColors[t.type.name] || 'bg-gray-400'
              }`}
            >
              {t.type.name.toUpperCase()}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center px-2">
          <div className="text-center">
            <p className="text-blue-600 font-bold">{hp}</p>
            <p className="text-xs text-gray-800 font-medium">HP</p>
          </div>
          <div className="text-center">
            <p className="text-blue-600 font-bold">{attack}</p>
            <p className="text-xs text-gray-800 font-medium">Attack</p>
          </div>
          <div className="text-center">
            <p className="text-blue-600 font-bold">{defense}</p>
            <p className="text-xs text-gray-800 font-medium">Defense</p>
          </div>
        </div>
      </div>
      {showModal && (
        <PokemonModal
          data={data}
          onClose={() => setShowModal(false)}
          isInCollection={isCollected} 
          onAdd={addToCollection}
          onRemove={removeFromCollection}
        />
      )}
    </>
  )
}

export default PokemonCard
