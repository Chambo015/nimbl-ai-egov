'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

import { TooltipProvider } from '@/components/ui/tooltip'
import { DataProvider } from './context/DataContext';

export function Providers({ children, ...props }: ThemeProviderProps) {
  // const { setData } = useData();

  return (
    
    <NextThemesProvider {...props}>
      
      <TooltipProvider>
      <DataProvider>
        {children}
      </DataProvider>
      </TooltipProvider>
    </NextThemesProvider>
  )
}
