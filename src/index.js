import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CoursePage from './components/CoursePage';
import { QueryClient, QueryClientProvider } from 'react-query';
import routes from './constants/routes';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ViewDiscussionPage from './components/ViewDiscussionPage';
import AxiosProvider from './query/AxiosProvider';

export const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#4e62af',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AxiosProvider>
            <Routes>
              <Route path={routes.Home} element={<App />} />
              <Route
                path={`${routes.Courses}:courseId`}
                element={<CoursePage />}
              />
              <Route
                path={`${routes.Discussion}:discussionId`}
                element={<ViewDiscussionPage />}
              />
            </Routes>
          </AxiosProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
