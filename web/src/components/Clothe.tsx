import { Appearance } from './App';
import { useState, useCallback } from 'react';
import { fetchNui } from '../utils/fetchNui';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { GiClothes } from 'react-icons/gi';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

const Clothe: React.FC<Appearance> = ({ minValue, maxValue, name, currentValue, type }) => {
  const [value, setValue] = useState(currentValue);

  const handleChange = useCallback((value) => {
    if (value > maxValue) {
      setValue(minValue);
    } else if (value < minValue) {
      setValue(maxValue);
    } else {
      setValue(value);
    }
    fetchNui('changeValue', { value, name, type });
  }, []);

  const capitalizeLetters = (str: string) => {
    let i,
      frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  };

  return (
    <Accordion
      allowToggle
      style={{
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        color: 'white',
        borderRadius: '15px',
        marginBottom: '5%',
      }}
    >
      <AccordionItem
        style={{
          border: 'none',
        }}
      >
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="center">
              {capitalizeLetters(name)} - {value}/{maxValue}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <IconButton
              bg={'gray.600'}
              style={{
                borderRadius: '10px',
                fontSize: '25px',
              }}
              color={'twitter.300'}
              _hover={{
                bg: 'gray.700',
              }}
              _active={{
                bg: 'gray.500',
              }}
              aria-label="left-icon"
              icon={<BsFillArrowLeftCircleFill />}
              onClick={() => handleChange(value - 1)}
            />
            <IconButton
              bg={'gray.600'}
              style={{
                borderRadius: '10px',
                fontSize: '25px',
              }}
              color={'twitter.300'}
              _hover={{
                bg: 'gray.700',
              }}
              _active={{
                bg: 'gray.500',
              }}
              aria-label="right-icon"
              onClick={() => handleChange(value + 1)}
              icon={<BsFillArrowRightCircleFill />}
            />
          </Box>
          <Box>
            <Slider
              aria-label="clothe-slider"
              onChange={handleChange}
              min={minValue}
              max={maxValue}
              value={value}
            >
              <SliderTrack bg="red.100">
                <SliderFilledTrack bg="tomato" />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Box color="tomato" as={GiClothes} />
              </SliderThumb>
            </Slider>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Clothe;
