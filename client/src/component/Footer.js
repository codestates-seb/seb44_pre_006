import { styled } from 'styled-components';
import logo from '../asset/logo-icon.png';

const FooterContainer = styled.div`
  box-sizing: border-box;
  background-color: hsl(210, 8%, 15%);
  background-image: none;
  background-position: top left;
  background-size: auto;
  position: relative;
  transform: translatY(-100%);
  width: 100%;

  .footer-container {
    width: 100%;
    margin: 0 auto;
    padding: 32px 12px 12px 12px;
    display: flex;
    flex-flow: row wrap;
  }
`;

const Logoimg = styled.img`
  width: 32px;
  height: 37px;
`;

const FooterNav = styled.nav`
  display: flex;
  flex: 2 1 auto;
  vertical-align: baseline;

  > ul {
    color: hsl(210, 8%, 60%);
    list-style-type: none;
  }
`;

const DesignBy = styled.div`
  flex: 1 1 150px;
  flex-direction: column;
  text-align: center;

  > p {
    color: hsl(210, 8%, 60%);
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <div className="footer-container">
        <Logoimg src={logo} />
        <FooterNav>
          <ul>
            <li>Questions</li>
          </ul>
          <ul>
            <li>About Team</li>
          </ul>
          <ul>
            <li>GitHub</li>
          </ul>
        </FooterNav>
        <DesignBy>
          <p>Site design / Team 낭만코더</p>
        </DesignBy>
      </div>
    </FooterContainer>
  );
}

export default Footer;
