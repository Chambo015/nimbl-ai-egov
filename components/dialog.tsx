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
  

export function DialogEgov() {
    const [previewToken, setPreviewToken] = React.useState<boolean>(false);

    const [userName, setUserName] = React.useState<string>('980403350842');
    const [password, setPassword] = React.useState<string>('d9jGShNE');
    const [result, setResult] = React.useState<any>(null);
    const [smsCode, setSmsCode] = React.useState<string>('');
    return (
    <>
        <Button variant="link" className="-ml-2" onClick={() => setPreviewToken(true)}>
            Авторизация egov
        </Button>
        <Dialog open={previewToken} onOpenChange={() => {setPreviewToken(false)}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Авторизация Egov</DialogTitle>
            <DialogDescription>
                Введите логин и пароль от личного кабинета egov.kz
                {result && result}
            </DialogDescription>
          </DialogHeader>
          <Input
            value={userName}
            placeholder="Логин"
            onChange={e => setUserName(e.target.value)}
          />
          <Input
            value={password}
            placeholder="Пароль"
            onChange={e => setPassword(e.target.value)}
          />
          {result && (
            <>
            <DialogDescription>
                Введите код из смс
            </DialogDescription>
            <Input
                value={smsCode}
                placeholder="Код из смс"
                onChange={e => setSmsCode(e.target.value)}
              />
            </>
          )
          }
          <DialogFooter className="items-center">
            <Button
              onClick={async () => {
                if (userName != '' && password != '' && !result) {
                    const response = await fetch('/api/egov-auth-intial', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          username : userName,
                          password : password
                        })
                      });
                    const result = await response.text();
                    console.log('result', result);
                    setResult(result);
                } else {
                    const response = await fetch('/api/egov-auth-final', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          username : userName,
                          password : password,
                          smsCode : smsCode
                        })
                      });
                    const result = await response.text();
                    console.log('result', result);
                    // setResult(result);
                }
              }}
            >
                {!result ? 'Получить код' : 'Подтвердить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
    )
}
