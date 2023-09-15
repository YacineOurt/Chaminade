import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import DraggableGrid from 'react-native-draggable-grid';
import Card from "../components/Card";

export default function DraggableGridComp({items, setItems}) {

  const onAddItem = () => {
    const newItem = {
      key: `item${items.length + 1}`,
      label: `Item ${items.length + 1}`,
      size: { width: 100, height: 100 },
    };
    setItems([...items, newItem]);
  };

  const onDeleteItem = (itemKey) => {
    const updatedItems = items.filter((item) => item.key !== itemKey);
    setItems(updatedItems);
  };

  const onDragRelease = (newItems) => {
    setItems(newItems);
  };

  const screenWidth = Dimensions.get('window').width;

  const renderItem = (item) => (
    <View
      style={{
        width: screenWidth / 2.3,
        height: screenWidth / 2.1,
      }}
    >
        <Card style={{maxHeight: "100%", width: "100%"}}>
            <item.component></item.component>
        </Card>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <DraggableGrid
        numColumns={2} // Deux colonnes par ligne
        data={items}
        renderItem={renderItem}
        onDragRelease={onDragRelease}
        style={{ height: '100%', width: '100%' }}
      />
      {/* <TouchableOpacity onPress={onAddItem}>
        <Text>Ajouter un élément</Text>
      </TouchableOpacity> */}
    </View>
  );
}
