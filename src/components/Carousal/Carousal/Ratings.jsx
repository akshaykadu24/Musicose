import { Box, HStack, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react';
import "./rating.css"
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';


// rating part


export const Ratings = ({ rating }) => {

    let pointRating = rating === 5 || 4 || 3 || 2 || 1 || 0 ? rating + ".0".toString() : rating.toString();

    let [round, decimal] = pointRating?.split(".").map(Number);
    let fullStars = new Array(5).fill(0)
    let Stared = new Array(round).fill(0)

    const findEmptyStars = (r, d) => {
        if (r !== 0 && d === 0) {
            return (5 - r)
        } else if (r !== 0 && d !== 0) {
            return (4 - r)
        } else if (r === 0) {
            return 5
        }
    }
    const foundEmptyStars = findEmptyStars(round, decimal);

    let emptyStars = new Array(foundEmptyStars).fill(0)



    return (
        <HStack className='rating1'>

            {/* <Text className='rating2'>hb</Text> */}

            {/* <Text className='rating3'>|</Text> */}

            <HStack className='rating4'>
                {
                    rating === 5 ? (
                        fullStars?.map((el, i) => <Text className='rating5' key={i}><TiStarFullOutline /></Text>)
                    ) : (
                        Stared?.map((el, i) => <Text className='rating5'  key={i}><TiStarFullOutline /></Text>)
                    )
                }

                {
                    rating !== 5 && decimal && <Text className='rating5' ><TiStarHalfOutline /></Text>
                }

                {
                    rating !== 5 && emptyStars && emptyStars?.map((el, i) => <Text className='rating5'  key={i}><TiStarOutline /></Text>)
                }
            </HStack>

            <Text className='rating6'>{rating}</Text>

        </HStack>
    )
}