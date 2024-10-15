import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const TaskEditModal = ({ task, saveTask, closeModal }) => {
  const [subject, setSubject] = useState(task.subject);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [estimatedHours, setEstimatedHours] = useState(task.estimatedHours);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [status, setStatus] = useState(task.status);
  const updateTask = () => {
    const updatedTask = {
      ...task,
      subject,
      description,
      priority,
      estimatedHours,
      dueDate,
      status,
    };
    saveTask(updatedTask);
    closeModal();
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
      <Picker
        selectedValue={priority}
        onValueChange={(itemValue) => setPriority(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="High" value="High" />
        <Picker.Item label="Urgent" value="Urgent" />
      </Picker>
      <TextInput
        placeholder="Estimated Hours"
        value={estimatedHours}
        onChangeText={setEstimatedHours}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Due Date"
        value={dueDate}
        onChangeText={setDueDate}
        style={styles.input}
      />
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="InProgress" value="InProgress" />
        <Picker.Item label="Completed" value="Completed" />
      </Picker>

      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={updateTask} color="#6200ee" />
        <Button title="Cancel" onPress={closeModal} color="#6200ee" />
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
    elevation: 5, // For Android shadow
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
  picker: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default TaskEditModal;
