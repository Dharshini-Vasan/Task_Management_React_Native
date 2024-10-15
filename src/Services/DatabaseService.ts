import * as SQLite from 'expo-sqlite';
let db;

export interface Task {
  id: number;
  subject: string;
  description: string;
  priority: string;
  estimatedHours: string;
  dueDate: string;
  status: string;
}

export const DatabaseService = {
  initDatabase: (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
     db = await SQLite.openDatabaseAsync("taskManager");
     const result=await db.execAsync(`
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, subject TEXT, description TEXT, priority TEXT, estimatedHours TEXT, dueDate TEXT, status TEXT);`);
      console.log('db status',result);
      resolve();
    });
  },

  getTasks: async (): Promise<Task[]> => {
    try {
      const result = await db.getAllAsync('SELECT * FROM tasks');
      console.log('Stored tasks:',result);
      return result as Task[];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  addTask: async (task: Omit<Task, 'id'>): Promise<number> => {
    try {
      const result = await db.runAsync(
        'INSERT INTO tasks (subject, description, priority, estimatedHours, dueDate, status) VALUES (?, ?, ?, ?, ?, ?)', 
        [task.subject, task.description, task.priority, task.estimatedHours, task.dueDate, task.status]
      );
      console.log('Inserted task:',result);
      const tasks = await db.getAllAsync('SELECT * FROM tasks ORDER BY id ASC');
      let newId = 1;
      for (const existingTask of tasks) {
      await db.runAsync('UPDATE tasks SET id = ? WHERE id = ?', [newId, existingTask.id]);
      newId++;
    }
    console.log('Tasks reordered with new task at id = 1');
      return result.firstInsertRowId;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  updateTask: async (task: Task): Promise<void> => {
    try {
      await db.runAsync(
        'UPDATE tasks SET subject = ?, description = ?, priority = ?, estimatedHours = ?, dueDate = ?, status = ? WHERE id = ?', 
        [task.subject, task.description, task.priority, task.estimatedHours, task.dueDate, task.status, task.id]
      );
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id: number): Promise<void> => {
    try {
      await db.runAsync('DELETE FROM tasks WHERE id = ?', [id]);
      const tasks = await db.getAllAsync('SELECT * FROM tasks ORDER BY id ASC');
      let newId = 1;
      for (const task of tasks) {
        await db.runAsync('UPDATE tasks SET id = ? WHERE id = ?', [newId, task.id]);
        newId++;
      }
      console.log('Tasks reordered after deletion');
    } catch (error) {
      console.error('Error deleting and reordering tasks:', error);
      throw error;
    }
  },

  searchTasks: async (query: string): Promise<Task[]> => {
    try {
      const result = await db.getAllAsync('SELECT * FROM tasks WHERE subject LIKE ?', [`%${query}%`]);
      console.log('Searched task',result);
      return result as Task[];
    } catch (error) {
      console.error('Error searching tasks:', error);
      throw error;
    }
  }
};