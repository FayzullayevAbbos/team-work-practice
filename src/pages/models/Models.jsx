import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Table} from 'antd'
import { useEffect, useState } from 'react';

// Table
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand_title',
    key: 'brand',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button icon={<EditOutlined />} style={{ marginRight: 8 }} />
        <Button icon={<DeleteOutlined />} />
      </span>
    ),
  },
  {
    title: <span> <Button type="primary">
    <PlusOutlined /> Add brands
  </Button></span>,
    key: 'add',
  },
];
// table
function Models() {
  const [model, setModel] = useState([])
  useEffect(()=>{
    getModales()
  }, [])
  
const getModales = () =>{
  fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
    "method": "GET",
    "headers": {
     'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then(response => response.json())
  .then(data => {
   setModel(data?.data)
  })
  .catch(err => { console.log(err); 
  });
}
  return (
    <div> 
<Table dataSource={model} columns={columns} />;
    </div>
  )
}
export default Models