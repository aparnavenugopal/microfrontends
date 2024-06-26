import React,{ lazy, Suspense, useState } from 'react';
import { BrowserRouter,Route, Switch  } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import MarketingApp from './components/MarketingApp';
import Header from './components/Header';
// import AuthApp from './components/AuthApp';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route path="/" component={MarketingApp} exact={true} />
              <Route path="/pricing" component={MarketingLazy}  />
              <Route path="/auth">
                <AuthLazy onSignIn={() => setIsSignedIn(true)}/>
              </Route>
            </Switch>
          </Suspense>
          
          {/* <MarketingApp/> */}
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
};