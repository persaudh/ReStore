import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../../app/api/agent";
import { useStoreContext } from "../../../app/api/context/StoreContext";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { Basket } from "../../../app/models/basket";

export default function BasektPage() {
    const {basket} = useStoreContext();

    if (!basket) return <Typography variant="h3">Your basket is empty</Typography>

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {basket.items.map(item => (
                        <TableRow
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight: 20}} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="right">{item.price}</TableCell>
                            <TableCell align="center">
                                <IconButton color='error'>
                                    <Remove />
                                </IconButton>
                                {item.quantity}
                                <IconButton color='secondary'>
                                    <Add />
                                </IconButton>
                                </TableCell>
                            <TableCell align="right">${((item.price/100) * item.quantity).toFixed(2)}</TableCell>
                            <TableCell align="right"><IconButton color="error">
                                <Delete />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}