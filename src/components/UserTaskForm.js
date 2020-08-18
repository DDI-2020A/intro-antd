import React from 'react';
import { Button, Input } from 'antd';
import { UnorderedListOutlined, PlusOutlined } from '@ant-design/icons';


/**
 * Created by chalosalvador on 8/18/20
 */

const UserTaskForm = ( { onAddTask } ) => (
  <div>
    <Input style={{width: 350}} size='large' id='task' placeholder='Ingrese el nombre de la tarea' prefix={ <UnorderedListOutlined /> } />
    <Button type='primary' onClick={ onAddTask } icon={<PlusOutlined />} />
  </div>
);

export default UserTaskForm;
