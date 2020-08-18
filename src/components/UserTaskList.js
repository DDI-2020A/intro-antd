import React, { useState } from 'react';
import '../styles/user-task-list.css';
import { Modal, Empty, Button, Table, Tag } from 'antd';
import { DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import UserTaskForm from './UserTaskForm';

/**
 * Created by chalosalvador on 8/18/20
 */


const UserTaskList = ( { list, onCompleteTask, onDeleteTask, isLoading, onAddTask } ) => {

  const [ darkMode, setDarkMode ] = useState( false );
  const [ createTaskModalVisible, setCreateTaskModalVisible ] = useState( false );

  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: ( completed, task ) => {
        console.log( 'completed', completed );
        const color = completed
          ? 'green'
          : 'orange';
        return <Tag color={ color } key={ task.id }>
          { completed
            ? 'Completada'
            : 'Pendiente' }
        </Tag>;
      }
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
    },

  ];

  const data = list.map( ( task, index ) => (
    {
      key: index,
      title: task.title,
      status: task.completed,
      actions: (
        <>
          { !task.completed && <Button icon={ <CheckOutlined /> } onClick={ () => onCompleteTask( index ) } /> }
          <Button danger icon={ <DeleteOutlined /> } onClick={ () => onDeleteTask( index ) } />
        </>
      )
    }
  ) );

  const empty = <Empty
    image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
    imageStyle={ {
      height: 60,
    } }
    description={
      <span>
        No tienes tareas, eres libre! :D
      </span>
    }
  >
    <Button type='primary' onClick={ () => setCreateTaskModalVisible( true ) }>Crea una ahora</Button>
  </Empty>;

  return (
    <div className={ darkMode
      ? 'dark-mode'
      : '' }>
      <button onClick={ () => setDarkMode( ( prevDarkmode ) => !prevDarkmode ) }>Cambiar a modo oscuro</button>
      <h1>Lista de tareas ({ list.length } en total)</h1>

      <Table columns={ columns }
             dataSource={ data }
             loading={ isLoading }
             locale={ { emptyText: empty } }
             pagination={ { pageSize: 5 } }
      />

      <Modal
        title='Crea una nueva tarea'
        visible={ createTaskModalVisible }
        onOk={ () => setCreateTaskModalVisible( false ) }
        onCancel={ () => setCreateTaskModalVisible( false ) }
        footer={ null }
      >
        <UserTaskForm onAddTask={ onAddTask } />
      </Modal>
    </div>
  )
    ;
};

export default UserTaskList;
