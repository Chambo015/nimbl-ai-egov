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
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator, RadioGroupLabel } from './ui/radio'
import StarterScreen from './starter-screen'
import { useData } from './context/DataContext'

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
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [showGetService, setShowGetService] = useState(false)
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
  const [link, setLink] = useState('')
  const [serviceType, setServiceType] = useState('')
  useEffect(() => {
    if (!isLoading && messages?.length > 0) {
      console.log("Finished!!!");
      setLink('');
      setShowGetService(false);
      const lastAssistantMessage = messages
        .filter((msg) => msg.role === 'assistant')
        .slice(-1)[0];

      setLinkHandler(lastAssistantMessage.content);

      // Text-to-speech part
      // const utterance = new SpeechSynthesisUtterance(lastAssistantMessage.content);
      // utterance.lang = 'ru-RU'; // Set the language code for Russian

      // speechSynthesis.speak(utterance);
    }
  }, [isLoading, messages]);

  const setLinkHandler = (text: string) => {
    const urlRegex = /\((https?:\/\/[^\s]+)\)/;
    const match = text.match(urlRegex);
    if (match && match[1] && match[1].includes('2Fpassport')) {
      setShowGetService(true);
      setLink(match[1]);
      setServiceType('narko');
    } else if (match && match[1] && match[1].includes('pass076_mu')) {
      setShowGetService(true);
      setLink(match[1]);
      setServiceType('forma-2');
    } else {
      setShowGetService(false);
      setLink('');
    }
  }

  const narkoOptions = [
    'На себя',
    'На ребёнка',
    'Законный представитель'
  ]
  const [narkoService, setNarkoService] = useState<string | null>(null)

  const { data } = useData();

  const [pageQueryURL, setPageQueryURL] = useState<string | null>(null)

  const [smsCode, setSmsCode] = useState<string>('');

  const [resultLast, setResultLast] = useState<any>(null);
  const [resultServiceNarko, setResultServiceNarko] = useState<any>(null);

  const [loadingService1, setLoadingService1] = useState<boolean>(false);
  const [loadingService2, setLoadingService2] = useState<boolean>(false);
  return (
    isChatStarted === false 
    ?
    <StarterScreen startChat={(input?: string) => { 
      setIsChatStarted(true);
      if(input) {
        setInput(input);
      }
    }} />
    :
    <>
      {}
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {/* {data && <p className='text-center'>{JSON.stringify(data)}</p>} */}
        {/* <p className='text-center'>{isLoading.valueOf().toString()}</p> */}
        {messages.length || isLoading ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
            {(messages.length > 0 && showGetService && !isLoading && !pageQueryURL && !getService) && (
              <div className='flex flex-col space-y-2 items-center mx-auto max-w-2xl px-4 bg-green'>
                <p>
                  Хотите получить услугу сейчас?
                </p>
                <Button
                  variant='default'
                  size='sm'
                  onClick={() => {
                    // setInput('да')
                    setGetService(true)
                  }}
                >
                  Получить услугу
                </Button>
              </div>
            )}

            {getService && serviceType != '' && !pageQueryURL && (
              serviceType === 'narko' ? (
                <div className='flex flex-col space-y-4 w-auto text-left mx-4 md:mx-auto max-w-2xl px-6 rounded-lg border bg-background p-8'>
                <p className='px-0 font-semibold'> 
                  ПРЕДОСТАВЛЕНИЕ СВЕДЕНИЙ С ЦЕНТРА ПСИХИЧЕСКОГО ЗДОРОВЬЯ «НАРКОЛОГИЯ»
                </p>
                <p className='px-0'>
                  Получить услугу:
                </p>
                <RadioGroupRoot 
                  className="RadioGroupRoot" 
                  defaultValue={narkoOptions[0]} 
                  onValueChange={(value) => setNarkoService(value)} 
                  aria-label="View density">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RadioGroupItem value={narkoOptions[0]} id="r1">
                      <RadioGroupIndicator />
                    </RadioGroupItem>
                    <RadioGroupLabel htmlFor="r1">
                      На себя
                    </RadioGroupLabel>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RadioGroupItem value={narkoOptions[1]} id="r2">
                      <RadioGroupIndicator />
                    </RadioGroupItem>
                    <RadioGroupLabel htmlFor="r2">
                    На ребёнка
                    </RadioGroupLabel>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RadioGroupItem value={narkoOptions[2]} id="r3">
                      <RadioGroupIndicator />
                    </RadioGroupItem>
                    <RadioGroupLabel htmlFor="r3">
                    Законный представитель
                    </RadioGroupLabel>
                  </div>
                  {/* ... other radio items ... */}
                </RadioGroupRoot>
                {/* <Input
                  type='tel'
                  value={input}
                  placeholder="Номер телефона"
                  onChange={e => setPhoneNum(e.target.value)}
                /> */}
                {/* <p className='px-0'>
                  Пожалуйста, введите свой e-mail
                </p>
                <Input
                  type='email'
                  value={input}
                  placeholder="E-mail"
                  onChange={e => setEmail(e.target.value)}
                /> */}
                <Button
                  
                  variant='default'
                  size='lg'
                  className='mt-2'
                  onClick={async () => {
                    // setInput('да')
                    setLoadingService1(true)
                    const response = await fetch('/api/egov-get-service-first', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        
                        cookies : data
                      })
                    });
                    const result = await response.json();
                    
                    console.log('result', result);
                    // setResult(result);
                    setPageQueryURL(result.page_query_url);
                    setLink('');
                    setGetService(false)
                    setShowGetService(false)
                    setLoadingService1(false)

                  }}
                >
                  {loadingService1 ? (
                    <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  ) : 'Подписать'}
                </Button>
              </div>
              ) : (
                <></>
              ) 
            )}

            {pageQueryURL && !resultLast && (
                <div className='flex flex-col space-y-4 w-auto text-left mx-4 md:mx-auto max-w-2xl px-6 rounded-lg border bg-background p-8'>
                <p className='px-0 font-semibold'> 
                  ПОДПИСАНИЕ УСЛУГИ
                </p>
                <p className='px-0'>
                  Код из смс для подписания услуги:
                </p>
                <Input
                  value={smsCode}
                  placeholder="Код смс"
                  onChange={e => setSmsCode(e.target.value)}
                />
                {smsCode != '' && (
                  <Button
                  variant='default'
                  size='lg'
                  className='mt-2'
                  onClick={async () => {
                    // setInput('да')
                    setLoadingService2(true)
                    const response = await fetch('/api/egov-get-service-second', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        pageQueryURL : pageQueryURL,
                        cookies : data,
                        smsCode : smsCode
                      })
                    });
                    const result1 = await response.json();
                    console.log('result', result1);
                    if (JSON.parse(result1.result.join('')).status === "IN_PROCESSING") {
                      let result_status = 'IN_PROCESSING';
                      while (result_status == 'IN_PROCESSING') {
                        await new Promise(r => setTimeout(r, 1000));
                        const response2 = await fetch('/api/egov-get-service-status', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            cookies : data,
                            result_url : result1.result_url
                          })
                        });
                        const result2 = await response2.json();
                        if (result2.status && result2.status == "IN_PROCESSING") {
                          result_status = 'IN_PROCESSING';
                        } else {
                          result_status = 'DONE';
                          setResultServiceNarko(result2)
                          console.log('result_status', result2);
                        }
                      }
                    } else {
                      setResultServiceNarko(result1)
                    }
                    setResultLast(result1);
                    setLoadingService2(false)
                    // setResult(result);
                    // setPageQueryURL(result.page_query_url);

                  }}
                >
                  {loadingService2 ? (
                    <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  ) : 'Подтвердить'}
                </Button>
                )}
                
                </div>
            )}

            {resultServiceNarko && (
              <div className='flex flex-col space-y-4 w-auto text-left mx-4 md:mx-auto max-w-2xl px-6 rounded-lg border bg-background p-8'>
              <p className='px-0 font-semibold'> 
                Запрос обработан положительно
              </p>
              <div className='flex flex-col space-y-2 px-2'>
                <p>{JSON.stringify(resultServiceNarko)}</p>
                {resultServiceNarko && resultServiceNarko.resultsForDownload && resultServiceNarko.resultsForDownload.map((item: any, index: number) => (
                  // <li key={index}>
                    <a className='underline' key={index} href={item.url} target='_blank' rel='noreferrer'>
                      {item.name}
                    </a>
                  // </li>
                ))}
              </div>

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
