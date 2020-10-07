import React from 'react';
import Axios from 'axios';
import { Form, Input, Button, message, Radio, Checkbox, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import LoginContext from 'Utils';

export default function Log() {

    const login = React.useContext(LoginContext);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 },
    };
    const tailLayout = {
        wrapperCol: { offset: 4, span: 10 },
    };

    const onFinish = values => {
        Axios.post("http://localhost:8000/api/account/api-jwt-auth", values)
            .then(res => {
                window.localStorage.setItem("token", res.data.token);
                login.setIsLogin(true)
            }).catch(error => {
                message.info('Please Check again');
            })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Login
              </Button>
            </Form.Item>
        </Form>
    );

}
