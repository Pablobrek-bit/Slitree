import { Loader } from 'lucide-react'

export function Spinner() {
  return (
    <div className="animate-spin text-inherit">
      <Loader className="text-inherit" size={24} />
    </div>
  )
}
