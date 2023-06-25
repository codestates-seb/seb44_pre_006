import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import SideBar from '../component/SideBar';
import SearchBar from '../component/user/users/SearchBar';
import UserItem from '../component/user/users/UserItem';
import Pagination from '../ui/Pagination';
import Loader from '../ui/Loader';
import { fetchAllUser } from '../api/getAllUser';

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
  const { status, users } = useSelector((state) => state.alluser);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUser({ currentPage, postsPerPage }));
  }, [dispatch, currentPage, postsPerPage]);

  const indexOfLastPost = useMemo(
    () => currentPage * postsPerPage,
    [currentPage, postsPerPage]
  );
  const indexOfFirstPost = useMemo(
    () => indexOfLastPost - postsPerPage,
    [indexOfLastPost, postsPerPage]
  );

  const currentPosts = useMemo(
    () => users.slice(indexOfFirstPost, indexOfLastPost),
    [users, indexOfFirstPost, indexOfLastPost]
  );

  const filteredUsers = useMemo(() => {
    if (searchText.trim() === '') {
      return currentPosts;
    }
    return currentPosts.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, currentPosts]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
    setCurrentPage(1);
  };

  const onPaginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <Container>
      <SideBar />
      <Content>
        <Headline>Users</Headline>
        <SearchBar
          handleSearch={handleSearch}
          searchText={searchText}
          setSearchText={setSearchText}
        >
          searchBar
        </SearchBar>
        <GridContainer>
          <UserGrid>
            {status === 'loading' && <Loader />}
            {status === 'succeed' &&
              filteredUsers.map((item) => (
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
