import Realm from 'realm';

export interface Task {
  id: number;
  title: string;
  completed: number;
}

class TaskSchema extends Realm.Object<TaskSchema> {
  id!: number;
  title!: string;
  completed!: number;

  static schema: Realm.ObjectSchema = {
    name: 'Task',
    primaryKey: 'id',
    properties: {
      id: 'int',
      title: 'string',
      completed: {
        type: 'int',
        default: 0,
      },
    },
  };
}

let realm: Realm;

export const initDB = async () => {
  if (realm && !realm.isClosed) {
    return realm;
  }

  realm = await Realm.open({
    schema: [TaskSchema],
    schemaVersion: 1,
  });

  return realm;
};

export const getTasks = async (): Promise<Task[]> => {
  await initDB();

  const tasks = realm.objects<TaskSchema>('Task');

  return [...tasks]
    .sort((a, b) => b.id - a.id)
    .map(item => ({
      id: item.id,
      title: item.title,
      completed: item.completed,
    }));
};

export const addTask = async (title: string): Promise<number> => {
  await initDB();

  const tasks = realm.objects<TaskSchema>('Task');

  const nextId =
    tasks.length > 0
      ? Math.max(...tasks.map(t => t.id)) + 1
      : 1;

  realm.write(() => {
    realm.create('Task', {
      id: nextId,
      title,
      completed: 0,
    });
  });

  return nextId;
};

export const updateTask = async (
  id: number,
  title: string,
): Promise<void> => {
  await initDB();

  realm.write(() => {
    const task = realm.objectForPrimaryKey<TaskSchema>('Task', id);

    if (task) {
      task.title = title;
    }
  });
};

export const toggleTask = async (
  id: number,
  completed: number,
): Promise<void> => {
  await initDB();

  realm.write(() => {
    const task = realm.objectForPrimaryKey<TaskSchema>('Task', id);

    if (task) {
      task.completed = completed;
    }
  });
};

export const deleteTask = async (id: number): Promise<void> => {
  await initDB();

  realm.write(() => {
    const task = realm.objectForPrimaryKey<TaskSchema>('Task', id);

    if (task) {
      realm.delete(task);
    }
  });
};

export const closeDB = () => {
  if (realm && !realm.isClosed) {
    realm.close();
  }
};