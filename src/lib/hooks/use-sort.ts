import { useState } from 'react'

type SortDirection = 'asc' | 'desc'

export function useSort<T>(
  items: T[],
  initialSortKey: keyof T,
  initialDirection: SortDirection = 'asc'
) {
  const [sortKey, setSortKey] = useState<keyof T>(initialSortKey)
  const [direction, setDirection] = useState<SortDirection>(initialDirection)

  const sortedItems = [...items].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const toggleSort = (key: keyof T) => {
    if (key === sortKey) {
      setDirection(direction === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setDirection('asc')
    }
  }

  return {
    sortedItems,
    sortKey,
    direction,
    toggleSort,
  }
}