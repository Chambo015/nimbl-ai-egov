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
    const [tempData, setTempData] = React.useState<any>(null);
    const [previewToken, setPreviewToken] = React.useState<boolean>(false);

    const [cookiesAll, setCookiesAll] = React.useState<any>(null);

    const [userName, setUserName] = React.useState<string>('');
    // d9jGShNE
    const [password, setPassword] = React.useState<string>('');
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
        <Button style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          padding: '4px 12px',
          marginTop: 8,
        }} onClick={() => setPreviewToken(true)}>
            <span style={{
              color: 'black'
            }}>Авторизация</span>
        </Button>
        <Dialog open={previewToken} onOpenChange={() => {setPreviewToken(false)}}>
        <DialogContent>
        {/* <form onSubmit={handleSubmit}> */}
          <DialogHeader>
            <DialogTitle>Авторизация Egov</DialogTitle>
            {!tempData && !result && (<DialogDescription>
                Введите логин и пароль от личного кабинета egov.kz
                
            </DialogDescription>)}
            {result && (
              <DialogDescription>
                Вы успешно авторизовались в egov.kz как {result.firstname} {result.lastname}
              </DialogDescription>
            
            )}
          </DialogHeader>
          
          {!tempData && (
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
          {tempData && !result && (
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
                if (userName != '' && password != '' && !tempData) {
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
                    setTempData(data)
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
                          cookiesAll : tempData
                        })
                      });
                    const result = await response.json();
                    const info = JSON.parse(result.info);
                    localStorage.setItem('firstname', info?.profile?.firstname ?? '');
                    localStorage.setItem('lastname', info?.profile?.lastname ?? '');
                    // parse json string
                    console.log('result', result);
                    console.log('result', result.info.profile);
                    setResult(result);
                    console.log(data);
                    setData(tempData);
                    localStorage.setItem('cookiesAll', JSON.stringify(data));
                    setCookiesAll(tempData);
                    // setTempData(null);
                }
              }}
            >
                {!tempData ? 'Получить код' : 'Подтвердить'}
            </Button>)}
            {/* {result && (
              <Button 
                onClick={async () => {
                  const response = await fetch('/api/egov-service-test1', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      cookiesAll: cookiesAll
                    })
                  });
                const result = await response.json();
                console.log('result', result);
                }}
              >
                Test service
              </Button>
            )} */}
          </DialogFooter>
          {/* </form> */}
        </DialogContent>
      </Dialog>
    </>
    )
}
