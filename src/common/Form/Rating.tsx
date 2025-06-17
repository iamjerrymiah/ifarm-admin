import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { PiDotBold } from "react-icons/pi";

const Rating = ({ rating, numReviews, dot }: {rating:number; numReviews?:number; dot?:boolean }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<Icon key={i} as={FaStar} color="#FF8A00" />);
        } else if (rating >= i - 0.5) {
            stars.push(<Icon key={i} as={FaStarHalfAlt} color="#FF8A00" />);
        } else {
            stars.push(<Icon key={i} as={FaRegStar} color="#FF8A00" />);
        }
    }

    return (
        <Flex>
            {stars}
            {numReviews && <Text ml={2} fontSize="sm" color="#475467">{numReviews} Reviews</Text> }
            {dot && <PiDotBold size={20}/>}
        </Flex>
    );
};

export default Rating;