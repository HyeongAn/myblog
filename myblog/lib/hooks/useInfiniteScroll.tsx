import React, { useCallback, useEffect, useRef, useState } from 'react'

const defaultOption = {
  threshold: 0.5,
  root: null,
  rootMargin: '0px 0px 0px 0px',
}

const useInfiniteScroll = (): [React.RefObject<HTMLDivElement>, number] => {
  const [count, setCount] = useState(1)
  const targetRef = useRef<HTMLDivElement>(null)

  const handleIntersect = useCallback(([entry]: IntersectionObserverEntry[], observe: IntersectionObserver) => {
    if (entry.isIntersecting) {
      setCount((prev) => prev + 1)
      observe.disconnect()
    }
  }, [])

  useEffect(() => {
    const observe = new IntersectionObserver(handleIntersect, defaultOption)
    targetRef.current && observe.observe(targetRef.current)
  }, [handleIntersect, targetRef.current])
  return [targetRef, count]
}

export default useInfiniteScroll
