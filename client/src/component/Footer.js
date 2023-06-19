import { styled } from 'styled-components';
import logo from '../asset/logo-icon.png';

const FooterContainer = styled.div`
  background-color: hsl(210, 8%, 15%);
  width: 100%;
  height: 70px;
  padding: 10px 100px;
  display: flex;
`;

const Logoimg = styled.img`
  height: 40px;
  width: auto;
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
  flex-direction: column;
  text-align: center;
  > p {
    color: hsl(210, 8%, 60%);
  }
`;

function Footer() {
  return (
    <FooterContainer className='Footer'>
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
    </FooterContainer>
  );
}

export default Footer;
