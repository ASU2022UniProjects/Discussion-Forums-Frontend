import './App.css';
import CourseCardContainer from './components/courseCard/CourseCardContainer';
import PageHOC from './components/pageHOC/PageHOC';
import styles from './components/Common.module.css';
import { useState } from 'react';
import { Button } from '@mui/material';
import CreateCourse from './components/createCourse/CreateCourse';
import { useAxios } from './query/AxiosProvider';

function App() {
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const { accountRole } = useAxios();
  return (
    <PageHOC>
      <div className={styles.flexRow}>
        <div className={styles.title}>Courses</div>
        {accountRole === 'Admin' && !isCreateVisible && (
          <Button variant="contained" onClick={() => setIsCreateVisible(true)}>
            Add Student
          </Button>
        )}
      </div>
      {isCreateVisible && (
        <CreateCourse onHideCreate={() => setIsCreateVisible(false)} />
      )}
      <CourseCardContainer />
    </PageHOC>
  );
}

export default App;
