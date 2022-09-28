import { Button } from '@chakra-ui/react';

type Props = {
  camera: string;
  activeCamera: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  setCamera: React.Dispatch<React.SetStateAction<string>>;
};

const CameraButton: React.FC<Props> = ({ camera, activeCamera, Icon, setCamera }) => {
  return (
    <>
      {camera && (
        <Button
          variant="solid"
          style={{
            marginBottom: '10%',
            borderRadius: '7px',
            backgroundColor: camera !== activeCamera ? 'rgba(255, 255, 255, 0.4)' : '#ff4081',
          }}
          onClick={() => setCamera(camera === activeCamera ? 'default' : camera)}
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

export default CameraButton;
