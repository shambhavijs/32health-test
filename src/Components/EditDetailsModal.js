import { Modal, Input, Form, InputNumber } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function EditDetailsModal(props) {
  const { isModalOpen, handleCloseModal, handleCancel } = props;
  const data = useSelector((state) => state.currentUser);
  const currentUser = data.currentUser;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
  };

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      name: currentUser?.name,
      email: currentUser?.email,
      phone: currentUser?.phone,
      website: currentUser?.website
    });
  });

  return (
    <Modal
      title="Edit" 
      open={isModalOpen} 
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleCloseModal(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }} 
      onCancel={handleCancel}
      forceRender>
        <Form
          form={form}
          {...layout}
          name="user-info"
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={['name']}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            name={['email']}
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['phone']}
            label="Phone"
            rules={[
              {
                type: 'number',
                required: true,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={['website']} label="Website" rules={[
              {
                required: true,
              },
            ]}>
            <Input />
          </Form.Item>
        </Form>
    </Modal>
  )
}