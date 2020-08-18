import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import UserInfo from './UserInfo';
import UserTaskList from './UserTaskList';
import UserTaskForm from './UserTaskForm';

function App() {
  const [ list, setList ] = useState( [] );
  const [ userId, setUserId ] = useState( 1 );
  const [ userData, setUserData ] = useState( null );

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
        <button onClick={ handlePrevUser }>Anterior usuario</button>
      }
      {
        userId < 10 &&
        <button onClick={ handleNextUser }>Siguiente usuario</button>
      }
      <UserInfo userData={ userData } />
      <UserTaskForm onAddTask={ handleAddTask } />
      <UserTaskList list={ list } onCompleteTask={ handleCompleteTask } onDeleteTask={ handleDeleteTask } />
    </>
  );
}

export default App;
