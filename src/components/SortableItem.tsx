// Used by the CollectionList for each Pokémon card with drag support
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react'
import PokemonModal from './PokemonModal'
import { useCollection } from '../context/CollectionContext'

interface Props {
  pokemon: any
  remove: (id: number) => void
}

export const SortableItem = ({ pokemon, remove }: Props) => {
  const { addToCollection, removeFromCollection, isInCollection } = useCollection()
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: String(pokemon.id)
  })

  const [showModal, setShowModal] = useState(false)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
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

  const hp = pokemon.stats.find((s: any) => s.stat.name === 'hp')?.base_stat
  const attack = pokemon.stats.find((s: any) => s.stat.name === 'attack')?.base_stat
  const defense = pokemon.stats.find((s: any) => s.stat.name === 'defense')?.base_stat

  // for modal
  const handleCardClick = () => setShowModal(true)

  return (
     <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        onClick={handleCardClick}
        className="bg-white text-black rounded-xl overflow-hidden shadow-md flex flex-col items-center relative cursor-pointer"
      >
        {/* top line */}
        <div className="h-[4px] w-full bg-gradient-to-r from-red-500 via-yellow-400 to-purple-500" />


        {/* drag handle */}
        <div
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 cursor-grab text-lg select-none"
          title="Drag to reorder"
        >
          ⠿
        </div>

        {/* card content */}
        <div className='mt-8 p-2 rounded-full bg-gradient-to-b from-[#f28add] to-[#e835c4] w-fit mx-auto'>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20" />
        </div>
        <h2 className="text-lg font-bold capitalize text-center mt-2">{pokemon.name}</h2>

        <div className="flex justify-center flex-wrap gap-2 mt-2 mb-4">
          {pokemon.types.map((t: any) => (
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

        {/* stats inline */}
        <div className="flex justify-center items-center gap-15 px-2 mt-2">
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

      
        <button
          onClick={() => {
            console.log('❌ Remove clicked:', pokemon.id)
            remove(Number(pokemon.id))
          }}
          className="mb-4 mt-3 bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer"
        >
          <FaTimes size={14} color="white" />
        </button>
      </div>
      {showModal && (
        <PokemonModal
          data={pokemon}
          onClose={() => setShowModal(false)}
          isInCollection={isInCollection(pokemon.id)} 
          onAdd={addToCollection}
          onRemove={removeFromCollection}
        />
      )}
    </>
  )
}