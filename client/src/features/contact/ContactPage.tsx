import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
    const dispacth = useAppDispatch();
    const { data, title } = useAppSelector(state => state.counter);
    return (
        <>
            <Typography variant="h2">
                {title}
            </Typography>
            <Typography variant="h5">
                {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispacth(decrement(1))} variant="contained" color='error'>Decrement</Button>
                <Button onClick={() => dispacth(increment(1))} variant="contained" color='primary'>Increment</Button>
                <Button onClick={() => dispacth(increment(5))} variant="contained" color='secondary'>Increment by 5</Button>
            </ButtonGroup>
        </>

    )
}