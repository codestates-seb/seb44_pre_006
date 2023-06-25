import React from 'react';
import { styled } from 'styled-components';
import testUser from '../../../asset/User_null.png';

const GridItem = styled.div`
  padding: 5px 6px 7px 7px;
`;

const UserAvatarWrapper = styled.div`
  display: flex;
  border-radius: 2px;
  cursor: pointer;

  > a {
    text-decoration: none;

    > img {
      width: 48px;
      height: 48px;
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

  > span {
    font-size: 0.8rem;
    color: var(--black-500);
    word-wrap: break-word;
  }
`;

function UserItem({ memberId, email, name }) {
  return (
    <GridItem>
      <UserAvatarWrapper>
        <a href={`/user/${memberId}`}>
          <img src={testUser} alt="user=avatar" />
        </a>
        <UserDetails>
          <UserName href={`/user/${memberId}`}>{name}</UserName>
          <UserEmail>
            <span>{email}</span>
          </UserEmail>
        </UserDetails>
      </UserAvatarWrapper>
    </GridItem>
  );
}

export default UserItem;
