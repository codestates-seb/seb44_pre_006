import React from 'react';
import { styled } from 'styled-components';
import displayCreatedAt from '../utils/displayCreateAt';
import test_user from '../asset/User_null.png';

const QuestionListWrapper = styled.section`
  border-top: 1px solid var(--black-100);
  max-width: 751px;
  margin-left: -18px;
  position: relative;
`;

const QuestionList = styled.div`
  display: flex;
  margin-bottom: 30px;
  padding: 16px;
`;

const QuestionSummary = styled.div`
  display: flex;
  flex-direction: row;
`;

const SummaryStats = styled.div`
  margin: 0 16px 4px 0;
  width: 108px;
  color: var(--fc-light);
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StatsItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  gap: 0.3rem;
`;

const SummaryContent = styled.div`
  display: flex;
  width: 100%;
  flex: 1 0 0;
  flex-direction: column;
  position: relative;
`;

const ContentTitle = styled.h3`
  display: inline-block;
  padding-right: 24px;
  font-size: 17px;
  hyphens: auto;
  color: var(--blue);
  word-break: break-word;
  overflow-wrap: break-word;
`;

const TitleLink = styled.a`
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: var(--blue-500);
  }
`;

const SummaryMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 6px;
  justify-content: space-between;
  align-items: center;
`;

const MetaTages = styled.div`
  display: flex;
  flex-wrap: wrap;
  line-height: 18px;
  float: left;
  font-size: 12px;

  .tag-list-wrapper {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: inline;
  }

  .tag-list-item {
    display: inline;
    margin-right: 4px;

    .tag-link {
      color: var(--powder-700);
      background-color: var(--powder-100);
      border-color: transparent;
      display: inline-block;
      padding: 0.4em 0.5em;
      margin: 0 2px 2px 0;
      line-height: 1;
      text-align: center;
      border: 1px solid transparent;
      border-radius: 3px;

      &:hover {
        color: var(--powder-800);
        background-color: var(--powder-200);
        border-color: transparent;
      }
    }
  }
`;

const MetaUserCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-left: auto;
  align-items: center;
  gap: 4px;
`;

const UserAvatar = styled.a`
  width: 16px;
  height: 16px;
  display: flex;
  position: relative;
  cursor: pointer;

  .avatar-wrapper {
    display: flex;
    border-radius: 3px;

    .avatar-image {
      background-color: var(--white);
      background-repeat: no-repeat;
      background-size: 100%;
      width: 16px;
      height: 16px;
      overflow-clip-margin: content-box;
      overflow: clip;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .user-info-link-wrapper {
    display: flex;
    font-size: var(--_uc-link-fs);
    white-space: var(--_uc-link-ws);
    align-items: center;
    flex-wrap: wrap;
    min-width: 0;
    overflow-wrap: break-word;

    .user-info-link {
      margin: 2px;
      font-size: 12px;
      text-decoration: none;
      color: var(--blue);
      cursor: pointer;

      &:hover {
        color: var(--blue-500);
      }
    }
  }
`;

const UpdateTime = styled.div`
  color: var(--black-500);
  white-space: nowrap;
  font-size: 12px;

  .time-link {
    text-decoration: none;

    .relative-time {
      color: var(--black-700);
    }
  }
`;

function QuestionItem({
  questionId,
  userName,
  userAvatar,
  title,
  content,
  viewCount,
  answerCount,
  createAt,
  modifiedAt,
}) {
  return (
    <QuestionListWrapper>
      <QuestionList>
        <QuestionSummary>
          <SummaryStats>
            <StatsItem>
              <span className="stats-item-number">{viewCount}</span>
              <span className="stats-item-unit">views</span>
            </StatsItem>
            <StatsItem>
              <span className="stats-item-number">{answerCount}</span>
              <span className="stats-item-unit">answers</span>
            </StatsItem>
          </SummaryStats>
        </QuestionSummary>
        <SummaryContent>
          <ContentTitle>
            <TitleLink>{title}</TitleLink>
          </ContentTitle>
          <SummaryMeta>
            <MetaTages>
              <ul className="tag-list-wrapper">
                <li className="tag-list-item">
                  <a className="tag-link">react</a>
                </li>
                <li className="tag-list-item">
                  <a className="tag-link">react-router-dom</a>
                </li>
                <li className="tag-list-item">
                  <a className="tag-link">redux-toolkit</a>
                </li>
              </ul>
            </MetaTages>
            <MetaUserCard>
              <UserAvatar>
                <div className="avatar-wrapper">
                  <img
                    src={test_user}
                    alt="user-avatar"
                    className="avatar-image"
                  />
                </div>
              </UserAvatar>
              <UserInfo>
                <div className="user-info-link-wrapper">
                  <a className="user-info-link">{userName}</a>
                </div>
              </UserInfo>
              <UpdateTime>
                <span>asked </span>
                <span className="relative-time">{displayCreatedAt(createAt)}</span>
              </UpdateTime>
            </MetaUserCard>
          </SummaryMeta>
        </SummaryContent>
      </QuestionList>
    </QuestionListWrapper>
  );
}

export default QuestionItem;
