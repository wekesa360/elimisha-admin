import { useState } from 'react'
import { useDebounce } from './use-debounce'

export function useSearch<T>(items: T[], searchKey: keyof T) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const filteredItems = items.filter((item) => {
    const value = item[searchKey]
    if (typeof value === 'string') {
      return value.toLowerCase().includes(debouncedQuery.toLowerCase())
    }
    return false
  })

  return {
    query,
    setQuery,
    filteredItems,
  }
}