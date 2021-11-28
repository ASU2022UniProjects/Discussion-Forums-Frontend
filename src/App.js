import logo from './logo.svg';
import './App.css';
import CourseCard from './components/courseCard/CourseCard';
import CourseCardContainer from './components/courseCard/CourseCardContainer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <CourseCardContainer />
        <CourseCard courseName="test" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React : D
        </a>
      </header>
    </div>
  );
}

export default App;
