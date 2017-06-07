import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Spin } from 'antd'
import {
  fetchHouseCheckList,
  updateHouseCheckListQuery,
  resetHouseCheckListQuery } from 'actions/house'
import { resetAmList } from 'actions/common'
import SearchTable from 'components/searchTable'

@connect(
  (state, props) => ({
    config: state.config,
    houseCheckSearchQuery: state.houseCheckSearchQuery,
    houseCheckSearchResult: state.houseCheckSearchResult,
  })
)
export default class houseCheckList extends Component {
  constructor(props) {
    super(props)
    this.state = { }
    this._handleSubmit = this._handleSubmit.bind(this)
    this.cacheSearch = this.cacheSearch.bind(this)
    this._clear = this._clear.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchHouseCheckList({ currentPage: 1 }))
  }

  _handleSubmit(query, currentPage) {
    // query.amRegions = this._getAmRegions(query.am)
    this.props.dispatch(fetchHouseCheckList({ ...query, currentPage: currentPage }))
  }

  searchList() {
    const { config } = this.props
    return [
      {
        key: 'keyword',
        label: '关键字',
        type: 'text',
      },
    ]
  }


  _clear() {
    this.props.dispatch(resetAmList())
    this.props.dispatch(resetHouseCheckListQuery())
  }

  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: '50px',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '1',
        dataIndex: 'address',
        key: 'address',
        width: '15%',
      },
      {
        title: '2',
        dataIndex: 'division',
        key: 'division',
        width: '10%',
      },
      {
        title: '3',
        dataIndex: 'institutions',
        key: 'institutions',
        width: '10%',
      },
      {
        title: '4',
        dataIndex: 'policeName',
        key: 'policeName',
        width: '100px',
      },
      {
        title: '5',
        dataIndex: 'houseStatus',
        key: 'houseStatus',
        width: '10%',
      },
      {
        title: '6',
        dataIndex: 'addressType',
        key: 'addressType',
        width: '100px',
      },
      {
        title: '操作',
        key: 'operate',
        // fixed: 'right',
        width: 60,
        render: function (text, record, index) {
          return (
            <span>
              <Button type="primary" size="small">
                <Link to={`/houseDetail/${text.id}`}>查看</Link>
              </Button>
            </span>
          )
        },
      },
    ]
  }

  cacheSearch(item) {
    this.props.dispatch(updateHouseCheckListQuery(item))
  }

  tableData() {
    return this.props.houseCheckSearchQuery.list
  }

  render() {
    const { houseCheckSearchQuery, houseCheckSearchResult } = this.props
    // console.log(houseCheckSearchResult)
    return (
      <div className="page">
        <Spin spinning={houseCheckSearchResult.loading}>
          <SearchTable
            onSubmit={this._handleSubmit}
            search={houseCheckSearchQuery}
            cacheSearch={this.cacheSearch}
            columns={this.columns()}
            searchList={this.searchList()}
            tableData={houseCheckSearchResult.list}
            currentPage={houseCheckSearchResult.currentPage}
            totalCount={houseCheckSearchResult.totalCount}
            clear={this._clear}
            scroll={{ y: true }}
            loading={houseCheckSearchResult.loading}
            // hasResetBtn={false}
          />
        </Spin>
      </div>
    )
  }
}
