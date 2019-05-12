import React, { Component }       from 'react'
import ReactTable                 from 'react-table'
import { browserHistory }         from 'react-router'
import { Logo, Tips }             from './Utils'
import { FaTrash}                 from 'react-icons/fa'
// import matchSorter from 'match-sorter'
// var dateFormat = require('dateformat');
const timeConverter = {'8 am' : 8, '9 am' : 9, '10 am' : 10, '11 am' : 11, '12 pm' : 12, '1 pm' : 13, '2 pm' : 14, '3 pm' : 15, '4 pm' : 16, '5 pm' : 17, '6 pm' : 18, '7 pm' : 19, '8 pm' : 20, }

const trashIcon = (a,b) => {
  return (
    <div>
      {a.value}
      <FaTrash className='hoverPointer' />
    </div>
  )
}

export default class WeatherLog extends Component {
  constructor(props) {
    super();
    this.state = {}
  }

  componentDidMount() {
    const { getAllLogs } = this.props
    getAllLogs()
  }

  render() {
    const { user, allWeatherLogs }= this.props
    return (
      <div >

        <ReactTable
          data={allWeatherLogs}
          filterable
          getTdProps={(state, rowInfo, column, instance) => {
                    return {
                      onClick: (e, handleOriginal) => {

                        if((column.Header == 'User')&& (user.id ===  rowInfo.original.user_id)){
                          if (confirm('Would you like delete this entry, ' + user.name + '?')) {
                            this.props.removeLogEntry(rowInfo.original.id)
                            this.props.getAllLogs()
                          } 
                        }
                        if (handleOriginal) {
                          handleOriginal()
                        }
                      }
                    }
                  }}
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              columns: [
                {
                  Header: "Date",
                  headerClassName: 'biggerHeader',
                  accessor: "date",
                  style: {'fontSize': '23px'} ,               

                  sortMethod: (a, b) => {
                    if (a === b) {
                      return 0;
                    }
                    return a > b ? 1 : -1;
                  },
                  filterMethod: (filter, row) => {

                    return val.startsWith(filter.value)
                  },
                },             
                {
                  Header: "Time",
                  headerClassName: 'biggerHeader',
                  accessor: "time",
                  style: {'fontSize': '23px'} , 
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toString()),
                  sortMethod: (a, b) => {
                    if (timeConverter[a] === timeConverter[b]) {
                      return 0;
                    }
                    return timeConverter[a] > timeConverter[b] ? 1 : -1;
                  }
                },
                {
                  Header: "Locat.",
                  headerClassName: 'biggerHeader',
                  accessor: "location",
                  style: {'fontSize': '23px'} , 
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },             
                {
                  Header: "Wind mph",
                  headerClassName: 'biggerHeader',
                  accessor: 'windSpeed',
                  style: {'fontSize': '23px'} , 
                  filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toString())
                },
                {
                  Header: "Wind Dir.",
                  headerClassName: 'biggerHeader',
                  accessor: 'windDirection',
                  style: {'fontSize': '23px'} , 
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },
                {
                  Header: "Condit.",
                  headerClassName: 'biggerHeader',
                  accessor: 'conditions',
                  style: {'fontSize': '20px'} , 
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },
                {
                  Header: "User",
                  headerClassName: 'biggerHeader',
                  accessor: 'user_Name',
                  Cell: trashIcon,
                  style: {'fontSize': '18px'} , 
                  filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value.toLowerCase())
                },
                // {
                //   Header: "Log ID",
                //   headerClassName: 'biggerHeader',
                //   accessor: 'id',
                //   style: {'font-size': '23px'} , 
                //   filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toLowerCase())
                // },
                // {
                //   Header: "User ID",
                //   headerClassName: 'biggerHeader',
                //   accessor: 'user_id',
                //   style: {'font-size': '23px'} , 
                //   filterMethod: (filter, row) => row[filter.id].toString().startsWith(filter.value.toLowerCase())
                // }
              ]
            }
          ]}
          defaultPageSize={10}
          defaultSorted={[
           { id: 'date',
            desc: true
           }
          ]}
          className="-striped -highlight"
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />

      </div>


    )
  }
}


