import React from 'react'
import {
    // Box,
    Button,
    // HStack,
    Heading,
    Image,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import "./home.css"
import { Link } from 'react-router-dom';
import vg from '../../assets/images/bg.png';
// import { CgGoogle, CgYoutube } from 'react-icons/cg';
// import { SiCoursera, SiUdemy } from 'react-icons/si';
// import { DiAws } from 'react-icons/di';




const Home = () => {
    return <section className="home">
        <div className="container">
            <Stack
                direction={['column', 'row']}       // iska matlab h phone hoga to coloum ho jagayegi OtherWise row ho jayegi 
                height="100%"
                justifyContent={['center', 'space-between']}   // iska matlab h phone hoga to center ho jagayegi OtherWise space-between ho jayegi i.e. phone/center otherwise/space-between 
                alignItems="center"
                spacing={['16', '18', '20', '56']}             // phone-16 otherwise-56    documentation 1-4px      ////////    div.container ke andar wale Stack me spacing={[ '16' , '56' ]} h, change that to this   spacing={['16', '18', '20', '56']}
            >

                <VStack                     //  VStack(Vertical Stack)  by default direction coloum h aur coloum hi rehegi , change nhi kar sakte unlike Stack   &&&  V-Stack m alignitem By default Center hota h
                    width={'full'}
                    alignItems={['center', 'flex-end']}   // jab phone hoga to center otherwise flex-end
                    spacing="8"
                >
                    <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} />
                    <Text
                        fontSize={'2xl'}
                        fontFamily="cursive"
                        textAlign={['center', 'left']}   // jab phone hoga to center otherwise left
                        children="Find Valuable Content At Reasonable Price"
                    />
                    <Link to="/courses">
                        <Button size={'lg'} colorScheme="yellow">
                            Explore Now
                        </Button>
                    </Link>
                </VStack>

                <Image
                    className="vector-graphics"
                    boxSize={'md'}
                    src={vg}
                    objectFit="contain"
                />

            </Stack>
        </div>


        
   

    </section>
}

export default Home
