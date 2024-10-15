import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';

const CustomDatePicker = ({ onDateChange }) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

  const handleDateSelect = () => {
    if (selectedDay && selectedMonth && selectedYear) {
      const date = `${selectedDay}-${selectedMonth}-${selectedYear}`;
      onDateChange(date);
    }
  };

  return (
    <View style={styles.datePickerContainer}>
      {/* Day Picker */}
      <View style={styles.picker}>
        <Text style={styles.pickerLabel}>Day</Text>
        <ScrollView style={styles.pickerScroll}>
          {days.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.pickerItem,
                selectedDay === day.toString() && styles.selectedItem,
              ]}
              onPress={() => setSelectedDay(day.toString())}
            >
              <Text style={styles.pickerText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Month Picker */}
      <View style={styles.picker}>
        <Text style={styles.pickerLabel}>Month</Text>
        <ScrollView style={styles.pickerScroll}>
          {months.map(month => (
            <TouchableOpacity
              key={month}
              style={[
                styles.pickerItem,
                selectedMonth === month.toString() && styles.selectedItem,
              ]}
              onPress={() => setSelectedMonth(month.toString())}
            >
              <Text style={styles.pickerText}>{month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Year Picker */}
      <View style={styles.picker}>
        <Text style={styles.pickerLabel}>Year</Text>
        <ScrollView style={styles.pickerScroll}>
          {years.map(year => (
            <TouchableOpacity
              key={year}
              style={[
                styles.pickerItem,
                selectedYear === year.toString() && styles.selectedItem,
              ]}
              onPress={() => setSelectedYear(year.toString())}
            >
              <Text style={styles.pickerText}>{year}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Button title="Set Date" onPress={handleDateSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  picker: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerScroll: {
    width: '100%',
    maxHeight: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  pickerItem: {
    padding: 10,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  pickerText: {
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: '#ddd',
  },
});

export default CustomDatePicker;
