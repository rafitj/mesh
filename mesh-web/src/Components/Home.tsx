import React from 'react';
import { Container, Button, Heading, Text, Center } from "@chakra-ui/react"
import { Space } from 'antd';
import { Link } from 'react-router-dom';

export const Home = () =>{
    return (
        <Container centerContent height={'100vh'}>
            <Center h={'100vh'}>
            <Space size={'middle'} direction="vertical" style={{textAlign: "center"}}>
                <Text>Welcome to</Text>
                <Heading>Mesh</Heading>
                <Link to="/projects">
                    <Button>Start</Button>
                </Link>
            </Space>
            </Center>
        </Container>
    );
}
