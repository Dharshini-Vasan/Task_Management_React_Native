import React, { useState } from 'react';
import { View, Button, Modal, StyleSheet, Text, Platform } from 'react-native'; import TaskList from './TaskList'; 
import TaskModal from './TaskModal';
import TaskSearch from './TaskSearch';
import { DatabaseService, Task } from 'C:/Task - Copy 1/src/Services/DatabaseService';

const TaskListScreen: React.FC = () => 
  { 
    const [tasks, setTasks] = useState<Task[]>([]); 
    const [isModalVisible, setModalVisible] = useState(false); 
    const [editingTask, setEditingTask] = useState<Task | null>(null); 
    const [searchQuery, setSearchQuery] = useState('');

useState(()=>{loadTasks});

const loadTasks = async () => { 
  try { 
    const loadedTasks = await DatabaseService.getTasks(); 
    setTasks(loadedTasks); } 
    catch (error) { 
      console.error('Error loading tasks:', error); 
    } };

const saveTask = async (task: Omit<Task, 'id'>) => {
   try { 
    if (editingTask) { 
      await DatabaseService.updateTask({ ...task, id: editingTask.id }); 
    } 
    else { 
      await DatabaseService.addTask(task); 
    } 
    loadTasks(); 
    setModalVisible(false); 
    setEditingTask(null); 
  } 
  catch (error) { 
    console.error('Error saving task:', error); 
  } };

const editTask = (task: Task) => { 
  setEditingTask(task); 
  setModalVisible(true); 
};

const deleteTask = async (id: number) => { 
  try {
     await DatabaseService.deleteTask(id); 
     loadTasks(); 
    } 
    catch (error) { 
      console.error('Error deleting task:', error); 
    } };

const searchTasks = async (query: string) => {
   setSearchQuery(query);
  if (query) { 
    const filteredTasks = await DatabaseService.searchTasks(query); 
    setTasks(filteredTasks); 
  } 
  else { 
    loadTasks(); 
  } };

return ( 
<View style={styles.container}> 
  <Text style={styles.header}>USER</Text> 
  <View style={styles.row}> 
    <TaskSearch setSearchQuery={searchTasks} /> 
    <Button title="Create Task" onPress={() => { setEditingTask(null); setModalVisible(true); }} color="#6200ee" /> 
  </View> 
  <TaskList tasks={tasks} setTasks={setTasks} onEdit={editTask} onDelete={deleteTask} />

  <Modal visible={isModalVisible} animationType="slide">
    <TaskModal
      setModalVisible={setModalVisible}
      addTask={saveTask}
      task={editingTask}
    />
  </Modal>
</View>
); };

const styles = StyleSheet.create({ 
  container: Platform.select({ 
    web: { 
      minHeight: '100%', 
      overflowY: 'scroll', 
      flex: 1, 
      padding: 20, 
      backgroundColor: '#f5f5f5', 
    }, 
    default: { 
      flex: 1, 
      padding: 20, 
      backgroundColor: '#f5f5f5',
      minHeight: '100%', 
      }, 
    }
    ), 
    header: { 
        fontSize: 24,
        fontWeight: 'bold', 
        marginBottom: 20, 
        textAlign: 'left', 
        color: '#333', 
    }, 
    row: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      marginBottom: 20, 
    }, 
  });

export default TaskListScreen; 