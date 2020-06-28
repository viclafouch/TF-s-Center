import { useLocation } from 'react-router'
import { useMemo } from 'react'

function useQuery() {
  const searchParams = useLocation().search
  return useMemo(() => new URLSearchParams(searchParams), [searchParams])
}

export default useQuery
