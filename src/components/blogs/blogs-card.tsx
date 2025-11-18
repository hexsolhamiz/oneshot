import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface DrillCardProps {
  image: string
  title: string
  description: string
}

export function BlogsCard({ image, title, description }: DrillCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 max-w-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-primary mb-3 text-pretty">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-black mb-6 leading-relaxed grow">
          {description}
        </p>

        {/* Button */}
        <div>
        <Button
          className=" bg-primary hover:bg-primary text-white font-normal rounded-full py-2"
        >
          Read More
        </Button>
      </div>
      </div>
    </div>
  )
}
