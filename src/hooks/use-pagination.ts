import { useMemo, useState } from 'react'

interface UsePaginationProps {
  totalItems: number
  itemsPerPage: number
  siblingCount?: number
}

export const usePagination = ({ totalItems, itemsPerPage, siblingCount = 1 }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const goToPage = (page: number) => setCurrentPage(Math.max(1, Math.min(page, totalPages)))

  const paginationRange = useMemo(() => {
    if (totalPages <= 1) return []

    const totalNumbers = siblingCount * 2 + 3 // First, last, and siblings
    const totalBlocks = totalNumbers + 2 // Including ellipses

    if (totalPages > totalBlocks) {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 2)
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 1)

      const showLeftEllipsis = leftSiblingIndex > 2
      const showRightEllipsis = rightSiblingIndex < totalPages - 1

      const pages: (number | '...')[] = [1]

      if (showLeftEllipsis) {
        pages.push('...')
      }

      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        pages.push(i)
      }

      if (showRightEllipsis) {
        pages.push('...')
      }

      pages.push(totalPages)
      return pages
    }

    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }, [totalPages, currentPage, siblingCount])

  return {
    currentPage,
    totalPages,
    paginationRange,
    isFirstPage,
    isLastPage,
    nextPage,
    prevPage,
    goToPage
  }
}
