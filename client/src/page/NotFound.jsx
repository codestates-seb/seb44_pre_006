import { styled } from 'styled-components';
import Nav from '../component/Nav';
import { ReactComponent as PageNotFound } from '../asset/page-not-found.svg';

const Container = styled.div`
  max-width: 100%;
  height: 100vh;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--black-050);
`;

const Content = styled.div`
  max-width: 1264px;
  height: 100%;
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const CenterBox = styled.div`
  max-width: 710px;
  display: flex;
`;

const ErrorImgWrapper = styled.div`
  margin: 1rem;

  svg {
    margin-top: calc(-48px);
  }
`;

const ErrorTextContainer = styled.div`
  margin: 16px;
  max-width: 450px;

  > h1 {
    font-size: 1.4rem;
    margin: 0 0 0.25rem;
  }

  .first-p {
    font-size: 1.1rem;
    margin: 0 0 1.1rem;
  }

  > p {
    font-size: 0.9rem;
    margin: 0 0 1.1rem;
  }
`;

function NotFound() {
  return (
    <Container>
      <Nav />
      <ContentWrapper>
        <Content>
          <CenterBox>
            <ErrorImgWrapper>
              <PageNotFound alt="page-not-found" />
            </ErrorImgWrapper>
            <ErrorTextContainer>
              <h1>Page not found</h1>
              <p className="first-p">We're sorry, we couldn't find the page you requested.</p>
              <p>Try searching for similar questions</p>
              <p>Browse our recent questions</p>
              <p>Browse our popular tags</p>
              <p>If you feel something is missing that should be here, contact us.</p>
            </ErrorTextContainer>
          </CenterBox>
        </Content>
      </ContentWrapper>
    </Container>
  );
}

export default NotFound;
