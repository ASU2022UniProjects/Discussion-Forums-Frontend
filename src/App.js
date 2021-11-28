import './App.css';
import CourseCardContainer from './components/courseCard/CourseCardContainer';
import PageHOC from './components/pageHOC/PageHOC';
import styles from './components/Common.module.css';

function App() {
  return (
    <PageHOC>
      <div className={styles.title}>Courses</div>
      <CourseCardContainer />
    </PageHOC>
  );
}

export default App;
