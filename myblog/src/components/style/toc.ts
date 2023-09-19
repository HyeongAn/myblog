'use client'
import style from 'styled-components'

export const TOCAside = style.aside`
  position: fixed;
  width: 240px;
  display: flex;
  padding-left: 10px;
  flex-direction: column;
  margin-left: 80px;
  border-left: 2px solid #F1F3F5;

  & a {
    margin-top: 8px;
    text-decoration: none;
    color: #212529;
    font-weight: 400;
    font-size: 14px;
    opacity: 0.5;
    transition: opacity 0.3s ease;
    line-height: 1.5;

    &:hover {
      opacity: 1;
    }

    &[data-active='true'] {
      color: #212529;
      opacity: 0.8;
      font-size: 16px;
      font-weight: 400;
    }
  }
  @media (max-width: 1200px) {
    display: none;
  }
`
