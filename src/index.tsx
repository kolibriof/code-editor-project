import ReactDOM from 'react-dom';
import MainPage from './components/MainPage';

const App = () => {
  return (
    <div>
      <MainPage />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
