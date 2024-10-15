import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CustomDropdown = ({ options, selectedValue, onValueChange, placeholder }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleSelect = (value) => {
    onValueChange(value);
    setDropdownOpen(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.dropdownText}>
          {selectedValue || placeholder}
        </Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownListContainer}>
          <ScrollView style={styles.dropdownList}>
            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    position: 'relative',
    zIndex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  dropdownText: {
    fontSize: 16,
  },
  dropdownListContainer: {
    position: 'absolute', 
    top: '100%', 
    left: 0,
    right: 0,
    zIndex: 1000, 
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
    maxHeight: 120,
    overflow: 'hidden',
  },
  dropdownList: {
    maxHeight: 200,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 14,
  },
});

export default CustomDropdown;
