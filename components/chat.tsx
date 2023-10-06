'use client'

import { useChat, type Message } from 'ai/react'




import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      body: {
        id,
        previewToken
      },
      onResponse(response) {
        if (response.status == 401) {
          toast(response.statusText);
        }
      }
    })
  const [getService, setGetService] = useState(false)
  const [phoneNum, setPhoneNum] = useState('')
  const [email, setEmail] = useState('')
  // const [messagesNew, setMessagesNew] = useState<Message[]>([
  //   {
  //     id: '324234',
  //     role: 'assistant',
  //     content: 'Хотите получить услугу сейчас?',
  //     name: 'get_service',
  //   }
  // ])
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {/* <p className='text-center'>{messages.length}</p>
        <p className='text-center'>{isLoading.valueOf().toString()}</p> */}
        {messages.length || isLoading ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
            {(messages.length > 0 && !isLoading && !getService) && (
              <div className='flex flex-row space-x-2 items-center mx-auto max-w-2xl px-4'>
                <p>
                  Хотите получить услугу сейчас?
                </p>
                <Button
                  onClick={() => {
                    // setInput('да')
                    setGetService(true)
                  }}
                >
                  Получить услугу
                </Button>
              </div>
            )}

            {getService && (
              <div className='flex flex-col space-y-4 w-auto text-left mx-auto max-w-2xl px-4 rounded-lg border bg-background p-8'>
                <p className='px-0'>
                  Пожалуйста, введите свой номер телефона
                </p>
                <Input
                  type='tel'
                  value={input}
                  placeholder="Номер телефона"
                  onChange={e => setPhoneNum(e.target.value)}
                />
                <p className='px-0'>
                  Пожалуйста, введите свой e-mail
                </p>
                <Input
                  type='email'
                  value={input}
                  placeholder="E-mail"
                  onChange={e => setEmail(e.target.value)}
                />
                <Button
                  variant='default'
                  size='lg'
                  onClick={() => {
                    // setInput('да')
                    // setGetService(false)
                  }}
                >
                  Подписать
                </Button>
              </div>
            )}
            
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>;
        </DialogContent>
      </Dialog>
    </>
  )
}
