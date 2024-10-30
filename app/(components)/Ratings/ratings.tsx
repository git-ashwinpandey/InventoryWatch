import { StarFilledIcon } from '@radix-ui/react-icons';
import React from 'react'

type RatingProps = {
    rating: number;
}

const Ratings = ({rating}: RatingProps) => {
    return [1, 2, 3, 4, 5].map((index) => (
        <StarFilledIcon key={index} color={index <= rating ? "#FFC107" : "#E4E5E9"} className='w-4 h-4'/>
    ))
}

export default Ratings