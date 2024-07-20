import { LoaderCircle } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <div className='w-screen h-screen'><LoaderCircle className='animate-spin' /></div>
  )
}

export default loading