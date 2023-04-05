import { Box, HStack, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Ratings } from './Ratings'
import  "./product.css"


// single product card

export const Products = ({key, props }) => {
    const { product_item_meta__title, priority, category, price2, price, rating__stars, product_item__primary_image
    } = props



    // let shortTitle = title.split("")?.filter((el, i) => i <= 27);
    

    return (

        <Box className='product'>

            <Box className='prod'>
                <Ratings rating={Number(rating__stars)}/>
                <Image src={product_item__primary_image} alt="demo" />
            </Box>

            <Stack className='prodStack'>

                <Box>
                    <Text className='prodTitle'>{product_item_meta__title}</Text>
                    {/* <Text className='prodLocation'>{priority}</Text> */}
                    
                </Box>

                <Box>
                    <hr></hr>

                    <HStack className='prodHStack'>

                        <Stack className='prodStack2' >
                            <Text className='prodText2'>₹{Number(price2)}</Text>
                            <Text className='prodText3'>₹{Number(price)}</Text>
                        </Stack>

                        <Box className='prodBox1'>
                            {Math.floor((Number(price2) - Number(price)) * 100 / Number(price2))}% OFF
                        </Box>

                    </HStack>

                </Box>

            </Stack>

        </Box>
    )
}
