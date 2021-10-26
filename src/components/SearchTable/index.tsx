import React, { useEffect, useState } from 'react'
import Search from 'antd/lib/input/Search'
import { Body, SearchContainer } from './styles'
import api from '../../services/api'
import { Card, List, Table } from 'antd'
import { Data, Record, FoodNutrients } from './types'

const SearchTable: React.FC = () => {
  const [apiData, setApiData] = useState<any>()
  const [selectedFood, setSelectedFood] = useState<string>()
  const [loading, setLoading] = useState<boolean>()

  const handleData = async () => {
    setLoading(true)
    try {
      selectedFood !== '' &&
        (await api.get(`/foods/search?query=${selectedFood}`).then(res => {
          const data = res.data
          setApiData(data)
        }))
    } catch (err) {
      console.log(err)
    }
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
  )
}

export default SearchTable
