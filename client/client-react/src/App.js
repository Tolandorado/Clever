import styles from './App.module.scss';
import { RoutesMain } from './components/Routes/routes';
import { Wrapper } from './components/Wrapper/wrapper';
import { AuthProvider } from './AuthContext';


const App = () => {



  return (
    <AuthProvider>

      <Wrapper>
      <header className={styles.app_header}>
       <RoutesMain />
      </header>
      </Wrapper>

    </AuthProvider>
  );
}

export default App;
