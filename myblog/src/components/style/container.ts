'use client'

import style from 'styled-components'

// ? General Containers
export const ColumnCenterContainer = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ColumnLeftContainer = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ColumnContainer = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const RowCenterContainer = style.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const RowLeftContainer = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

export const RowBetweenContainer = style.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

// ? header에 관계된 Containers
export const HeadContainer = style.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 5;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`

// ? HomPage에 있는 Main Slide Containers
export const MainContainer = style.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  max-width: 900px;
`

export const MainHeaderContainer = style.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h2 {
    font-size: 60px;
    font-style: italic;
  }
`

export const MainBodyContainer = style.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 60px;
  max-width: 900px;

  @media (max-width:640px) {
    width: 95%;
    flex-direction: column;
    gap: 20px;
  }
  
`

// ? Footer Container
export const FooterContainer = style.footer`
  display: flex;
  width: 100%;
  min-width: 390px;
  min-height: 100px;
  font-size: 12px;
  justify-content: center;
  align-items: center;
`

export const FlexibleImageContainer = style.div`
  width: 80%;
  height: 80%;
  position: relative;
  min-width: 370px;
  min-height: 200px;

`

// ? MainPage PostList에 관계된 Containers
export const PostsListContainer = style.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 120px 0;
  max-width: 900px;
  position: relative;

  @media (max-width:640px) {
    width: 95%;
    justify-content: center;
  }

`

export const PostGridContainer = style.section`
  display: grid;
  width: 100%;
  height: 100%;
  max-width: 900px;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  row-gap: 20px;

  @media (max-width:640px) {
    grid-template-columns: 100%;
  }
`

export const PostCardContainer = style.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 30px;

  & [role='tooltip'] {
    visibility: hidden;
    width: 100%;
    height: 100%;
    max-height: 340px;
    position: absolute;
    top: 0;
    opacity: 1;
    transition: 0.3s;
    border-radius: 20px;
    background-color: rgba(32, 33, 37, 30%);
  }

  &: hover {
    & [role='tooltip'] {
      visibility: visible;
      opacity: 1;
    }
  }

`

export const PostCardHeader = style.span``

export const PostCardTitle = style.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 1.2;
`

// ? 블로그 Post 컨텐츠에 관계된 container
export const PostContainer = style.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TitleContainer = style.div`
  width: 100%;
  max-width: 900px;
  min-width: 380px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  margin: 0;
`

export const ContentsContainer = style.div`
  width: 100%;
  padding: 20px 0;

  & h1 {
    margin: 20px 0;
  }
`
