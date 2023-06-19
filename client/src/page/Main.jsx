import styled from 'styled-components';
import '../Global.css';
import search from '../asset/search-icon.png';
import lock from '../asset/lock-icon.png';

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 900px;
  background-color: var(--black-100);
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-direction: column;
  width: 90%;
  height: 90%;
  background-color: var(--black-700);
`;

const TwinBoxContainer = styled.div`
  display: flex;
  width: 80%;
  padding: 15px 15px 0px 15px;
`;

const TwinBoxOrange = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  margin: 0px 16px 0px 0px;
  background-color: var(--orange-100);
  @media screen and (min-width: 600px) {
    border-bottom-right-radius: 0px;
  }
`;

const LogoIcon = styled.img`
  width: 60px;
`;
const TwinBoxBlue = styled(TwinBoxOrange)`
  background-color: var(--blue-100);
  border-radius: 10px;
  margin: 0px 0px 0px 16px;
  @media screen and (min-width: 600px) {
    border-bottom-left-radius: 0px;
  }
`;

const MainText = styled.div`
  font-size: 50px;
  font-weight: 900;
  color: var(--white);
  text-align: center;
  > span {
    color: var(--orange-500);
  }
`;

const TwinBoxText = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 16px;
`;

const TwinButtonOrange = styled.a`
  width: 60%;
  height: 50px;
  color: var(--white);
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: var(--orange-500);
  &:hover {
    background-color: var(--orange-600);
    cursor: pointer;
  }
`;

const TwinButtonBlue = styled(TwinButtonOrange)`
  background-color: var(--blue-500);
  &:hover {
    background-color: var(--blue-600);
  }
`;

const MiniTextContainer = styled.div`
  width: 80%;
  display: flex;
  margin: 50px;
`;

const MiniText = styled.div`
  width: 25%;
  height: 100px;
  margin: 10px 0px 10px 10px;
  text-align: center;
  color: var(--white);
  > span {
    font-size: 23px;
    font-weight: 700;
  }
`;

const Triangles = styled.div`
  display: flex;
`;

const OrangeTriangle = styled.div`
  width: 32px;
  height: 32px;
  margin: 0px 16px 16px 0px;
  clip-path: polygon(18px 0, 32px 0, -8px 40px, 0 38px, 0 0, 18px 0);
  background-color: var(--orange-100);
  transform: scaleX(-1);
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const BlueTriangle = styled(OrangeTriangle)`
  background-color: var(--blue-100);
  margin: 0px 0px 16px 16px;
  transform: scaleX(1);
`;

function MainPage() {
  return (
    <MainContainer>
      <ItemContainer>
        <TwinBoxContainer>
          <TwinBoxOrange>
            <LogoIcon src={search} />
            <TwinBoxText>
              Find the best answer to your technical <br />
              question, help others answer theirs
            </TwinBoxText>
            <TwinButtonOrange>Join the community</TwinButtonOrange>
          </TwinBoxOrange>
          <TwinBoxBlue>
            <LogoIcon src={lock} />
            <TwinBoxText>
              Want a secure, private space for your
              <br /> technical knowledge?
            </TwinBoxText>
            <TwinButtonBlue>Discover Teams</TwinButtonBlue>
          </TwinBoxBlue>
        </TwinBoxContainer>
        <Triangles>
          <OrangeTriangle />
          <BlueTriangle />
        </Triangles>
        <MainText>
          Every <span>developer</span> has a tab
          <br />
          open to stack Overflow
        </MainText>
        <MiniTextContainer>
          <MiniText>
            <span>100+ million</span>
            <br /> monthly visitors to Stack Overflow & Stack Exchange
          </MiniText>
          <MiniText>
            <span>45.1 billion</span>
            <br /> Times a developer got help since 2008
          </MiniText>
          <MiniText>
            <span>191% ROI</span>
            <br /> from companies using Stack Overflow for Teams
          </MiniText>
          <MiniText>
            <span>5,000+</span>
            <br /> Stack Overflow for Teams instances active every day
          </MiniText>
        </MiniTextContainer>
      </ItemContainer>
    </MainContainer>
  );
}

export default MainPage;
