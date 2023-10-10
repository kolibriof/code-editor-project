import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDOM from 'react-dom';
import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';
import { Provider } from 'react-redux';
import { store } from './store';
import React from 'react';
import CellList from './components/CellList';
import '@fortawesome/fontawesome-free/css/all.min.css'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        {/* <TextEditor /> */}
        {/* <CodeCell /> */}
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
