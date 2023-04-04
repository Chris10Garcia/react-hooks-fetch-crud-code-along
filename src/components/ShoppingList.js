import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";


function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  useEffect( () => {
    fetch("http://localhost:4000/items")
    .then(r => r.json())
    .then(data => setItems([...data]))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function deleteItem(itemID){
    const newList = items.filter(item => item.id !== itemID)

    setItems(newList)
  }

  function handleNewItem(objItem){
    setItems([...items, objItem])
  }

  function updateItem(objItem){
    const updateItems = items.map(item => {
        return item.id === objItem.id ? objItem : item
    })

    setItems(updateItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleNewItem={handleNewItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item updateItem = {updateItem} deleteItem={deleteItem} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
