import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Platform } from 'react-native';
import CustomAlertDialog from './CustomAlert';
import { Task } from 'C:/Task - Copy 1/src/Services/DatabaseService';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks, onEdit, onDelete }) => {
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [isEditAlertVisible, setEditAlertVisible] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);

  const showDeleteAlert = (id: number) => {
    setCurrentTaskId(id);
    setDeleteAlertVisible(true);
  };

  const showEditAlert = (id: number) => {
    setCurrentTaskId(id);
    setEditAlertVisible(true);
  };

  const handleDelete = () => {
    if (currentTaskId !== null) {
      onDelete(currentTaskId);
    }
    setDeleteAlertVisible(false);
  };

  const handleEdit = () => {
    const taskToEdit = tasks.find(task => task.id === currentTaskId);
    if (taskToEdit) {
      onEdit(taskToEdit);
    }
    setEditAlertVisible(false);
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View key={item.id} style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.subject}</Text>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={[styles.cell, { color: getPriorityColor(item.priority) }]}>{item.priority}</Text>
      <Text style={styles.cell}>{item.status}</Text>
      <View style={styles.actions}>
        <Button title="Edit" onPress={() => showEditAlert(item.id)} color="#6200ee" />
        <Button title="Delete" onPress={() => showDeleteAlert(item.id)} color="#dc3545" />
      </View>
    </View>
  );

  return (
    <View style={styles.table}>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Task No</Text>
        <Text style={styles.headerCell}>Task Subject</Text>
        <Text style={styles.headerCell}>Description</Text>
        <Text style={styles.headerCell}>Priority</Text>
        <Text style={styles.headerCell}>Status</Text>
        <Text style={styles.headerCell}>Actions</Text>
      </View>
      {tasks.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Task Found</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.scrollContainer}
        />
      )}

      <CustomAlertDialog
        visible={isDeleteAlertVisible}
        message="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteAlertVisible(false)}
      />
      <CustomAlertDialog
        visible={isEditAlertVisible}
        message="Are you sure you want to edit this task?"
        onConfirm={handleEdit}
        onCancel={() => setEditAlertVisible(false)}
      />
    </View>
  );
};

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'Low':
      return 'green';
    case 'Normal':
      return 'blue';
    case 'High':
      return 'orange';
    case 'Urgent':
      return 'red';
    default:
      return 'black';
  }
};

const styles = StyleSheet.create({
  table: {
    marginTop: 20,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#6200ee',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderColor: '#dee2e6',
  },
  cell: {
    flex: 1,
    textAlign: 'left',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 2,
    alignItems: 'flex-start',
  },
  scrollContainer: {
    ...(Platform.OS === 'web'
      ? { maxHeight: '90%', overflowY: 'auto' as const }
      : { flexGrow: 1, paddingBottom: 10 }),
  },
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default TaskList;
