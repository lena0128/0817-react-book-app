import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux'; 
import './App.css';
import SearchBox from './components/SearchBox/SearchBox';

function App() {

  return (
    <Provider store={store}>
        <div className="App">
          <SearchBox />
        </div>
    </Provider>
  );
}

export default App;
