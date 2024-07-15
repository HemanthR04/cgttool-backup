'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const FetchURLs = () => {
    const searchParams = useSearchParams();
  return (
    <div>{searchParams}</div>
  )
}

export default FetchURLs