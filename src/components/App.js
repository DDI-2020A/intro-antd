import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import UserInfo from './UserInfo';
import UserTaskList from './UserTaskList';
import UserTaskForm from './UserTaskForm';
import { Button, message, Modal } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function App() {
  const [ list, setList ] = useState( [] );
  const [ userId, setUserId ] = useState( 1 );
  const [ userData, setUserData ] = useState( null );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ createTaskModalVisible, setCreateTaskModalVisible ] = useState( false );

  useEffect( () => {
    const getUser = async() => {
      const data = await fetch( `https://jsonplaceholder.typicode.com/users/${ userId }` );
      const jsonUser = await data.json();
      console.log( 'user', jsonUser );

      setUserData( jsonUser );
    };
    getUser();

    const getList = async() => {
      const data = await fetch( `https://jsonplaceholder.typicode.com/users/${ userId }/todos` );
      const jsonList = await data.json();
      console.log( 'list', jsonList );

      setList( jsonList );
      setIsLoading( false );
    };
    getList();
  }, [ userId ] );

  const handleAddTask = () => {
    const title = document.querySelector( '#task' ).value;
    setList( prevState => [
      ...prevState, {
        title,
        completed: false
      }
    ] );
    document.querySelector( '#task' ).value = '';
  };

  const handleDeleteTask = ( index ) => {
    setList( ( prevState ) => {
      return prevState.filter( ( task, i ) => i !== index );
    } );
  };

  const handleCompleteTask = ( index ) => {
    setList( ( prevState ) => {
      const listUpdated = [ ...prevState ];
      listUpdated[ index ].completed = true;
      return listUpdated;
    } );
    message.success( 'Felicitaciones, has completado tu tarea! :)' );
  };


  const handlePrevUser = () => {
    setUserId( userId - 1 );
  };

  const handleNextUser = () => {
    setUserId( userId + 1 );
  };

  return (
    <>
      {
        userId > 1 &&
        <Button type='primary' icon={ <LeftOutlined /> } onClick={ handlePrevUser }>Anterior usuario</Button>
      }
      {
        userId < 10 &&
        <Button type='primary'
                onClick={ handleNextUser }>
          Siguiente usuario <RightOutlined />
        </Button>
      }
      <UserInfo userData={ userData } />

      <Button type='primary'
              onClick={ () => setCreateTaskModalVisible( true ) }>
        Crear una nueva tarea
      </Button>

      <Button danger
              onClick={ () => setList( [] ) }>
        Eliminar todas las tareas
      </Button>
      <Modal
        title='Crea una nueva tarea'
        visible={ createTaskModalVisible }
        onOk={ () => setCreateTaskModalVisible( false ) }
        onCancel={ () => setCreateTaskModalVisible( false ) }
        footer={ null }
      >
        <UserTaskForm onAddTask={ handleAddTask } />
      </Modal>

      <UserTaskList list={ list }
                    onAddTask={ handleAddTask }
                    onCompleteTask={ handleCompleteTask }
                    onDeleteTask={ handleDeleteTask }
                    isLoading={ isLoading } />
    </>
  );
}

export default App;
