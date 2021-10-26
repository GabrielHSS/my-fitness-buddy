import { Card } from 'antd'
import styled from 'styled-components'

export const Body = styled.section`
  padding: 32px 70px;
  margin-top: -72px;
  margin-bottom: 108px;
  .body-card {
    box-shadow: 0px 25px 33px 0px hsla(248, 57%, 60%, 0.05);
    border-radius: 5px;
  }
`

export const SearchContainer = styled(Card)`
  width: 50%;
  margin: 0 auto;
  margin-bottom: 54px;
  box-shadow: 0px 25px 33px 0px hsla(248, 57%, 60%, 0.05);
  border: 2px solid hsla(248, 57%, 60%, 0.125) !important;
  border-color: transparent;
  & .ant-input-search .ant-input,
  & .ant-input-search .ant-input:focus,
  & .ant-input-search .ant-input:active,
  & .ant-input-search .ant-input:hover,
  & .ant-input:focus,
  & .ant-input-focused {
    border-color: hsla(248, 57%, 60%, 0.125);
    outline: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  & .ant-input-search .ant-input {
  }
  & .ant-input-search .ant-input::placeholder {
    color: hsla(0, 0%, 0%, 0.2);
  }
  & .ant-btn {
    background-color: ${({ theme }) => theme.colors.primary50};
    border: none;
    border-top-right-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
  }
  & .anticon {
    color: #fff;
  }
`
