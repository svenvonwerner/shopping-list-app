import styled from 'styled-components';
import ShoppingItems from './ShoppingItems.js';
import Searchbar from './Searchbar.js';

export default function App() {
  return (
    <AppBody>
      <header>Shopping list</header>
      <main>
        <ShoppingItems />
        <Searchbar />
      </main>
    </AppBody>
  );
}
const AppBody = styled.div`
  border: 2px solid black;
`;
