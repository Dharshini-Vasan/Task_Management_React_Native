import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TaskSearch = ({ setSearchQuery }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search by name"
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 10,
    
  },
  searchInput: {
    padding: 10,
    flexGrow:4,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
});

export default TaskSearch;
