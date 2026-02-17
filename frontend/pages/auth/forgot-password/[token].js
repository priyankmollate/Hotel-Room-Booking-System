/**
 * @name Hotel Room Booking System
 * @author Md. Samiur Rahman (Mukul)
 * @description Hotel Room Booking and Management System Software ~ Developed By Md. Samiur Rahman (Mukul)
 * @copyright ©2023 ― Md. Samiur Rahman (Mukul). All rights reserved.
 * @version v0.0.1
 *
 */

import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MainLayout from '../../../components/layout';
import PublicRoute from '../../../components/routes/PublicRoute';
import ApiService from '../../../utils/apiService';
import notificationWithIcon from '../../../utils/notification';

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values) => {
    ApiService.post(`/api/v1/auth/reset-password/${router.query.token}`, values)
      .then((response) => {
        setLoading(false);
        if (response?.result_code === 0) {
          notificationWithIcon('success', 'SUCCESS', response?.result?.message || 'Your password reset successful');
          form.resetFields();
          router.push('/auth/login');
        } else {
          notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
        }
      })
      .catch((err) => {
        setLoading(false);
        notificationWithIcon('error', 'ERROR', err?.response?.data?.result?.error?.message || err?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
      });
  };

  return (
    <PublicRoute>
      <MainLayout title='Macau Resort ― Reset Password'>
        <div className='auth-wrap'>
          <div className='auth-card'>
            <Form
              form={form}
              className='login-form'
              initialValues={{ remember: true }}
              name='macau-resort-login-form'
              onFinish={onFinish}
            >
              <Form.Item
                name='password'
                rules={[{
                  required: true,
                  message: 'Please input your Password!'
                }]}
              >
                <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  placeholder='Password'
                  type='password'
                  size='large'
                />
              </Form.Item>

              <Form.Item
                name='confirmPassword'
                rules={[{
                  required: true,
                  message: 'Please input your Confirm Password!'
                }]}
              >
                <Input.Password
                  prefix={<LockOutlined className='site-form-item-icon' />}
                  placeholder='Confirm Password'
                  type='password'
                  size='large'
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className='login-form-button'
                  htmlType='submit'
                  type='primary'
                  size='large'
                  block
                  loading={loading}
                  disabled={loading}
                >
                  Reset Password
                </Button>
              </Form.Item>

              <Link
                className='btn-login-registration'
                href='/auth/login'
              >
                or Login Here!
              </Link>
            </Form>
          </div>
        </div>
      </MainLayout>
    </PublicRoute>
  );
}

export default ResetPassword;
