import { useEffect, useRef } from 'react'
import { FaTimes } from 'react-icons/fa'

interface Props {
  data: any
  onClose: () => void
  isInCollection: boolean
  onAdd: (pokemon: any) => void
  onRemove: (id: number) => void
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

const PokemonModal = ({
  data,
  onClose,
  isInCollection,
  onAdd,
  onRemove
}: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // close modal when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  const hp = data.stats.find((s: any) => s.stat.name === 'hp')?.base_stat
  const attack = data.stats.find((s: any) => s.stat.name === 'attack')?.base_stat
  const defense = data.stats.find((s: any) => s.stat.name === 'defense')?.base_stat

  const handleClick = () => {
    if (isInCollection) {
      onRemove(data.id)
    } else {
      onAdd(data)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white text-black rounded-xl p-6 w-[90%] max-w-md relative"
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black bg-gray-300 hover:bg-gray-400 p-1 rounded-full"
        >
          <FaTimes />
        </button>

        {/* content */}
        <div className="text-center">
          <div className='mt-8 p-2 rounded-full bg-gradient-to-b from-[#f28add] to-[#e835c4] w-fit mx-auto'>
            <img src={data.sprites.front_default} alt={data.name} className="w-28 h-28" />
          </div>
          <h2 className="text-2xl font-bold capitalize mt-2">{data.name}</h2>

          {/* types */}
          <div className="flex justify-center flex-wrap gap-2 mt-3 mb-2">
            {data.types.map((t: any) => (
              <span
                key={t.slot}
                className={`text-xs px-3 py-[5px] rounded-full text-white font-bold ${
                  typeColors[t.type.name] || 'bg-gray-400'
                }`}
              >
                {t.type.name.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="flex justify-around my-4">
            <div>
              <p className="text-blue-600 font-bold">{hp}</p>
              <p className="text-sm">HP</p>
            </div>
            <div>
              <p className="text-blue-600 font-bold">{attack}</p>
              <p className="text-sm">Attack</p>
            </div>
            <div>
              <p className="text-blue-600 font-bold">{defense}</p>
              <p className="text-sm">Defense</p>
            </div>
          </div>

          {/* add/remove btn */}
          <button
            onClick={handleClick}
            className={`mt-4 px-5 py-2 text-white font-semibold rounded-full ${
              isInCollection ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isInCollection ? 'Remove from Collection' : 'Add to Collection'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PokemonModal
