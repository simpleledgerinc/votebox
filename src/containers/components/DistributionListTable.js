import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import BitDB from '../../lib/BitDB'
import { Button, Icon, Input } from 'semantic-ui-react'
import PropDataUpdatedCSVLink from './PropDataUpdatedCSVLink'
import CSVReader from 'react-csv-reader'
import './DistributeListTable.css'

class DistributionListTable extends Component {
    constructor() {
        super()
        this.state = {
            holders: [],
            voteTokenQuantity: 0,
            addNew: false,
            newVoteAddress: '',
            showCSVReader: false
        }
    }

    componentDidMount() {
        const { id, voteTokenQuantity } = this.props
        BitDB.getTokenBalances(id).then(holders => {
            this.setState({
                holders,
                voteTokenQuantity
            })
            this.convertToCSV(holders)
        })
    }

    removeItem = (index) => {
        let temp = this.state.holders
        temp.splice(index, 1)
        this.setState({
            holders: temp
        })
    }

    addNewRow= () => {
        this.setState({
            addNew: true
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addNew = () => {
        if (!this.state.newVoteAddress) return
        let temp = this.state.holders
        temp.push({
            address: this.state.newVoteAddress,
            amount: '',
            name: ''
        })
        this.setState({
            holders: temp,
            addNew: false
        })
    }

    handleCSVRead = (data) => {
        data.splice(0, 1)
        let temp = []
        data.map(item => {
            temp.push({
                address: item[0],
                amount: item[1],
                name: item[2]
            })
        })
        this.setState({ 
            holders: temp,
            showCSVReader: false
        })
    }

    handleCSVError = (error) => {
        console.log(error)
    }

    convertToCSV = (holders) => {
        let temp = []
        holders.map(item => {
            temp.push([item.address, item.amount, item.name == undefined ? '' : item.name])
        })
        return temp
    }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                const data = [...this.state.holders];
                data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data })
                    let amount = 0
                    data.map(item => {
                        amount += parseInt(item.amount)
                    })
                    if (amount > parseInt(this.state.voteTokenQuantity)) {
                        this.props.handleTableErrorSubmit(true)
                    } else {
                        this.props.handleTableErrorSubmit(false)
                    }
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.holders[cellInfo.index][cellInfo.column.id]
                }}
            />
        )
    }

    renderNewRow() {
        if (!this.state.addNew) return (
            <Button inverted color='blue' onClick={this.addNewRow}>Add New Row</Button>
        )
        return (
            <div className='newRow'>
                <Input onChange={this.handleChange} id='newVoteAddress' placeholder='Enter a new Vote Address' />
                <Button disabled={!this.state.newVoteAddress} onClick={this.addNew}>Add New</Button>
            </div>
        )
    }

    renderCSVReader = () => {
        if (!this.state.showCSVReader) return null
        return (
            <CSVReader
                cssClass='csv-reader'
                onFileLoaded={this.handleCSVRead}
                onError={this.handleCSVError}
                inputId="csvReader"
                inputStyle={{color: 'blue'}}
            />
        )
    }

    render() {
        const { holders } = this.state
        const csvHeaders = ['Voter Address', 'Vote Token Quantity', 'Voter Name']
        const columns = [{
            Header: 'Voter Address',
            accessor: 'address'
        }, {
            Header: 'Vote Token Quantity',
            accessor: 'amount',
            Cell: this.renderEditable
        }, {
            Header: 'Voter Name',
            accessor: 'name',
            Cell: this.renderEditable
        }, {
            Header: ' ',
            accessor: 'remove',
            width: 30,
            Cell: row => {
                return (
                    <Icon name='delete' size='small' style={{cursor: 'pointer'}} onClick={() => this.removeItem(row.viewIndex)}/>
                )
            }
        }]

        const csvData = this.convertToCSV(this.state.holders)

        return (
            <div className='container'>
                {this.renderNewRow()}
                <div className='table-container'>
                    <ReactTable
                        data={holders}
                        columns={columns}
                        defaultPageSize={10}
                        className='-striped -highlight react-table'
                    />
                </div>
                <div style={{width: '100%', display: 'block', marginTop: '20px'}}>
                    <Button basic color='blue'>
                        <PropDataUpdatedCSVLink
                            data={csvData}
                            filename={'vote-list.csv'}
                            headers={csvHeaders}>
                            Download Voter List
                        </PropDataUpdatedCSVLink>
                    </Button>
                    <Button onClick={() => {this.setState({showCSVReader: true})}} basic color='blue'>
                        Load Voter List
                    </Button>
                    {this.renderCSVReader()}
                    <Button onClick={() => {this.props.onSubmit()}} disabled={this.state.tableError} style={{float: 'right'}} color='green'>Proceed to Airdrop</Button>
                </div>
            </div>
        )
    }
}

export default DistributionListTable