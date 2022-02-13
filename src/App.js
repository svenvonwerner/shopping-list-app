import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import ShoppingItems from './ShoppingItems.js';

export default function App() {
  const [shoppingItems, setShoppingItmes] = useState([]);
  const [hasError, setHasError] = useState(false);

  const { search } = require('fast-fuzzy');

  //search("abc", ["def", "bcd", "cde", "abc"]);

  //search("input der searchbar z.B.: Brot"), [Inhalt unseres Arrays von loadShoppingItems.name]);

  useEffect(() => {
    loadShoppingItems();
  }, []);

  async function loadShoppingItems() {
    try {
      const response = await fetch(
        'https://fetch-me.vercel.app/api/shopping/items'
      );
      if (response.ok) {
        const results = await response.json();
        setShoppingItmes(results.data);
      } else {
        throw new Error('404 - not found');
      }
    } catch (error) {
      console.log(error.message);
      setHasError(true);
    }
  }

  return (
    <AppBody>
      <header>Shopping list</header>
      <main>
        <ShoppingItemsList>
          {shoppingItems.map(({ _id, name }) => (
            <ShoppingItem key={_id}>
              <h2>{name.de}</h2>
            </ShoppingItem>
          ))}
        </ShoppingItemsList>
        <Searchbar />
      </main>
    </AppBody>
  );
}

function Searchbar() {
  return (
    <>
      <label for="search">What do you want to buy?</label>
      <input onChange={handleChange} type="search" placeholder="Search"></input>
    </>
  );
}

function handleChange() {}

const AppBody = styled.div`
  border: 2px solid black;
`;

const ShoppingItemsList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0px;
  padding-left: 0px;
  gap: 0.5rem;
  list-style: none;
`;

const ShoppingItem = styled.li`
  border: 1px solid black;
  border-radius: 15px;
  background-color: orange;
  padding: 5px;
  font-weight: normal;
`;
