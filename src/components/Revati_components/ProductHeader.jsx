import React, { useState } from 'react';
import { Box, Text ,Input,InputGroup,InputLeftElement ,Select} from '@chakra-ui/react';
import {SearchIcon} from "@chakra-ui/icons"
import { handleSortAlpha, sortMydata } from '../../redux/product/product.action';
import { sortMydatas } from '../../redux/product/product.action';
import { useDispatch } from 'react-redux';


    

  
  
 // console.log(alphasort)


const ProductHeader = ({products,search,setSearch,sort,setSort,popularity,setPopularity}) => {

    const [reset, setReset] = useState(false);
    const dispatch = useDispatch();


  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }

  const handleChange = (e) => {
    const { value } = e.target;
    console.log(value);
    if (value == "reset") {
      setReset((previous) => !previous);
      return;
    }
    dispatch(sortMydata(value));
    dispatch(handleSortAlpha(value))
  };

  console.log(products.data)


  // const handleChanged = (e) => {
  //   const { value } = e.target;
  //    console.log(value);
   
  //    dispatch(sortMydatas(value));
  //   dispatch(handleSortAlpha(value))

    
  // };
  

  return (
    <Box display="flex"  w={{base:"75%",md:"85%",lg:"95%"}}  >

     <Box display={{sm:"flex",base:"none"}} flex={{sm:"0.8",md:"0.8",lg:"0.6"}}  alignItems="center"  >
      <Text fontSize={{sm:12,md:16,lg:19}} mr={{sm:"5px",md:"7px",lg:"10px"}}>Earbuds</Text>
      <Text fontSize={{sm:9,md:12,lg:14}}>({products.data.length} items)</Text>
     </Box>

     <Box flex={{base:"0.9",sm:"0.8",md:"0.7",lg:"0.7"}}  >
      <InputGroup size="md" w={{base:"100%",md:"100%",lg:"90%"}} >
      <InputLeftElement pointerEvents="none"
      children={<SearchIcon color="#999999" boxSize={{base:"11px",md:"13px",lg:"16px"}} />}
      />
      <Input  variant="flushed" size="md" _placeholder={{fontSize:{base:"10px",md:"12px",lg:"14px"}}} focusBorderColor='red.500'  placeholder="Search..."  type="text" value={search} onChange={handleSearch} />
      </InputGroup>
     </Box>

     <Box flex={{base:"0.7",md:"0.8",lg:"0.8"}}  display="flex" justifyContent="flex-end" alignItems="center" >
     <Select  size={{base:"xs",md:"sm",lg:"sm"}} placeholder='Sort by:' width={{base:"100px",sm:"115px",md:"150px",lg:"175px"}}   focusBorderColor="red.500" value={sort} 
      onChange={(e) => handleChange(e)}  id="" name=""
      
      >
            {/* <option value="reset">Sort-By-Price</option> */}
            <option value="high">Price: Low to High</option>
            <option value="low">Price: High to Low</option>
            <option value="a">Alphabet: A to Z</option>
            <option value="z">Alphabet: Z to A</option>
     </Select>

     {/* <Select  size={{base:"xs",md:"sm",lg:"sm"}} placeholder='Sort by:' width={{base:"100px",sm:"115px",md:"150px",lg:"175px"}}   focusBorderColor="red.500" value={sort} 
      onChange={(e) => handleChanged(e)}  id="" name=""
      
      >
            <option value="reset">Sort-By-Price</option>
            <option value="a">Alphabet: A to Z</option>
            <option value="z">Alphabet: Z to A</option>
     </Select> */}


     </Box>

    </Box>
  )
}

export default ProductHeader


