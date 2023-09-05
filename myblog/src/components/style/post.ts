'use client'

import style from 'styled-components'

export const PostListContainer = style.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  padding: 0;
  min-width: 390px;

  & li {
    width: 90%;
    height: 370px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(102 102 102 / 20%);

    @media (max-width: 640px) {
      margin-bottom: 20px;
    }
    
  }
`

export const PostContentContainer = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`

export const PostFlexContainer = style.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 640px) {
    padding: 0;
    flex-direction: column;
  }
`

export const PostContents = style.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0 5px 20px;

  & h1 {
    margin-bottom: 0;
  }

  & span {
    overflow: hidden;

    @media (max-width:640px) {
      height: 100px;
    }
  }
`

export const PostContainer = style.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TitleContainer = style.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  border-bottom: 1px solid rgb(102 102 102 / 20%);
`

export const ContentsContainer = style.div`
  width: 100%;
  padding: 20px 0;

  & h1 {
    margin: 20px 0;
  }
`
