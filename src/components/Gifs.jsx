import { Box, Image, SimpleGrid, Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Gifs = () => {
    let imgs = ["https://images-eu.ssl-images-amazon.com/images/G/31/img21/Audio/Boat/450pro/4_05.gif","https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD_191_Gf_800x800_px.gif?v=1654758949","https://cdn.shopify.com/s/files/1/0057/8938/4802/files/2_3d583989-3aab-4622-91cd-f256b3007d7b.gif?v=1658570608"]
    let link = ["/bluetoothHeadphone","/earbuds","/bluetoothHeadphone"]
  return (
    <Box width={"100%"}>

            <Box>
        <SimpleGrid columns={[1,1,3,3]} gap={"10px"} margin={"auto"}>
                {
                    imgs.map((el,i)=>{
                        return(
                            <Link to={link[i]}>
                            <Image  height={["230px","350px","550px"]} src={el} alt="gifs" margin={"auto"}></Image>
                            </Link>
                        )
                    })
                }
        </SimpleGrid>
            </Box>
        
    </Box>
  )
}

export default Gifs