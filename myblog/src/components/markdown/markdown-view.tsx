'use client'
import ReactMarkdown from 'react-markdown'
import slug from 'rehype-slug'
import raw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Blockquote from './blockquote'
import { PluggableList } from 'unified'
// ?  다크모드 import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
// ? 라이트 모드 import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
// ? 노션 라이트 모드 import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'
// ? 노션 다크 모드 import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownViewProps {
  post: string
}

const MarkdownView = ({ post }: MarkdownViewProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[raw, slug] as PluggableList}
      components={{
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter language={match[1]} PreTag="div" {...props} style={oneDark}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
        blockquote({ node, children, ...props }) {
          return <Blockquote {...props}>{children}</Blockquote>
        },
      }}
    >
      {post}
    </ReactMarkdown>
  )
}

export default MarkdownView
