import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

const containerStyle = {
  width: '300px',
  margin: '0 auto',
  border: '1px solid #ccc',
  borderRadius: '16px',
  backgroundColor: 'lightpink',
  marginTop: '10px',
  padding: '30px',
  
};
const appStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'black',
};

const itemStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  marginBottom: '8px',
  backgroundColor: '#f9f9f9',
  cursor: 'grab',
  textAlign: 'center'
};

const initialItems = [
  { id: 1, text: 'Item 1' },
  { id: 2, text: 'Item 2' },
  { id: 3, text: 'Item 3' },
  { id: 4, text: 'Item 4' },
  { id: 5, text: 'Item 5' },
  { id: 6, text: 'Item 6' },
];

const ItemType = 'LIST_ITEM';

const ListItem = ({ item, index, moveItem }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} style={itemStyle}>
      {item.text}
    </div>
  );
};

const SortableList = () => {
  const [items, setItems] = useState(initialItems);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
  };

  return (
    <div style={containerStyle}>
      {items.map((item, index) => (
        <ListItem key={item.id} item={item} index={index} moveItem={moveItem} />
      ))}
    </div>
  );
};

const App = () => {
  return (
    <div style={appStyle}>
    <DndProvider backend={HTML5Backend} >
      <SortableList />
    </DndProvider>
    </div>
  );
};

export default App;
