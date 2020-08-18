import React, { useState } from 'react';
import '../styles/user-task-list.css';

/**
 * Created by chalosalvador on 8/18/20
 */


const UserTaskList = ( { list, onCompleteTask, onDeleteTask } ) => {

  const [ darkMode, setDarkMode ] = useState( false );

  return (
    <div className={ darkMode
      ? 'dark-mode'
      : '' }>
      <button onClick={ () => setDarkMode( ( prevDarkmode ) => !prevDarkmode ) }>Cambiar a modo oscuro</button>
      <h1>Lista de tareas ({ list.length } en total)</h1>
      <table>
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
          <th>Eliminar</th>
        </tr>
        </thead>
        <tbody>
        {
          list.map( ( task, index ) => (
              <tr key={ index }>
                <td>{ task.title }</td>
                <td className={ task.completed
                  ? 'task-completed'
                  : 'task-pending' }>
                  {
                    task.completed
                      ? 'Completada'
                      : <button onClick={ () => onCompleteTask( index ) }>Marcar como completada</button>
                  }
                </td>
                <td>
                  <button onClick={ () => onDeleteTask( index ) }>Eliminar</button>
                </td>
              </tr>
            )
          )
        }
        </tbody>
      </table>
    </div>
  );
};

export default UserTaskList;
