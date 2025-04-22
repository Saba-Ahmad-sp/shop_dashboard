import {useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const AddItems = ({data, setData}) => {
  const [itemName, setItemName] = useState('');
  const [stockAmt, setStockAmt] = useState('');

  const handleAddItem = () => {
    if(!itemName) return
    if(!stockAmt) return
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stockAmt,
    };
    setData([...data, newItem]);
    setItemName('');
    setStockAmt('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Item Name to Add"
        placeholderTextColor="#888"
        style={styles.txtInput}
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        placeholder="Enter Item Quantity"
        placeholderTextColor="#888"
        style={styles.txtInput}
        value={stockAmt}
        onChangeText={setStockAmt}
      />
      <Pressable
        style={({pressed}) => [styles.addBtn, pressed && styles.pressed]}
        onPress={handleAddItem}>
        <Text style={styles.addBtnText}>Add</Text>
      </Pressable>

    </View>
  );
};

export default AddItems;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: '2%',
  },
  txtInput: {
    borderWidth: 0.6,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  addBtn: {
    alignItems: 'center',
    backgroundColor: '#7AE2CF',
    borderRadius: 10,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: '#03A791',
  },
  addBtnText: {
    fontWeight: '600',
    fontSize: 15,
  },
  
});
