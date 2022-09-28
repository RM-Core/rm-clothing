import { Appearance } from './App';
import Clothe from './Clothe';
import { AppearanceWrapper } from './styles';

type Props = {
  data: Appearance[];
  activeTab: string;
};

const AppearanceContainer: React.FC<Props> = ({ data, activeTab }) => {
  return (
    <AppearanceWrapper>
      {data &&
        data.map((clothe, index) => (
          <Clothe
            key={`${clothe.name}-${index}`}
            minValue={clothe.minValue}
            maxValue={clothe.maxValue}
            name={clothe.name}
            type={activeTab}
            currentValue={clothe.currentValue}
          />
        ))}
    </AppearanceWrapper>
  );
};

export default AppearanceContainer;
