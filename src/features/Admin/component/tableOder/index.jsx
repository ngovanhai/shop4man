import React from 'react';
import PropTypes from 'prop-types';
import { Button, TableCell, TableRow } from '@material-ui/core';
import ItemProducts from '../ItemProduct';

TableOder.propTypes = {

};



function TableOder(props) {
    const { row, checkOder,loading } = props
    const handleCheck = () => {
        let check
        if(row.check === 1){
            check = {
                "check":0
            }
        }else{ 
            check ={
                "check":1
            }}
        checkOder(row.id,check)
    }
    
    return (
        <TableRow key={row.name}>
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.address}</TableCell>
            <TableCell align="right">
                <ItemProducts
                    products={row}
                />
            </TableCell>
            <TableCell align="right">{(row.check) ? "co" : "chua"}</TableCell>
            <TableCell align="right">{row.total}</TableCell>
            <TableCell align="right" onClick={handleCheck}><Button loading={loading}>{(row.check) ? "hủy" : "duyệt đơn"} </Button></TableCell>
        </TableRow>

    );
}

export default TableOder;