/**
 * Created by chalosalvador on 8/18/20
 */
import React from 'react';
import { Descriptions } from 'antd';

const UserInfo = ( { userData } ) => (
  userData
    ?
    <>
      <Descriptions title='Información del usuario'>
        <Descriptions.Item label='Nombre'>{ userData.name }</Descriptions.Item>
        <Descriptions.Item label='Usuario'>{ userData.username }</Descriptions.Item>
        <Descriptions.Item label='Email'>{ userData.email }</Descriptions.Item>
        <Descriptions.Item label='Web'>{ userData.web }</Descriptions.Item>
        <Descriptions.Item label='Teléfono'>{ userData.phone }</Descriptions.Item>
      </Descriptions>
    </>
    : 'Cargando...'
);

export default UserInfo;
