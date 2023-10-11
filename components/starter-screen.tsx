'use client'
// import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DialogEgov } from "./dialog";
import { useData } from "./context/DataContext";

import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  display: 'swap',
  subsets: ['cyrillic-ext', 'cyrillic'],
  weight: ['400', '700'],
})

const StarterScreen = ({ startChat }: { startChat: (input?: string) => void }) => {
  const account = {
    name: 'Диас Нурбергенов',
  }
  const { push } = useRouter();
  const { fullname, data } = useData();

  return (
    <>
      <div className={openSans.className} style={{
        flexDirection: 'column',
      }}>
        {data && <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <p>Добро пожаловать</p>
            <h6>{fullname}</h6>
          </div>
          {/* <img src="/images/avatar.png" style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }} /> */}
        </div>}
        <div style={{
          width: '100%',
          aspectRatio: 4/3,
          padding: 16,
          gap: 16,
          display: 'flex',
          flexDirection: 'row',
        }}>
          <div style={{
            position: 'relative',
            backgroundColor: 'rgba(56, 75, 144, 0.27)',
            borderRadius: '20px',
            display: 'flex',
            flex: 1,
            padding: 12,
            flexDirection: 'column',
            // gap: 4,
          }}>
            <img src="/mask-group.png" style={{ 
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
            }}/>
            <span style={{
              fontSize: '18px',
              fontWeight: 700,
              color: 'white',
            }}>
              EGOVAI CHATBOT
            </span>
            <span style={{
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '14px',
              color: 'rgba(255, 255, 255, 1)',
            }}>
              чатбот, который может ответить на вопросы по услугам eGov
            </span>
            {!(data) &&
              <DialogEgov />}
            {/* <span style={{
              fontSize: '16px',
              background: "linear-gradient(270deg, #60E2FF 0%, #8C98FF 50%, #FF94EE 100%)",
              fontWeight: 700,
              lineHeight: '22px',
              wid
            }}>EGOVAI CHATBOT</span> */}
          </div>
          <div style={{
            gap: 16,
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}>
            <button onClick={() => {
              startChat();
            }} style={{
              backgroundColor: 'rgba(56, 75, 144, 0.27)',
              borderRadius: '20px',
              display: 'flex',
              padding: 16,
              gap: 8,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
              <div style={{
                backgroundColor: 'rgba(56, 75, 144, 0.37)',
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <img src="/comment-dots-solid.png" style={{
                  width: 15,
                  height: 15,
                }} />
              </div>
              <h6 className={openSans.className}>
                Начать новый чат
              </h6>
            </button>
            <button style={{
              backgroundColor: 'rgba(56, 75, 144, 0.27)',
              borderRadius: '20px',
              display: 'flex',
              padding: 16,
              gap: 8,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
              <div style={{
                backgroundColor: 'rgba(56, 75, 144, 0.37)',
                borderRadius: '50%',
                width: 30,
                height: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <img src="/question.png" style={{
                  width: 10,
                  height: 15,
                }} />
              </div>
              <h6 className={openSans.className}>
                Недавние вопросы
              </h6>
            </button>
          </div>
        </div>
        <div style={{
          width: '100%',
          padding: 16,
        }}>
          <span className={openSans.className} style={{
            fontSize: '16px',
            fontWeight: 700,
            lineHeight: '21.68px',
          }}>Вы можете начать диалог или попробовать следующие примеры:</span>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: '16px',
        }}>
          <button onClick={() => {
            startChat('Я потерял удостоверение личности, что мне делать?')
          }} style={{
            backgroundColor: 'rgba(56, 75, 144, 0.27)',
            borderRadius: '20px',
            display: 'flex',
            padding: 16,
            flexDirection: 'row',
            gap: 8,
            width: '100% - 32px',
            height: '67px',
            alignItems: 'center',
          }}>
            <div style={{
              backgroundColor: 'rgba(56, 75, 144, 0.37)',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img src="/address-card-solid.png" style={{
                width: 16,
                height: 14,
              }} />
            </div>
            <div style={{
              flex: 1,
            }}>
              <span className={openSans.className} style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '13.97px',
              }}>Потерял удостоверение личности?</span>
            </div>
          </button>
          <button onClick={() => {
            startChat('Я хочу учиться за рубежом какие есть программы?')
          }} style={{
            backgroundColor: 'rgba(56, 75, 144, 0.27)',
            borderRadius: '20px',
            display: 'flex',
            padding: 16,
            flexDirection: 'row',
            gap: 8,
            width: '100% - 32px',
            height: '67px',
            alignItems: 'center',
          }}>
            <div style={{
              backgroundColor: 'rgba(56, 75, 144, 0.37)',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img src="/graduation-cap-solid.png" style={{
                width: 16,
                height: 14,
              }} />
            </div>
            <div style={{
              flex: 1,
            }}>
              <span className={openSans.className} style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '13.97px',
              }}>Я хочу учиться за рубежом какие есть программы?</span>
            </div>
          </button>
          <button onClick={() => {
            startChat('Как получить справку о доходах?')
          }} style={{
            backgroundColor: 'rgba(56, 75, 144, 0.27)',
            borderRadius: '20px',
            display: 'flex',
            padding: 16,
            flexDirection: 'row',
            gap: 8,
            width: '100% - 32px',
            height: '67px',
            alignItems: 'center',
          }}>
            <div style={{
              backgroundColor: 'rgba(56, 75, 144, 0.37)',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img src="/money-bill-wave-solid.png" style={{
                width: 16,
                height: 14,
              }} />
            </div>
            <div style={{
              flex: 1,
            }}>
              <span className={openSans.className} style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '13.97px',
              }}>Как получить справку о доходах?</span>
            </div>
          </button>
          <button onClick={() => {
            startChat('Как распознать что ребенок подвергается кибербуллингу?')
          }} style={{
            backgroundColor: 'rgba(56, 75, 144, 0.27)',
            borderRadius: '20px',
            display: 'flex',
            padding: 16,
            flexDirection: 'row',
            gap: 8,
            width: '100% - 32px',
            height: '67px',
            alignItems: 'center',
          }}>
            <div style={{
              backgroundColor: 'rgba(56, 75, 144, 0.37)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img src="/person-harassing-solid.png" style={{
                width: 16,
                height: 14,
              }} />
            </div>
            <div style={{
              flex: 1,
            }}>
              <span className={openSans.className} style={{
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '13.97px',
              }}>Как распознать что ребенок подвергается кибербуллингу?</span>
            </div>
          </button>
          
        </div>
      </div>
    </>
  )
}

export default StarterScreen;