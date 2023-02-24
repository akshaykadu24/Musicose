import React from 'react';
import {
  Text,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Spacer,
} from "@chakra-ui/react";

import { Box } from '@chakra-ui/react';
import SideBarHeader from './SideBarHeader';


const SideBar = ({slider,setSlider,low,high})=>{
   return(
    <>
    <Box   textAlign="left" fontSize="15px" cursor="pointer" position="sticky" top={75} boxShadow= "rgba(149, 157, 165, 0.2) 0px 8px 24px;" pb="40px" >
      <Flex flexDirection="column"  p="15px 15px">
        <SideBarHeader/>

        <Accordion  defaultIndex={[0]}  allowMultiple mt="17.6px">

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Price
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} >
              <Flex flexDirection="column" >
                <Box p="0px 15px" >
                <RangeSlider colorScheme="red" aria-label={['min', 'max']} defaultValue={[0, 100]} onChange={(val)=>{
                setSlider(val)
              }} >
                   <RangeSliderTrack>
                     <RangeSliderFilledTrack />
                   </RangeSliderTrack>
                   <RangeSliderThumb bgColor="red.200" index={0} />
                   <RangeSliderThumb bgColor="red.200" index={1} />
               </RangeSlider>
                </Box>
              
            <Flex direction="row">
            <Box fontSize={{md:"13px",lg:"15px"}} >Rs. {low?low.toFixed():0}</Box>
            <Spacer/>
            <Box fontSize={{md:"13px",lg:"15px"}} >Rs. {high?high.toFixed():3199}</Box>
            </Flex>

              </Flex>
            </AccordionPanel>
          </AccordionItem>

          
        </Accordion>
      </Flex>
    </Box>
    </>
   )
}

export default SideBar