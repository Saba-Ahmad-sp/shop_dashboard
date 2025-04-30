import {Pressable, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AllItems from './AllItems';
import AddItems from './AddItems';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const [view, setView] = useState(0);
  const [data, setData] = useState([]);

  //load saved data
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@stock_data');
        if (jsonValue != null) {
          setData(JSON.parse(jsonValue));
        } else {
          setData([
            {id: 1, name: 'Wheat', stock: 5, unit: 'kg'},
            {id: 2, name: 'Rice', stock: 15, unit: 'kg'},
            {id: 3, name: 'Corn', stock: 25, unit: 'kg'},
            {id: 4, name: 'Basmati Rice', stock: 50, unit: 'kg'},
            {id: 5, name: 'Pulse', stock: 19, unit: 'kg'},
          ]);
        }
      } catch (e) {
        console.error('Failed to load data', e);
      }
    };
    loadData();
  }, []);
  
  // save data
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('@stock_data', JSON.stringify(data));
      } catch (e) {
        console.error('Failed to sava data', e);
      }
    };
    if (data.length) {
      saveData();
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            view === 0 ? {backgroundColor: '#72C37AFF'} : null,
          ]}
          onPress={() => setView(0)}>
          <Text style={[styles.btnText, view === 0 ? {color: 'white'} : null]}>
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 1 ? {backgroundColor: '#72C37AFF'} : null,
          ]}
          onPress={() => setView(1)}>
          <Text style={[styles.btnText, view === 1 ? {color: 'white'} : null]}>
            Low Stock
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 2 ? {backgroundColor: '#72C37AFF'} : null,
          ]}
          onPress={() => setView(2)}>
          <Text style={[styles.btnText, view === 2 ? {color: 'white'} : null]}>
            Add Items
          </Text>
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        {view === 0 && <AllItems data={data} />}
        {view === 1 && <AllItems data={data.filter(item => item.stock < 20)} />}
        {view === 2 && <AddItems data={data} setData={setData} />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '4%',
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 3.5,
    paddingHorizontal: 10,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: '#72C37AFF',
  },
  btnText: {
    color: '#72C37AFF',
    fontWeight: '400',
    fontSize: 12,
  },
});