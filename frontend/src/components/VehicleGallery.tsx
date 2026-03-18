import { useState } from 'react'

interface Props {
  images: string[]
  make: string
  model: string
}

export default function VehicleGallery({ images, make, model }: Props) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="relative rounded-xl overflow-hidden bg-gray-100">
        <img
          src={images[active]}
          alt={`${make} ${model}`}
          className="w-full h-80 md:h-96 object-cover"
        />
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
          {active + 1} / {images.length}
        </span>
      </div>
      <div className="flex gap-3 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-lg overflow-hidden border-2 transition-all ${
              active === i ? 'border-yellow-400' : 'border-transparent'
            }`}
          >
            <img src={img} alt={`Thumbnail ${i + 1}`} className="w-20 h-14 object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
