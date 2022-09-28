import styled from 'styled-components';
import bg from '../bg.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Creator = styled.div`
  width: 500px;
  height: 800px;
  max-width: 500px;
  max-height: 800px;
  margin-right: 2%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: block;
  position: relative;
`;

export const AppearanceButtons = styled.div`
  display: flex;
  position: absolute;
  right: 100%;
  top: 10%;
  color: black;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  margin-top: 5%;
  justify-content: center;
  font-size: 30px;
  color: white;
`;

export const CameraButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-top: 10%;
`;

export const ClotheContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 73%;
  margin-top: 2%;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const AppearanceWrapper = styled.div`
  width: 91%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;
