import { useState } from 'react'

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
}

export function usePagination({ totalItems, itemsPerPage }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const nextPage = () => {
    setCurrentPage((old) => Math.min(old + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((old) => Math.max(old - 1, 1))
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return {
    currentPage,
    setCurrentPage,
    nextPage,
    prevPage,
    totalPages,
    startIndex,
    endIndex,
  }
}