import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import {AiFillHeart} from "react-icons/ai";
import { StarIcon } from "@chakra-ui/icons";


const DetailHeader = ({product}) => {
  return (
    <Box>
     <Box display="flex"  >
       <Box flex="1"   display="flex" alignItems="center" 
            mt={{xl:"30px",lg:"30px"}} >
          <Heading size={{md:"md",base:"xs"}} >{product.title} </Heading>
       </Box>
       <Box flex={{xl:"0.3",lg:"0",md:"0.2",base:"0"}} ></Box>

       </Box>

       <Box display="flex"   alignItems="center" p="5px 0px"  mt={{xl:"20px",lg:"20px"}} >
                  {Array(5)
                    .fill("")
                    .map((e, i) => (
                      <StarIcon
                        mr="2px"
                        boxSize={4}
                        key={i}
                        color={
                          i < Math.floor(product.rating) ? "yellow.400" : "gray.300"
                        }
                      />
                    ))}
                  <Box as="span"  ml="2" color="#9FAECA" fontSize="md">
                    ({product.rating})
                  </Box>
        </Box>
    </Box>
  )
}

export default DetailHeader