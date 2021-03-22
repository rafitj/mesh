import React from 'react';
import axios from "axios";
import { Network } from './Network';
import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { Resource } from '../types/Resources';

export const Project = () =>{
    const [resources, setResources] = React.useState<Array<Resource>>();
    React.useEffect(()=> {
        axios.get(`http://localhost:8080/project/8ca9fd085b054afea63580a3da6d381c/resources`).then(res => {
        const resources = res.data;
        setResources(resources);
      })
    },[])
    return (
        <Box padding={5} height="100vh">
            <Grid
                h="100%"
                templateRows="repeat(5, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={4}
            >
                <GridItem rowSpan={5} bg="gray.900" rounded={"md"} />
                <GridItem rowSpan={4} colSpan={5}>
                  <Network resources={resources}/>
                </GridItem>
                <GridItem colSpan={5} bg="gray.900" rounded={"md"} />
            </Grid>
        </Box>
    );
}
