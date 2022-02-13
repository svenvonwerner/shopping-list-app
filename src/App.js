import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import ShoppingItems from './ShoppingItems.js';

export default function App() {
  const [shoppingItems, setShoppingItems] = useState([]);
  const [hasError, setHasError] = useState(false);

  //search('abc', ['def', 'bcd', 'cde', 'abc']); //returns ["abc", "bcd"]

  // search("input der searchbar z.B.: Brot"), [Inhalt unseres Arrays von loadShoppingItems.name]);

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
        setShoppingItems(results.data);
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
          {/* {console.log(shoppingItems)} */}
          {shoppingItems.map(({ _id, name }) => (
            <ShoppingItem key={_id}>
              <h2>{name.de}</h2>
            </ShoppingItem>
          ))}
        </ShoppingItemsList>
        <Searchbar shoppingItems={shoppingItems} />
      </main>
    </AppBody>
  );
}

function Searchbar({ shoppingItems }) {
  const { search } = require('fast-fuzzy');
  const [userInput, setUserInput] = useState('');

  filteredItems();
  function handleChange(event) {
    setUserInput(event.target.value);
  }

  function filteredItems() {
    const fuzziedItems = search(
      userInput,
      shoppingItems.map((item) => item.name.de)
    );
    return fuzziedItems;
  }

  return (
    <>
      <label htmlFor="search">What do you want to buy?</label>

      <input
        onChange={handleChange}
        value={userInput}
        type="search"
        placeholder="Search"
      ></input>

      {/* <output>
        {console.log(
          search(
            userInput,
            shoppingItems.map((item) => item.name.de)
          )
        )}
      </output> */}
      <SearchItemsList>
        {search(
          userInput,
          shoppingItems.map((item) => item.name.de)
        )}
      </SearchItemsList>
    </>
  );
}

// HandleChange löst Fuzzy aus
// Keyselektor erforderlich?
//

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

const SearchItemsList = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 0px;
  padding-left: 0px;
  gap: 0.5rem;
  list-style: none;
`;
