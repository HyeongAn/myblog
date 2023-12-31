'use client'

import style from 'styled-components'

export const CategorySkeletonContainer = style.div`
  background-color: var(--skele--box);
  border-radius: 10px;
  width: 500px;
  height: 20px;
`

export const CategorySkeletonCard = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
`

export const CategorySkeletonCardImage = style.div`
  width: 100%;
  height: 340px;
  border-radius: 10px;
  background-color: var(--skele--box);
`

export const CategorySkeletonTitle = style.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: var(--skele--box);
  margin: 80px 0 15px 0;
`

export const CategorySkeletonInfo = style.div`
  width: 100%;
  height: 20px;
  border-radius: 10px;
  background-color: var(--skele--box);
`

export const CategorySkeletonContents = style.div`
  width: 100%;
  height: 70vh;
  border-radius: 10px;
  background-color: var(--skele--box);
`

export const CategorySkeletonCarousel = style.div`
  display: flex;
  width: 100%;
  height: 480px;
  position: relative;
  border-radius: 20px;
  background-color: var(--skele--box);

  @media (max-width: 768px) {
    height: 380px;
  }
`

export const CategorySkeletonMainCarousel = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const CategorySkeletonIndexBody = style.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;

  & ul {
    gap: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    margin:20px 0 0 0;

    & li {
      background-color: var(--skele--box);
      border-radius: 5px;
    }
  }
`
