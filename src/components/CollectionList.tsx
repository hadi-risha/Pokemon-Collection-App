// its all about Renders a draggable, sortable grid list of items
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { SortableItem } from './SortableItem' 
import { useCollection } from '../context/CollectionContext'

const CollectionList = () => {
  const { collection, setCollection, removeFromCollection  } = useCollection()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = collection.findIndex((p: any) => String(p.id) === active.id)
    const newIndex = collection.findIndex((p: any) => String(p.id) === over.id)
    const newOrder = arrayMove(collection, oldIndex, newIndex)
    setCollection(newOrder)
  }


  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={collection.map((p: any) => String(p.id))} 
        strategy={verticalListSortingStrategy}
      >
        <div className="flex justify-center px-4 pb-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">

          {collection.map((pokemon: any) => (
            <SortableItem
                key={pokemon.id}
                pokemon={pokemon}
                remove={removeFromCollection}
            />
          ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  )
}

export default CollectionList

