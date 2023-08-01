import Category from '../components/home/Category';
import CloseDistanceLessonList from '../components/home/CloseDistanceLessonList';
import Header from '../components/home/Header';
import PopularLessonList from '../components/home/PopularLessonList';
import PopularTeacherList from '../components/home/PopularTeacherList';
import {styled} from 'styled-components';
import BottomBar from '../components/common/BottomBar';

export default function Home() {
  
    return (
      <St.HomeWrapper>
        <Header />
        <Category />
        <PopularLessonList/>
        <PopularTeacherList/>
        <CloseDistanceLessonList/>
        <BottomBar />
      </St.HomeWrapper>
    );
}


const St = {
  HomeWrapper: styled.div`
  `,
}