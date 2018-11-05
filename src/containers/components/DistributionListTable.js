import React, { Component } from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import BitDB from '../../lib/BitDB';

class DistributionListTable extends Component {
    constructor() {
        super()
        this.state = {
            holders: []
        }
        this.renderEditable = this.renderEditable.bind(this)
    }

    componentDidMount() {
        const { id } = this.props
        BitDB.getTokenBalances(id).then(holders => {
            this.setState({
                holders
            })
        })
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                const data = [...this.state.holders];
                data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.holders[cellInfo.index][cellInfo.column.id]
                }}
            />
        )
    }

    render() {
        const { holders } = this.state
        const columns = [{
            Header: 'Voter Address',
            accessor: 'address'
        }, {
            Header: 'Vote Token Quantity',
            accessor: 'amount'
        }, {
            Header: 'Vote Name',
            accessor: 'name',
            Cell: this.renderEditable
        }]

        return (
            <div style={{width: '100%'}}>
                <ReactTable
                    data={holders}
                    columns={columns}
                    style={{height: '400px', width: '100%', padding: 0}}
                    defaultPageSize={10}
                    className='-striped -highlight'
                />
            </div>
        )
    }
}

export default DistributionListTable