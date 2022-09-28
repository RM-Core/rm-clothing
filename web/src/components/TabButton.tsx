import { Button } from '@chakra-ui/react';
import React from 'react';

type Props = {
  tab: string;
  activeTab: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const TabButton: React.FC<Props> = ({ tab, activeTab, Icon, setActiveTab }) => {
  return (
    <>
      {tab && (
        <Button
          variant="solid"
          style={{
            marginBottom: '20%',
            backgroundColor: tab !== activeTab ? '' : '#ff4081',
            borderRadius: '7px',
          }}
          onClick={() => setActiveTab(tab)}
        >
          <Icon
            style={{
              filter: 'drop-shadow(0 0 2px #000)',
              width: '24px',
              height: '24px',
              color: 'white',
            }}
          />
        </Button>
      )}
    </>
  );
};

export default TabButton;
