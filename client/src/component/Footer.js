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
    list-style-type: none;

    > li > a {
      text-decoration: none;
      color: hsl(210, 8%, 60%);
    }
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
            <li>
              <a href='/home'>Questions</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='/about'>About Team</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='https://github.com/codestates-seb/seb44_pre_006'>GitHub</a>
            </li>
          </ul>
        </FooterNav>
        <DesignBy>
          <p>Site design / Team 낭만코더</p>
        </DesignBy>
    </FooterContainer>
  );
}

export default Footer;
