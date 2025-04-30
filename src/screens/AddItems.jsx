import {useState} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const AddItems = ({data, setData}) => {
  const [itemName, setItemName] = useState('');
  const [stockAmt, setStockAmt] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const handleAddItem = () => {
    if (!itemName.trim()) {
      alert("Item name is required.");
      return;
    }
  
    if (!/^[A-Za-z\s]+$/.test(itemName)) {
      alert("Item name must only contain letters.");
      return;
    }
  
    if (!stockAmt.trim()) {
      alert("Stock amount is required.");
      return;
    }
  
    if (isNaN(stockAmt)) {
      alert("Stock amount must be a number.");
      return;
    }
  
    const newItem = {
      id: Date.now(),
      name: itemName.trim(),
      stock: Number(stockAmt),
    };
  
    setData([...data, newItem]);
    setItemName('');
    setStockAmt('');
    setIsEdit(false);
  };
  
  const handleUpdateItem = () => {
    if (!itemName.trim()) {
      alert("Item name is required.");
      return;
    }
  
    if (!/^[A-Za-z\s]+$/.test(itemName)) {
      alert("Item name must only contain letters.");
      return;
    }
  
    if (!stockAmt.trim()) {
      alert("Stock amount is required.");
      return;
    }
  
    if (isNaN(stockAmt)) {
      alert("Stock amount must be a number.");
      return;
    }
  
    setData(
      data.map(item =>
        item.id === editItemId
          ? { ...item, name: itemName.trim(), stock: Number(stockAmt) }
          : item
      )
    );
    setItemName('');
    setStockAmt('');
    setIsEdit(false);
  };
  
  const handleDeleteItem = id => {
    setData(data.filter(item => item.id !== id));
  };
  
  const handleEditItem = item => {
    setIsEdit(true);
    setItemName(item.name);
    setStockAmt(item.stock.toString());
    setEditItemId(item.id);
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inputSection}>
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
          keyboardType="numeric"
        />
        <Pressable
          style={({pressed}) => [styles.addBtn, pressed && styles.pressed]}
          onPress={() => (isEdit ? handleUpdateItem() : handleAddItem())}>
          <Text style={styles.addBtnText}>
            {isEdit ? 'Edit Item in Stock' : 'Add Item in Stock'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.listSection}>
        <View style={styles.headingConatiner}>
          <Text style={styles.headingText}>All Items in the Stock</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: item.stock < 20 ? '#FFCCCC' : '#D7F6BFFF'},
              ]}>
              <Text style={styles.itemText}>{item.name}</Text>

              <View style={{flexDirection: 'row', gap: 20}}>
                <Text style={styles.itemText}>{item.stock}</Text>
                <Pressable onPress={() => handleEditItem(item)}>
                  <Text style={styles.itemText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => handleDeleteItem(item.id)}>
                  <Text style={styles.itemText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{gap: 6, paddingBottom: 60}}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  inputSection: {
    paddingVertical: '4%',
    gap: 10,
  },
  listSection: {
    flex: 1,
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
  },
  pressed: {
    backgroundColor: '#03A791',
  },
  addBtnText: {
    fontWeight: '600',
    fontSize: 15,
  },
  headingConatiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  headingText: {
    fontWeight: '600',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemText: {
    fontWeight: '500',
    fontSize: 14,
  },
});