import { StarIcon } from '../../assets';
import { styled } from 'styled-components';
import { LessonImg } from "../../assets";
import Lesson from './Lesson';
import RoundButton from '../common/RoundButton';
interface LessonData {
    lessonImg: JSX.Element;
    lessonComment: string;
    lessonExplain: string;
    lessonTeacher: string;
    lessonScore: string;
    lessonDistance: string;
}

export default function PopularLessonList() {

    // data 받아오기
    const popularList: LessonData[] = [
        {
            lessonImg: <LessonImg/>,
            lessonComment: "솜사탕 같이 만들어볼까요?",
            lessonExplain: "아이들에게 꿈같은 시간을 선물합니다.",
            lessonTeacher: "살구 선생님", 
            lessonScore: "4.2",
            lessonDistance: "~234m",
        },
        {
            lessonImg: <LessonImg/>,
            lessonComment: "솜사탕 같이 만들어볼까요?",
            lessonExplain: "아이들에게 꿈같은 시간을 선물합니다.",
            lessonTeacher: "살구 선생님", 
            lessonScore: "4.2",
            lessonDistance: "~234m",
        },
        {
            lessonImg: <LessonImg/>,
            lessonComment: "솜사탕 같이 만들어볼까요?",
            lessonExplain: "아이들에게 꿈같은 시간을 선물합니다.",
            lessonTeacher: "살구 선생님", 
            lessonScore: "4.2",
            lessonDistance: "~234m",
        }
    ]
    
    
    return (
        <St.PopularLessonListWrapper>
            <St.Header> 지금 인기가 많아지고 있어요! </St.Header>
            {popularList.map((lesson, idx) => (
            <Lesson key={idx} {...lesson} />
            ))}
            <RoundButton buttonMessage = {"급 인기 상승중인 모아 더 보러가기"}/>
        </St.PopularLessonListWrapper>
    );
}

const St = {
    PopularLessonListWrapper: styled.section`
      display: flex;
      flex-direction: column;
      width: 37.5rem;
      margin-top: 3rem;
    `,
    
    Header: styled.header`
      ${({ theme }) => theme.fonts.body03};
      color: black;
      margin-left: 1.6rem;
      margin-bottom: 2rem;
    `,
  };