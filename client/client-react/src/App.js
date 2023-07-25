import './App.css';
import { RoutesMain } from './components/Routes/routes';
import { Wrapper } from './components/Wrapper/wrapper';
import { useState } from 'react';
import { AuthContext, AuthProvider } from './AuthContext';

const App = () => {



  return (
    <AuthProvider>

      <Wrapper>
      <header className="App-header">
       <RoutesMain />
      </header>
      </Wrapper>

    </AuthProvider>
  );
}

export default App;
