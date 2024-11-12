import ReactDOM from 'react-dom/client';
import './App.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
)
