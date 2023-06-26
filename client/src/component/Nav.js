import { styled } from "styled-components";
import SOF from "../asset/SOF_Logo.png"
import UserNull from "../asset/User_null.png"
import searchLogo from "../asset/search_logo.svg"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from '../store/userSlice';
import  {fetchSreachTitle}  from "../api/sreachTitle";

const NavContainer = styled.header`
  width: 100%;
  height: 50px;
  border: 1px solid var(--silver);
  border-top: 3px solid var(--orange);
  background-color: var(--white);
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 100;
  > .imgDiv{
    height: 100%;
  }
`;

const LogoImag = styled.img`
  margin-left: 100px;
  height: 100%;
  padding: 0 20px;
  &:hover{
    background-color: var(--black-050);
  }
`;

const NavLink = styled.div`
  color: var(--black-500);
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
  &:hover{
    background-color: var(--black-050);
  }
`;

const NavSreachBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid var(--silver);
  height: 70%;
  width: 700px;
  margin-left: 30px;
  border-radius: 5px;

  > button {
    background: none;
    border: none;
  }

  > input {
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 110%;
  }
`;

const NavLogBtn = styled.button`
  height: 70%;
  border: 1px solid var(--silver);
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  margin-left: 10px;
  border-radius: 5px;
  padding: 0px 10px;
  &:hover {
    filter: brightness(90%);
  }
`;

const NavUserLink = styled.img`
  height: 70%;
  border: 1px solid var(--silver);
  border: none;
  margin-left: 10px;
`;

const AdminOn = styled.p`
    font-size: 22px;
    color: var(--white);
    margin: 0 0 0 50px;
    background-color: var(--orange);
    padding: 10px;
`

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const jwtToken = localStorage.getItem('jwtToken');

  const onLogOutHandler = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    window.location.reload();
    dispatch(resetUser());
  };

  // 엔터 키를 누를 때 동작
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const searchText = event.target.value; // 입력된 텍스트를 사용하여 필요한 동작을 수행합니다.
      event.target.value = ''; // 검색 이후 입력값 초기화
      dispatch(fetchSreachTitle(searchText))
      navigate('/question')
    }

  };


  return (
    <NavContainer>
        <div className="imgDiv"><LogoImag src={SOF} onClick={() =>  navigate('/')} /></div>
        <NavLink onClick={() => navigate()}>About</NavLink>
      <NavSreachBar>
        <button>
          <img src={searchLogo} alt='sreachLogo' />
        </button>
        <input placeholder="Search..."  onKeyPress={handleKeyPress}/>
      </NavSreachBar>
      {!jwtToken ? (
        <>
          <NavLogBtn backgroundColor="var(--powder-200)" color="var(--powder-700)" onClick={() => navigate('/user/login')}>
            Log in
          </NavLogBtn>
          <NavLogBtn backgroundColor="var(--blue-500)" color="var(--blue-050)" onClick={() => navigate('/user/signup')}>
            Sign up
          </NavLogBtn>
        </>
      ) : (
        <>
          <NavUserLink src={UserNull} onClick={() => navigate(`/user/${user.data.memberId}`)}></NavUserLink>
            <p>{user.data.name}</p>
          <NavLogBtn backgroundColor="var(--red-400)" color="var(--red-050)" onClick={() => onLogOutHandler()}>
            Log out
          </NavLogBtn>
          {user.data.admin
            ? <AdminOn>Admin Mode</AdminOn>
            : null}
        </>
      )}
    </NavContainer>
  );
}

export default Nav;