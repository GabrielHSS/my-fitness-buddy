import { ExperimentFilled } from '@ant-design/icons'
import React from 'react'
import { HeaderContainer, Heading } from './styles'

// import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <>
      <HeaderContainer>
        <span className="logo-container">
          <ExperimentFilled className="logo" />
          <h1 className="title">My Fitness Buddy</h1>
        </span>
      </HeaderContainer>
      <Heading>
        <p className="title">Seu parceiro fitness chegou!</p>
        <p className="subtitle">
          Tenha à mão as informações nutricionais de cada alimento
        </p>
      </Heading>
    </>
  )
}

export default Header
