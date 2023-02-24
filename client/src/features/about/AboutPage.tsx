import { List, Typography } from "@mui/material";
import Alert from "@mui/material/Alert/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
    const [ValidationError, setValidationError] = useState<string[]>([]);

    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationError(error));
    }
    return (
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get400Errors().catch(error => console.log(error))}>
                    Test 400 Error</Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get401Errors().catch(error => console.log(error))}>
                    Test 401 Error</Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get404Errors().catch(error => console.log(error))}>
                    Test 404 Error</Button>
                <Button variant="contained"
                    onClick={() => agent.TestErrors.get500Errors().catch(error => console.log(error))}>
                    Test 500 Error</Button>
                <Button variant="contained"
                    onClick={getValidationError}>
                    Test Validation Error</Button>
            </ButtonGroup>
            {ValidationError.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {ValidationError.map(error => (
                            <ListItem key={error}>
                                <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )
}