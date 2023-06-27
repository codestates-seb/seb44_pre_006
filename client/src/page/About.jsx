import styled from 'styled-components';
import AboutItem from '../component/user/users/AboutItem';

const Container = styled.div`
  max-width: 1264px;
  width: 80%;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  padding: 24px 16px;
`;

const Headline = styled.h1`
  margin: 0 0 1.5rem;
  font-size: 1.7rem;
`;

const GridContainer = styled.div`
  max-width: 1264px;
  width: 100%;
  text-align: left;
`;

const UserGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem 1rem;
`;

function About() {

  return (
    <Container>
      <Content>
        <Headline>About Teams: 🌙 낭만코더</Headline>
        <GridContainer>
          <UserGrid>
            <AboutItem />
          </UserGrid>
        </GridContainer>
      </Content>
    </Container>
  );
}

export default About;
