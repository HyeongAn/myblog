'use client'
import React, { useEffect, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { BlockquoteDanger, BlockquoteDefault, BlockquoteInfo, BlockquoteWarn } from '../style/markdown'
import bulb from '../../../assets/svg/bulb-icon.svg'
import lightning from '../../../assets/svg/lightning-icon.svg'
import danger from '../../../assets/svg/danger-icon.svg'
import paper from '../../../assets/svg/paper-icon.svg'
import Image from 'next/image'

interface BlockquoteProps extends PropsWithChildren {
  type?: 'warn' | 'info' | 'danger'
}

const blockquoteStyles = {
  display: 'flex',
  padding: '16px 18px',
  borderRadius: '10px',
  marginTop: '20px',
  gap: '20px',
}

const Blockquote = (props: BlockquoteProps) => {
  // const [mounted, setMounted] = useState<boolean>(false)

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  switch (props.type) {
    case 'warn':
      return (
        // mounted && (
        <BlockquoteWarn style={blockquoteStyles}>
          <div>
            {/* 일반적인 svg태그 자체로 넣으면 안됨 */}
            <Image src={lightning} alt="lightning image" style={{ width: '18px' }} />
          </div>
          <div>
            <span>{props.children}</span>
          </div>
        </BlockquoteWarn>
      )
    //)
    case 'info':
      return (
        // mounted && (
        <BlockquoteInfo style={blockquoteStyles}>
          <div>
            {/* 일반적인 svg태그 자체로 넣으면 안됨 */}
            <Image src={bulb} alt="bulb image" style={{ width: '18px' }} />
          </div>
          <div>
            <span>{props.children}</span>
          </div>
        </BlockquoteInfo>
      )
    //)
    case 'danger':
      return (
        // mounted && (
        <BlockquoteDanger style={blockquoteStyles}>
          <div>
            {/* 일반적인 svg태그 자체로 넣으면 안됨 */}
            <Image src={danger} alt="danger image" style={{ width: '18px' }} />
          </div>
          <div>
            <span>{props.children}</span>
          </div>
        </BlockquoteDanger>
      )
    // )
    default:
      return (
        // mounted && (
        <BlockquoteDefault style={blockquoteStyles}>
          <div>
            {/* 일반적인 svg태그 자체로 넣으면 안됨 */}
            <Image src={paper} alt="paper image" style={{ width: '18px' }} />
          </div>
          <div>
            <span>{props.children}</span>
          </div>
        </BlockquoteDefault>
      )
    // )
  }
}

export default Blockquote
