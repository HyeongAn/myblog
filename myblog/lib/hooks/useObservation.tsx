import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef } from 'react'

const defaultOption = {
  threshold: 0.5,
  rootMargin: '-70px 0px -60% 0px',
}
export type ObservationType = Record<string, IntersectionObserverEntry>

const useObservation = (setState: Dispatch<SetStateAction<string>>, headingElements: HTMLElement[]) => {
  const headingElementsRef: MutableRefObject<ObservationType> = useRef({})

  const handleIntersect: IntersectionObserverCallback = useCallback((entry: IntersectionObserverEntry[]) => {
    headingElementsRef.current = {}

    headingElementsRef.current = entry.reduce((map: ObservationType, headingElement) => {
      map[headingElement.target.id] = headingElement
      return map
    }, headingElementsRef.current)

    const visibleHeadings: IntersectionObserverEntry[] = []
    Object.keys(headingElementsRef.current).forEach((key) => {
      const headingElement = headingElementsRef.current[key]

      // isIntersecting이 true라면 visibleHeadings에 push한다.
      if (headingElement.isIntersecting) visibleHeadings.push(headingElement)
    })

    const getIndexFromId = (id: string) => headingElements.findIndex((heading) => heading.id === id)

    if (visibleHeadings.length === 1) {
      // 화면에 보이고 있는 제목이 1개라면 해당 element의 target.id를 setActiveId로 set해준다.
      setState(visibleHeadings[0].target.id)
    } else if (visibleHeadings.length > 1) {
      // 2개 이상이라면 sort로 더 상단에 있는 제목을 set해준다.
      const sortedVisibleHeadings = visibleHeadings.sort(
        (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
      )
      setState(sortedVisibleHeadings[0].target.id)
    }
  }, [])

  useEffect(() => {
    const observe = new IntersectionObserver(handleIntersect, defaultOption)
    headingElements.map((header) => {
      observe.observe(header)
    })

    return () => observe.disconnect()
  }, [headingElements])
}

export default useObservation
