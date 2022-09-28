import { useNuiEvent } from '../hooks/useNuiEvent';
import { debugData } from '../utils/debugData';
import { useState, useEffect } from 'react';
import { FaChild, FaHatCowboy, FaPlusSquare, FaSave, FaShoePrints } from 'react-icons/fa';
import { GiBeard, GiClothes } from 'react-icons/gi';
import {
  AppearanceButtons,
  CameraButtons,
  ClotheContainer,
  Container,
  Creator,
  Header,
} from './styles';
import TabButton from './TabButton';
import { Button, Text } from '@chakra-ui/react';
import CameraButton from './CameraButton';
import AppearanceContainer from './AppearanceContainer';
import SaveDialog from './SaveDialog';
import { fetchNui } from '../utils/fetchNui';

debugData([
  {
    action: 'openClothing',
    data: {
      tabs: ['clothes', 'heads'],
      clothes: [
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
        {
          name: 'Shirt',
          type: 'clothes',
          minValue: 0,
          maxValue: 100,
          currentValue: 0,
        },
      ],
    },
  },
]);

export type Appearance = {
  name: string;
  type: string;
  minValue: number;
  maxValue: number;
  currentValue: number;
};

type CreatorProps = {
  tabs: string[];
  clothes: Appearance[];
  skins: Appearance[];
};
const App = () => {
  const [tabs, setTabs] = useState<string[]>([]);
  const [clothes, setClothes] = useState<Appearance[]>([]);
  const [skins, setSkins] = useState<Appearance[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');
  const [camera, setCamera] = useState<string>('default');
  const [saveDialog, setSaveDialog] = useState<boolean>(false);

  useNuiEvent('openClothing', (data: CreatorProps) => {
    setTabs(data.tabs);
    setClothes(data.clothes);
    setSkins(data.skins);
    setActiveTab(data.tabs[0]);
  });

  const handleSave = () => {
    setSaveDialog(true);
  };

  useEffect(() => {
    fetchNui('gotoCamera', { camera });
  }, [camera]);

  return (
    <>
      {tabs.length > 0 && (
        <Container>
          <Creator>
            <AppearanceButtons>
              <TabButton
                Icon={GiBeard}
                tab={'skins'}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <TabButton
                Icon={GiClothes}
                tab={'clothes'}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              <Button
                style={{
                  borderRadius: '7px',
                }}
                bg={'gray.900'}
                variant="solid"
                _hover={{
                  bg: 'gray.700',
                }}
                _active={{
                  bg: 'gray.700',
                }}
                onClick={handleSave}
              >
                <FaSave
                  style={{
                    fontSize: '20px',
                    filter: 'drop-shadow(0 0 2px #000)',
                    width: '24px',
                    height: '24px',
                    color: 'white',
                  }}
                />
              </Button>
            </AppearanceButtons>
            <Header>Character Customization</Header>
            <CameraButtons>
              <CameraButton
                camera={'head'}
                activeCamera={camera}
                setCamera={setCamera}
                Icon={FaHatCowboy}
              />
              <CameraButton
                camera={'chest'}
                activeCamera={camera}
                setCamera={setCamera}
                Icon={FaChild}
              />
              <CameraButton
                camera={'boots'}
                activeCamera={camera}
                setCamera={setCamera}
                Icon={FaShoePrints}
              />
            </CameraButtons>
            <ClotheContainer>
              {activeTab == 'clothes' && (
                <AppearanceContainer data={clothes} activeTab={activeTab} />
              )}
              {activeTab == 'skins' && <AppearanceContainer data={skins} activeTab={activeTab} />}
            </ClotheContainer>
          </Creator>
        </Container>
      )}
      {saveDialog && <SaveDialog isOpen={saveDialog} setSaveDialog={setSaveDialog} />}
    </>
  );
};

export default App;
