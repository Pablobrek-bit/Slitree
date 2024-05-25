import { Spinner } from '@/components/Spinner'

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen text-teal-500">
      <Spinner />
    </div>
  )
}
