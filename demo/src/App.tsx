import styled from 'styled-components';
import Details from './components/Details';

const Container = styled.div`
  
  display : flex;
  justify-content :center;
  border: 2px dotted black;
  border-radius: 10px;
  width: 70%;
  margin: auto;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
  background-image: linear-gradient(to bottom, white, #e7e7dc);
`

function App() {
  return (
    <Container>
      <h1>Weather App</h1>
      <Details />
    </Container>
  );
}

export default App;
