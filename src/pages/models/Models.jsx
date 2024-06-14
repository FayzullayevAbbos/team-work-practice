import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import {Button, Form, Input, Modal, Radio, Select, Table} from 'antd'
import { useEffect, useState } from 'react';

function Models() {
  const [model, setModel] = useState([])
  const [brands, setBrands] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    getModales()
    getBrands()
  }, [])
  // getModels
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
  // getModels
  // getBrands
  const getBrands = () =>{
    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
      "method": "GET",
      "headers": {
       'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then(response => response.json())
    .then(data => {
     console.log(data?.data)
     setBrands(data?.data)
    })
    .catch(err => { console.log(err); 
    });
  }
  // getBrands
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
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
    title: <span> <Button type="primary" onClick={showModal}>
    <PlusOutlined /> Add brands
  </Button></span>,
    key: 'add',
  },
];
// table

// form uchun
const [form] = Form.useForm();
const [formLayout, setFormLayout] = useState('horizontal');
const onFormLayoutChange = ({ layout }) => {
  setFormLayout(layout);
};
const formItemLayout =
  formLayout === 'horizontal'
    ? {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
    : null;
const buttonItemLayout =
  formLayout === 'horizontal'
    ? {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
    : null;
    // form uchun 
    // select iconka uchun
    const options = brands.map((brand) => ({
      value: brand.id,
      label: brand.title,
    }));
  
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };
    // select iconka uchun 
  return (
    <div> 
        <Modal open={open} onOk={handleOk} onCancel={handleCancel}>
        <Form
      // {...formItemLayout}
      // layout={formLayout}
      form={form}
      initialValues={{
        // layout: formLayout,
      }}
      // onValuesChange={onFormLayoutChange}
      // style={{
      //   maxWidth: formLayout === 'inline' ? 'none' : 600,
      // }}
    >
      <Form.Item  name="layout">
      </Form.Item>
      <Form.Item label="Model Name">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Brand Name">
      <Select
    // showSearch
    // placeholder="Select a person"
    // optionFilterProp="children"
    onChange={handleChange}
    // onSearch={onSearch}
    // filterOption={filterOption}
    options={options}
  />
    
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        {/* <Button type="primary">Submit</Button> */}
      </Form.Item>
    </Form>
      </Modal>
<Table dataSource={model} columns={columns} />;
    </div>
  )
}
export default Models