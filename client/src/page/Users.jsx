import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import SideBar from '../component/SideBar';
import SearchBar from '../component/user/users/SearchBar';
import UserItem from '../component/user/users/UserItem';
import Pagination from '../ui/Pagination';
import Loader from '../ui/Loader';
import { fetchAllUser } from '../api/getAllUser';
// import { fetchSearchUser } from '../../../api/searchUser';


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

function Users() {
  const { status, users } = useSelector(state => state.alluser)
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUser({ currentPage, postsPerPage }));
  },[]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

  const onPaginate = (pageNum) => setCurrentPage(pageNum);

  console.log(currentPosts);

  return (
    <Container>
      <SideBar/>
      <Content>
        <Headline>Users</Headline>
        <SearchBar users={users}>searchBar</SearchBar>
        <GridContainer>
          <UserGrid>
          {status === 'loading' && <Loader />}
          {status === 'succeed' &&
            currentPosts.map((item) => (
              <UserItem key={item.memberId} {...item} />
            ))}
          </UserGrid>
        </GridContainer>
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={users.length}
            onPaginate={onPaginate}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
      </Content>
    </Container>
  );
}

export default Users;