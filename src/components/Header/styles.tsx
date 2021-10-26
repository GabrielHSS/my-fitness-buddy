import styled from 'styled-components'

export const HeaderContainer = styled.section`
  display: flex;
  align-items: center;
  padding: 12px 70px;
  background-color: ${({ theme }) => theme.colors.primary50};
  .logo-container {
    display: flex;
    align-items: center;
  }
  .logo {
    font-size: 16px;
    margin-right: 12px;
    color: #fff;
  }
  .title {
    text-transform: uppercase;
    font: 700 20px Poppins, sans-serif;
    margin-bottom: 0;
    color: #fff;
  }
  .menu-button {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 5px;
  }
`
export const Heading = styled.div`
  background-image: url('/bg.png');
  background-size: cover;
  background-position-x: 50%;
  text-align: center;
  color: #fff;
  padding: 108px 0;
  .title {
    font: 700 48px/100% Poppins;
    margin-bottom: 24px;
  }
  .subtitle {
    font: 500 28px/100% Poppins;
  }
`
