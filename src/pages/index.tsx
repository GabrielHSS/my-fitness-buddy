import Head from 'next/head'
import styled from 'styled-components'
import { ExperimentFilled } from '@ant-design/icons'
import { Card, Table, List } from 'antd'
import api from '../services/api'
import { useEffect, useState } from 'react'
import Search from 'antd/lib/input/Search'

const Wrapper = styled.main`
  min-height: 100vh;
  min-width: 100vw;
`
const Header = styled.section`
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
const Body = styled.section`
  padding: 32px 70px;
  margin-top: -72px;
  margin-bottom: 108px;
  .body-card {
    box-shadow: 0px 25px 33px 0px hsla(248, 57%, 60%, 0.05);
    border-radius: 5px;
  }
`
const Heading = styled.div`
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
const SearchContainer = styled(Card)`
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
type FoodNutrients = {
  nutrientName: string
  value: number
  unitName: string
}
type Record = {
  foodNutrients: FoodNutrients[]
  description: string[]
}

type Data = {
  dataType?: string
  key: string[]
  description: string[]
  foodCategory: string[]
  foodNutrients: FoodNutrients[]
}

const Home: React.FC = () => {
  const [apiData, setApiData] = useState<any>()
  const [selectedFood, setSelectedFood] = useState<string>()
  const [loading, setLoading] = useState<boolean>()

  const handleData = async () => {
    setLoading(true)
    selectedFood !== '' &&
      (await api.get(`/foods/search?query=${selectedFood}`).then(res => {
        const data = res.data
        setApiData(data)
      }))
    setLoading(false)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: 'Nome',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Categoria',
      dataIndex: 'foodCategory',
      key: 'foodCategory'
    }
  ]

  const tableData = (data: Data[]) => {
    const rows: Array<Data> = []
    data?.forEach((item: Data) => {
      // Remove branded foods info
      item.dataType === 'Survey (FNDDS)' &&
        rows.push({
          key: item.key,
          description: item.description,
          foodCategory: item.foodCategory,
          foodNutrients: item.foodNutrients
        })
    })
    return rows
  }

  const expandableRow = (record: Record, key: number) => {
    return (
      <List
        key={key}
        bordered
        dataSource={record.foodNutrients || undefined}
        style={{ maxHeight: '500px', overflowY: 'scroll' }}
        renderItem={(item: FoodNutrients) => {
          return (
            <List.Item key={item.nutrientName}>
              <p style={{ width: '50%' }}>{item.nutrientName}</p>
              <p style={{ width: '50%' }}>
                {item.value + item.unitName.toLowerCase()}
              </p>
            </List.Item>
          )
        }}
      />
    )
  }
  useEffect(() => {
    selectedFood === '' && setApiData(undefined)
  }, [selectedFood])
  return (
    <div>
      <Head>
        <title>MyFitnessBuddy</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Seu parceiro fitness!" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="Portuguese" />
        <meta name="author" content="MyFitnessBuddy" />
      </Head>
      <Wrapper>
        <Header>
          <span className="logo-container">
            <ExperimentFilled className="logo" />
            <h1 className="title">My Fitness Buddy</h1>
          </span>
        </Header>
        <Heading>
          <p className="title">Seu parceiro fitness chegou!</p>
          <p className="subtitle">
            Tenha à mão as informações nutricionais de cada alimento
          </p>
        </Heading>
        <Body>
          <SearchContainer>
            <Search
              placeholder="Pesquise aqui o alimento"
              size="large"
              onChange={event => {
                setSelectedFood(event.target.value)
              }}
              onSearch={handleData}
              loading={loading}
            />
          </SearchContainer>
          {apiData !== undefined && selectedFood !== '' && (
            <Card className={'body-card'}>
              <Table
                columns={columns}
                dataSource={tableData(apiData?.foods)}
                loading={loading}
                rowKey={record => record.description.toString()}
                expandable={{
                  expandedRowRender: (record, key) => expandableRow(record, key)
                }}
              />
            </Card>
          )}
        </Body>
      </Wrapper>
    </div>
  )
}

export default Home
