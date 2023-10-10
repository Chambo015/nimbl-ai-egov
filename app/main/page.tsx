'use client'
// import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MainPage = () => {
  const account = {
    name: 'Диас Нурбергенов',
  }
  const { push } = useRouter();

  return (
    <div style={{
      flexDirection: 'column',
    }}>
      <div style={{
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
          <h6>{account.name}</h6>
        </div>
        <img src="/images/avatar.png" style={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }} />
      </div>
      <div style={{
        width: '100%',
        aspectRatio: 4/3,
        padding: 16,
        gap: 16,
        display: 'flex',
        flexDirection: 'row',
      }}>
        <div style={{
          backgroundColor: 'rgba(56, 75, 144, 0.27)',
          borderRadius: '20px',
          display: 'flex',
          flex: 1,
        }}>
          <img>
          </img>
        </div>
        <div style={{
          gap: 16,
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}>
          <button onClick={() => {
            push('/');
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
              width: 25,
              height: 25,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img src="/comment-dots-solid" style={{
                width: 15,
                height: 15,
              }} />
            </div>
            <h6>
              Недавние вопросы
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
              width: 25,
              height: 25,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <img src="/question.png" style={{
                width: 10,
                height: 15,
              }} />
              <h6>
              Начать новый чат
            </h6>
            </div>
          </button>
        </div>
      </div>
      <div style={{
        width: '100%',
        padding: 16,
      }}>
        <span style={{
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
        <button style={{
          backgroundColor: 'rgba(56, 75, 144, 0.27)',
          borderRadius: '20px',
          display: 'flex',
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '67px',
          width: '100%',
          alignItems: 'flex-start',
        }}>

        </button>
        <button style={{
          backgroundColor: 'rgba(56, 75, 144, 0.27)',
          borderRadius: '20px',
          display: 'flex',
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '67px',
          width: '100%',
          alignItems: 'flex-start',
        }}>

        </button>
        <button style={{
          backgroundColor: 'rgba(56, 75, 144, 0.27)',
          borderRadius: '20px',
          display: 'flex',
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '67px',
          width: '100%',
          alignItems: 'flex-start',
        }}>

        </button>
        <button style={{
          backgroundColor: 'rgba(56, 75, 144, 0.27)',
          borderRadius: '20px',
          display: 'flex',
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '67px',
          width: '100%',
          alignItems: 'flex-start',
        }}>

        </button>
      </div>
    </div>
  )
}

export default MainPage;