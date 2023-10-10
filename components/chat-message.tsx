import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconNimbl, IconOpenAI, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'
import { useMemo } from 'react'

export interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  const time = useMemo(() => {
    if(!message.createdAt) return null;
    const date = new Date(message.createdAt)
    const hours = date.getHours()
    const hoursString = hours < 10 ? `0${hours}` : hours
    const minutes = date.getMinutes()
    const minutesString = minutes < 10 ? `0${minutes}` : minutes
    return `${hoursString}:${minutesString}`
  }, [message])

  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        ...(message.role === 'user' ? {
          alignItems: 'flex-end'
        } : {
          alignItems: 'flex-start'
        }),
      }}
    >
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1" style={{
          ...(message.role === 'user' ? {
            backgroundColor: 'rgba(55, 55, 55, 0.22)',
            justifyContent: 'flex-end'
          } : {
            backgroundColor: 'rgba(56, 75, 144, 0.27)',
            justifyContent: 'flex-start'
          }),
          // maxWidth: '80%',
          borderRadius: '16px',
          display: 'flex',
          padding: '16px',
          paddingLeft: '16px',
          paddingRight: '16px'
        }}>
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
        {/*<ChatMessageActions message={message} />*/}
      </div>
      {/* <div style={{
        display: 'flex',
        ...(message.role === 'user' ? {
          justifyContent: 'flex-end'
        } : {
          justifyContent: 'flex-start'
        }),
        width: '100%',
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 400,
          textAlign: message.role === 'user' ? 'right' : 'left',
        }}>{time}</span>
      </div> */}
    </div>
  )
}
