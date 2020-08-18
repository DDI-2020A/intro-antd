import React from 'react';

/**
 * Created by chalosalvador on 8/18/20
 */

const UserTaskForm = ( { onAddTask } ) => (
  <div>
    <label htmlFor='task'>Tarea</label>
    <input type='text' id='task' />

    <button onClick={ onAddTask }>Agregar tarea</button>
  </div>
);

export default UserTaskForm;
