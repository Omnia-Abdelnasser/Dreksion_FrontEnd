import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import Providers from './app/providers';
import './index.css';
import './transition.css';



const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <Providers>
         <BrowserRouter>
            <QueryClientProvider client={queryClient}>
               <App />
            </QueryClientProvider>
         </BrowserRouter>
      </Providers>
   </StrictMode>
);
