'use client';

import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'
import { Button } from './ui/button';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from '@/components/ui/dialog'
  import { Input } from './ui/input'
import { useData } from './context/DataContext';
  

export function DialogEgov() {
    const { data, setData } = useData();
    const [previewToken, setPreviewToken] = React.useState<boolean>(false);

    const [cookiesAll, setCookiesAll] = React.useState<any>(null);

    const [userName, setUserName] = React.useState<string>('980403350842');
    // d9jGShNE
    const [password, setPassword] = React.useState<string>('d9jGShNE');
    const [result, setResult] = React.useState<any>(null);
    const [smsCode, setSmsCode] = React.useState<string>('');
    const [phoneNum, setPhoneNum] = React.useState<string>('');
    const url1 = '/api/egov-auth-intial';

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();
  
      const response = await fetch(url1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userName, password: password }),
      });
  
      const data = await response.json();
      console.log(data);
    };
    
    return (
    <>
        <Button variant="link" className="-ml-2" onClick={() => setPreviewToken(true)}>
            Авторизация egov
        </Button>
        <Dialog open={previewToken} onOpenChange={() => {setPreviewToken(false)}}>
        <DialogContent>
        {/* <form onSubmit={handleSubmit}> */}
          <DialogHeader>
            <DialogTitle>Авторизация Egov</DialogTitle>
            {!cookiesAll && !result && (<DialogDescription>
                Введите логин и пароль от личного кабинета egov.kz
                
            </DialogDescription>)}
            {result && (
              <DialogDescription>
                Вы успешно авторизовались в egov.kz как {result.firstname} {result.lastname}
              </DialogDescription>
            
            )}
          </DialogHeader>
          
          {!cookiesAll && (
          <>
          <Input
            value={userName}
            placeholder="Логин"
            onChange={e => setUserName(e.target.value)}
          />
          <Input
            type={'password'}
            value={password}
            placeholder="Пароль"
            onChange={e => setPassword(e.target.value)}
          />
          </>
          )}
          {cookiesAll && !result && (
            <>
            <DialogDescription>
                Введите номер телефона и код из смс
            </DialogDescription>
            <Input
              value={phoneNum}
              placeholder="Номер телефона: +7(777)7777777"
              onChange={e => setPhoneNum(e.target.value)}
            />
            <Input
                value={smsCode}
                placeholder="Код из смс"
                onChange={e => setSmsCode(e.target.value)}
              />
            </>
          )
          }
          <DialogFooter className="items-center">
            {!result && (<Button
              // type='submit'
              onClick={async () => {
                if (userName != '' && password != '' && !cookiesAll) {
                    const response = await fetch(url1, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          iin : userName,
                          password : password
                        })
                      });
                    const data = await response.json();
                    console.log(data);
                    setData(data);
                    localStorage.setItem('cookiesAll', JSON.stringify(data));
                    setCookiesAll(data);
                    // setResult(result);
                } else {
                    const response = await fetch('/api/egov-auth-final', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          iin : userName,
                          password : password,
                          phoneNum : phoneNum,
                          smsCode : smsCode,
                          cookiesAll : cookiesAll
                        })
                      });
                    const result = await response.json();
                    localStorage.setItem('firstname', result.firstname);
                    localStorage.setItem('lastname', result.lastname);
                    console.log('result', result);
                    setResult(result);
                }
              }}
            >
                {!cookiesAll ? 'Получить код' : 'Подтвердить'}
            </Button>)}
            {result && (
              <Button 
                onClick={async () => {
                  const response = await fetch('/api/egov-service-test1', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      cookiesAll : cookiesAll
                    })
                  });
                const result = await response.json();
                console.log('result', result);
                }}
              >
                Test service
              </Button>
            )}
          </DialogFooter>
          {/* </form> */}
        </DialogContent>
      </Dialog>
    </>
    )
}
