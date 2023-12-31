import styled from 'styled-components';
import { useState, useEffect } from 'react';
import TopBar2 from '../components/common/TopBar2';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserInfoState } from '../atom/UserInfo';

interface CategoryItem {
  name: string;
  categoryID: number;
}

const Writing = () => {

  const navigate = useNavigate();
  const userId = useRecoilValue(UserInfoState).id;

  const categoryList: CategoryItem[] = [
    { name: '운동', categoryID: 2 },
    { name: '언어', categoryID: 1 },
    { name: '음악', categoryID: 3 },
    { name: '미술', categoryID: 4 },
    { name: '기타', categoryID: 5 },
  ];

  const [ title, setTitle ] = useState<string>('');
  const [ num, setNum ] = useState<number>(0);
  const [ category, setCategory] = useState<number>(0);
  const [ hashtag, setHashtag] = useState<string>('');
  const [ appeal, setAppeal ] = useState<string>('');
  const [ price, setPrice ] = useState<number | undefined>(undefined);

  const [ selectedCategory, setSelectedCategory ] = useState<number | null>(null);

  const [ isComplete, setIsComplete ] = useState<boolean>(false);


  useEffect(() => {
    if (title && category && hashtag && appeal && price !== undefined && price !== 0 && num > 0 && num <= 6) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  }, [title, num, category, hashtag, appeal, price]);


  const handleCategoryClick = (categoryId: number, index: number) => {
    if (selectedCategory === index) {
      setSelectedCategory(null);
      setCategory(0);
    } else {
      setSelectedCategory(index);
      setCategory(categoryId);
    }
  };

  const handleIncreaseButton = () => {
    setNum(num < 6 ? (num) => num + 1 : 6);
  }

  const handleDecreaseButton = () => {
    setNum(num > 0 ? (num) => num - 1 : 0);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  }

  const handleAppeal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAppeal(e.target.value);
  }

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = parseInt(e.target.value); 
    setPrice(isNaN(inputPrice) ? undefined : inputPrice);
  }

  const handleSubmit = async () => {
    const formData = {
      title: title,
      userId: userId,
      categoryId: category,
      description: appeal,
      hashtags: hashtag,
      maxParticipants: num,
      price: price,
    };

    console.log(formData)
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/lecture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
      });
      
      const responseData = await response.json();
      console.log(responseData);
      
      navigate('/home');

    } catch (error) {
      console.error("Error submitting data:", error);
    }

  }
  
  return (
    <St.WritingWrapper>
      <TopBar2 message="재능 공유 글쓰기"/>
      
      <St.WritingContainer>
        <St.WritingBox>
          <St.WritingSection>
            <St.WritingHeader>
              글 제목을 작성해주세요.
            </St.WritingHeader>
            <St.WritingInput placeholder=
            '예시) 자유롭게 영어로 대화할 수 있는 즐거운 영어교실'
              value={title}
              onChange={handleTitleChange} 
            >
            </St.WritingInput>
          </St.WritingSection>

          <St.WritingSection style={{ flexDirection: "row", justifyContent: "space-between", alignItems:"center" }}>
            <St.WritingHeader>
              최대 정원을 정해주세요.
            </St.WritingHeader>
            <St.WritingPersonnelContainer>
              <St.CountButton onClick={handleDecreaseButton}>
                -
              </St.CountButton>
              <St.CountNum>
                {num}
              </St.CountNum>
              <St.CountButton onClick={handleIncreaseButton}>
                +
              </St.CountButton>
            </St.WritingPersonnelContainer>
          </St.WritingSection>

          <St.WritingSection>
            <St.WritingHeader>
            재능 공유 카테고리를 골라주세요.
            </St.WritingHeader>

            <St.WritingCategoryContainer>
              {categoryList.map((item, index) => (
                <St.RadioBoxContainer key={index}>
                  <St.RadioBoxInput />
                  <St.RadioBoxSpan onClick={() => handleCategoryClick(item.categoryID, index)} selected={selectedCategory === index}>
                    {item.name}
                  </St.RadioBoxSpan>
                </St.RadioBoxContainer>
              ))}
        </St.WritingCategoryContainer>
          </St.WritingSection>

          <St.WritingSection>
            <St.WritingHeader>
              재능 해시태그를 간단하게 달아주세요.
            </St.WritingHeader>
            <St.WritingInput placeholder=
            '예시)  #학원영어강사출신  #4~12세  #정원6명'
              value={hashtag}
              onChange={handleHashtag}
            >
            </St.WritingInput>
          </St.WritingSection>

          <St.WritingSection>
            <St.WritingHeader>
              수업 어필을 해주세요. (학습내용/경력 등)
            </St.WritingHeader>
            <St.WrtingTextArea
              placeholder='                    예시)&#10;
  - 미국 하버드 출신의 스피킹과 라이팅, 영어의 모든 영역 지도
  - 미국 교과서 수업(100% 영어로 진행)
  - 누리 학원 9년 강사 출신'
              value={appeal}
              onChange={handleAppeal}
              >
            </St.WrtingTextArea>
          </St.WritingSection>

          <St.WritingSection style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <St.WritingHeader>
              수업 가격을 작성해주세요.
            </St.WritingHeader>
            <St.WritingInput style={{width: "40%",textAlign: "end"}}
            placeholder='10,000원'
            value={price !== undefined ? price.toString() : ''}
            onChange={handlePrice}
            >
            </St.WritingInput>
          </St.WritingSection>
        </St.WritingBox>
        
        <St.WritingCompleteButton disabled={!isComplete} onClick={handleSubmit}>
          작성 완료
        </St.WritingCompleteButton>
      </St.WritingContainer>
    </St.WritingWrapper>
  );
}

export default Writing;

const St = {
  WritingWrapper: styled.div`
    width: 100%;

    display: grid;
    grid-template-rows: auto 1fr;
  `,
  WritingContainer: styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    background-color: #F5F5F5;
  `,
  WritingBox: styled.div`
    padding: 0 1.5rem;
  `,
  WritingSection: styled.div`
    margin: 0rem 0.6rem;
    margin-top: 0.8rem;

    display: flex;
    flex-direction: column;
  `,
  WritingHeader: styled.div`
    margin: 1.5rem 0;
    ${({ theme }) => theme.fonts.body03};
  `,
  WritingPersonnelContainer: styled.div`
    padding: 0.5rem 0.8rem;
    
    display: flex; 
    align-items: center;

    border: 0.01rem solid #E6E6E6;
    border-radius: 2rem;
    
    background-color: white;
  `,

  WritingCategoryContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  `,
  RadioBoxContainer: styled.div`
  `,
  WritingInput: styled.input`
    height: 3rem;
    padding: 2rem 1.5rem;

    border: 0.1rem solid #E6E6E6;
    border-radius: 1rem;

    background-color: white;  

    &::placeholder {
      ${({ theme }) => theme.fonts.body07};
      color: #9D9D9D;
    }
  `,
  WrtingTextArea: styled.textarea`
    height: 11rem;
    padding: 1rem 1rem;
      
    border: 0.1rem solid #E6E6E6;
    border-radius: 1rem;

    resize: none;

    &::placeholder {
      ${({ theme }) => theme.fonts.body07};
      color: #9D9D9D;
    }
  `,
  CountButton: styled.button`
    width: 1.3rem;
    height: 1.3rem;

    border: none;
    border-radius: 50%;

    background-color: #D9D9D9;

    ${({ theme }) => theme.fonts.body06};

    &:active {
      box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
    }
  `,
  CountNum: styled.div`
    margin: 0 1rem;
    
    ${({ theme }) => theme.fonts.body06};
  `,
  RadioBoxInput: styled.input.attrs({type: 'radio', name: 'category'})`
    // position: absolute;

    clip: rect(0, 0, 0, 0);
  `,

  RadioBoxSpan: styled.label<{ selected: boolean }>`
    padding: 0.3rem 1.06rem;
    
    border: 0.1rem solid #E6E6E6;
    border-radius: 50px;
    border-color: ${(props) => (props.selected ? "#FBD262" : "#E6E6E")};
    
    background-color: ${(props) => (props.selected ? "#FEFBE8" : "white")};
    color: ${(props) => (props.selected ? "black" : "#9D9D9D")};
    
    ${({ theme }) => theme.fonts.body07};

    cursor: pointer;
  `,

  WritingCompleteButton: styled.button<{ disabled: boolean }>`
    // height: 3rem;
    margin: 1rem;
    padding: 1.2rem 1.5rem;

    border: none;
    border-radius: 1rem;
  
    ${({ theme }) => theme.fonts.body03};

    background-color: ${(props) => (props.disabled ? "#E6E6E6" : "#FBD262")};
    color: black;

    &:active {
      box-shadow: ${(props) => (props.disabled ? "none" : "3px 2px 22px 1px rgba(0, 0, 0, 0.24)")};
    }
  `,
}