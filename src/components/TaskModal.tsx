import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text,Platform } from 'react-native';
import CustomDropdown from './CustomDropdown';
const TaskModal = ({ setModalVisible, addTask, task }) => {
  const [subject, setSubject] = useState(task?.subject || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'Normal');
  const [estimatedHours, setEstimatedHours] = useState(task?.estimatedHours || '');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState(task?.status || 'InProgress');
  const [error, setError] = useState<string | null>(null); 
  
  const priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Normal', value: 'Normal' },
    { label: 'High', value: 'High' },
    { label: 'Urgent', value: 'Urgent' },
  ];
  const statusOptions = [
    { label: 'InProgress', value: 'InProgress' },
    { label: 'Completed', value: 'Completed' },
  ];
  const handleSave = () => 
  {
    if (!estimatedHours) 
    {
      setError("Please enter a valid number of hours.");
      return;
    }
    const newTask = 
    {
      id: task ? task.id : Date.now(), 
      subject,
      description,
      priority,
      estimatedHours,
      dueDate,
      status,
    };
    addTask(newTask);
    setModalVisible(false);
  };
  return (
    <View style={styles.modalContainer}>
      <TextInput 
        placeholder="Task Subject"
        value={subject}
        onChangeText={setSubject}
        style={styles.input}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <CustomDropdown
        options={priorityOptions}
        selectedValue={priority}
        onValueChange={setPriority}
        placeholder="Select Priority"
      />
      <TextInput
        placeholder="Estimated Hours"
        value={estimatedHours}
        onChangeText={(text) => setEstimatedHours(text.replace(/[^0-9]/g, ''))}
        style={styles.input}
        keyboardType="numeric"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    {/* Web-friendly date picker */}
    <Text>Due Date</Text>
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.dateInput}
        />
      ) : (
        // You can keep a mobile-friendly date picker if needed
        <TextInput
          placeholder="DD-MM-YYYY"
          value={dueDate}
          onChangeText={setDueDate}
          style={styles.input}
          
        />
      )}
      <CustomDropdown
        options={statusOptions}
        selectedValue={status}
        onValueChange={setStatus}
        placeholder="Select Status"
      />
      <View style={styles.buttonContainer}>
        <Button title={task ? "Update Task" : "Create Task"} onPress={handleSave} color="#6200ee" />
        <Button title="Cancel" onPress={() => setModalVisible(false)} color="#6200ee" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dateInput: {
    marginBottom: 10,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  }
});

export default TaskModal;
