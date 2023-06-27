import React from 'react';
import { styled } from 'styled-components';
import testUser from '../../../asset/User_null.png';
import fe1 from '../../../asset/fe-1.jpeg';
import fe2 from '../../../asset/fe-2.jpeg';
import fe3 from '../../../asset/fe-3.jpeg';
import be1 from '../../../asset/be-1.jpeg';
import be2 from '../../../asset/be-2.png';
import be3 from '../../../asset/be-3.png';
import be4 from '../../../asset/be-4.png';


const GridItem = styled.div`
  padding: 5px 6px 7px 7px;
`;

const UserAvatarWrapper = styled.div`
  display: flex;
  cursor: pointer;

  > a {
    text-decoration: none;

    > img {
      border-radius: 5px;
      width: 60px;
      height: 60px;
    }
  }
`;

const UserDetails = styled.div`
  display: flex;
  margin-left: 9px;
  width: calc(100% - 64px);
  line-height: 1.3;
  word-wrap: break-word;
  flex-direction: column;
  justify-content: space-around;
`;

const UserName = styled.a`
  display: flex;
  font-size: 1rem;
  text-decoration: none;
  color: var(--blue);
  cursor: pointer;

  &:hover {
    color: var(--blue-500);
  }
`;

const UserEmail = styled.div`
  display: flex;

  > a {
    text-decoration: none;
    color: var(--orange-400);
  }
`;

function UserItem() {
  return (
    <div>
      <GridItem>
        <h1>BE</h1>
        <UserAvatarWrapper>
          <a>
            <img src={be1} alt="user=avatar" />
          </a>
          <UserDetails>
            <UserName>박지인</UserName>
            <UserEmail>
              <a href='https://github.com/jeein2222'>https://github.com/jeein2222</a>
            </UserEmail>
          </UserDetails>
        </UserAvatarWrapper>
      </GridItem> 
      <GridItem>
        <UserAvatarWrapper>
          <a>
            <img src={be2} alt="user=avatar" />
          </a>
          <UserDetails>
            <UserName>김어진</UserName>
            <UserEmail>
              <a href='https://github.com/kimaj2001'>https://github.com/kimaj2001</a>
            </UserEmail>
          </UserDetails>
        </UserAvatarWrapper>
      </GridItem> 
      <GridItem>
        <UserAvatarWrapper>
          <a>
            <img src={be3} alt="user=avatar" />
          </a>
          <UserDetails>
            <UserName>이지윤</UserName>
            <UserEmail>
              <a href='https://github.com/younihi'>https://github.com/younihi</a>
            </UserEmail>
          </UserDetails>
        </UserAvatarWrapper>
      </GridItem> 
      <GridItem>
        <UserAvatarWrapper>
          <a>
            <img src={be4} alt="user=avatar" />
          </a>
          <UserDetails>
            <UserName>최서우</UserName>
            <UserEmail>
              <a href='https://github.com/wooseoboy'>https://github.com/wooseoboy</a>
            </UserEmail>
          </UserDetails>
        </UserAvatarWrapper>
      </GridItem> 
      <GridItem>
        <h1>FE</h1>
        <UserAvatarWrapper>
          <a>
            <img src={fe1} alt="user=avatar" />
          </a>
          <UserDetails>
            <UserName>한원영</UserName>
            <UserEmail>
              <a href='https://github.com/qpwoei0123'>https://github.com/qpwoei0123</a>
            </UserEmail>
          </UserDetails>
        </UserAvatarWrapper>
      </GridItem> 
      <GridItem>
        <UserAvatarWrapper>
          <a>
            <img src={fe2} alt="user=avatar" />
          </a>
          <UserDetails>
            <UserName>김형일</UserName>
            <UserEmail>
              <a href='https://github.com/hyeong-il'>https://github.com/hyeong-il</a>
            </UserEmail>
          </UserDetails>
        </UserAvatarWrapper>
      </GridItem> 
      <GridItem>
        <UserAvatarWrapper>
          <a>
            <img src={fe3} alt="user=avatar" />
          </a>
          <UserDetails>
            <UserName>이지효</UserName>
            <UserEmail>
              <a href='https://github.com/dlwl8y'>https://github.com/dlwl8y</a>
            </UserEmail>
          </UserDetails>
        </UserAvatarWrapper>
      </GridItem> 
    </div>
  );
}

export default UserItem;
