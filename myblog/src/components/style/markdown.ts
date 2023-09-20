'use client'
import style from 'styled-components'

export const BlockquoteWarn = style.blockquote`
  color: #4D361A;
  background-color: #F7BE6824;
  line-height: 2;

  & p {
    margin: 0;
  }
`

export const BlockquoteInfo = style.blockquote`
  color: #003B59;
  background-color: #009CEB1a;
  line-height: 2;
  
  & p {
    margin: 0;
  }
`

export const BlockquoteDanger = style.blockquote`
  color: #821006;
  background-color: #FF41331A;
  line-height: 2;

  & p {
    margin: 0;
  }
`

export const BlockquoteDefault = style.blockquote`
  color: #212124;
  background-color: #f2f3f6;
  line-height: 2;

  & p {
    margin: 0;
    line-height: 2;
  }
`
