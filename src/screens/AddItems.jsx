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
    setIsEdit(false)
  };

  const handleUpdateItem = () => {

  }

  const handleDeleteItem = (id) => {
    setData(data.filter((item) => item.id !== id))
  }

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
        onPress={() => handleAddItem()}>
        <Text style={styles.addBtnText}> Add Item in Stock </Text>
      </Pressable>

      <View style={{marginTop: 10}}>
        <View style={styles.headingConatiner}>
          <Text style={styles.headingText}>All Items in the Stock</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.itemContainer,
                {backgroundColor: item.stock < 20 ? '#FFCCCC' : '#D7F6BFFF'},
              ]}>
              <Text style={styles.itemText}>{item.name}</Text>

              <View style={{flexDirection: 'row', gap: 20}}>
              <Text style={styles.itemText}>{item.stock}</Text>
                <Pressable >
                <Text style={styles.itemText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => handleDeleteItem(item.id)}>
                <Text style={styles.itemText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{gap: 5}}
        />
      </View>
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
