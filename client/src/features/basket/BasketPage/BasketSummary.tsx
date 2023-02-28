import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { useStoreContext } from "../../../app/context/StoreContext";
import { currencyFormat } from "../../../app/util/util";

export default function BasketSummary() {
    const {basket} = useStoreContext();
    const subtotal =  basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)  ??  0; //reduce basket array to get sub totoals
    const freeDelivery = 10000;
    const deliveryPrice = 500;

    function deliveryFee(){
        if(subtotal > freeDelivery) return 0;
        return deliveryPrice;
    }

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee())}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee())}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}