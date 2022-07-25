import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux'; 
import './App.css';
import Home from './pages/Home/Home';

function App() {

  return (
    <Provider store={store}>
        <div className="App">
          <Home />
        </div>
    </Provider>
  );
}

export default App;
