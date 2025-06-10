'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import theme from '../theme';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
} 