import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { useVisibility } from '../providers/VisibilityProvider';
import { fetchNui } from '../utils/fetchNui';

type Props = {
  isOpen: boolean;
  setSaveDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const SaveDialog: React.FC<Props> = ({ isOpen, setSaveDialog }) => {
  const [outfitName, setOutfitName] = useState('');
  const [error, setError] = useState('');
  const visibility = useVisibility();
  const ref = useRef(null);

  const saveOutfit = () => {
    if (outfitName === '') {
      return setError('Please enter a name');
    }
    fetchNui('saveOutfit', { outfitName });
    setSaveDialog(false);
    visibility.setVisible(false);
  };
  return (
    <AlertDialog
      leastDestructiveRef={ref}
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      onClose={() => setSaveDialog(false)}
    >
      <AlertDialogOverlay style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <AlertDialogContent style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', width: '300px' }}>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            color="white"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            Save Outfit
          </AlertDialogHeader>
          <AlertDialogBody>
            <Flex justifyContent="center" alignItems="center">
              <Text color={'red.500'}>{error}</Text>
            </Flex>
            <Input
              type="text"
              variant="flushed"
              placeholder="Outfit Name"
              color="white"
              value={outfitName}
              onChange={(e) => setOutfitName(e.target.value)}
            />
            <Flex justifyContent="center" alignItems="center" marginTop="20px">
              <Button variant="solid" colorScheme="whatsapp" onClick={saveOutfit}>
                Save Outfit
              </Button>
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default SaveDialog;
