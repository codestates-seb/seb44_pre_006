import { styled } from 'styled-components';
import FadeLoader from 'react-spinners/FadeLoader';

const LoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
  background-color: var(--orange);

  .fade-loader {
    display: flex;
    width: 100%;
    background-color: var(--orange);
  }
`;

function Loader() {
  return (
    <LoaderWrapper>
      <FadeLoader className="fade-loader" />
    </LoaderWrapper>
  );
}

export default Loader;