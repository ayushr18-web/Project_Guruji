import { Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { create } from 'zustand'

type BearStore = {
  bears: number
  increase: () => void
}

const useBearStore = create<BearStore>((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}))

export default function Home() {
  const { bears, increase } = useBearStore()

  const { data } = useQuery({
    queryKey: ['hello'],
    queryFn: () => Promise.resolve('Hello from React Query!'),
  })

  return (
    <div style={{ padding: 20 }}>
      <h1>{data}</h1>
      <h2>Bears: {bears}</h2>
      <Button variant="contained" onClick={increase}>
        Add Bear
      </Button>
    </div>
  )
}
