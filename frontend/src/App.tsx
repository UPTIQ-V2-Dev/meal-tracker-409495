import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AddFoodPage } from '@/pages/AddFoodPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: (failureCount, error) => {
                if (failureCount < 3) return true;
                return false;
            }
        }
    }
});

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className='min-h-screen bg-background'>
                    <Routes>
                        <Route
                            path='/'
                            element={<AddFoodPage />}
                        />
                        <Route
                            path='/add-food'
                            element={<AddFoodPage />}
                        />
                    </Routes>
                    <Toaster />
                </div>
            </Router>
        </QueryClientProvider>
    );
};
