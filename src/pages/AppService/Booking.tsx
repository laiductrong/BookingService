import React from 'react';
import { Form, Select, Button, message, Card, Table, Tag, DatePicker, Input } from 'antd';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store'; // Import store
import { addAppointment } from './bookingSlice';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const TinyEditor: React.FC = () => {
  return <TextArea rows={4} placeholder="Enter notes..." />;
};

const BookingForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const appointments = useSelector((state: RootState) => state.booking.appointments);

  const onFinish = (values: any) => {
    const { date, time, employee, service, note } = values;
    const dateTime = dayjs(date).format('YYYY-MM-DD') + ' ' + time;

    // Check for duplicate appointments
    const isDuplicate = appointments.some(
      (appointment) => appointment.dateTime === dateTime && appointment.employee === employee
    );

    if (isDuplicate) {
      message.error('The schedule is conflicting! Please choose a different time.');
      return;
    }

    const newAppointment = {
      dateTime,
      employee,
      service,
      note,
      status: 'Pending',
    };

    dispatch(addAppointment(newAppointment));

    message.success('Appointment booked successfully!');
    form.resetFields();
  };

  const columns = [
    { title: 'Date & Time', dataIndex: 'dateTime', key: 'dateTime' },
    { title: 'Employee', dataIndex: 'employee', key: 'employee' },
    { title: 'Service', dataIndex: 'service', key: 'service' },
    { title: 'Notes', dataIndex: 'note', key: 'note' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color =
          status === 'Pending'
            ? 'orange'
            : status === 'Confirmed'
            ? 'blue'
            : status === 'Completed'
            ? 'green'
            : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <Card title="Book an Appointment" bordered>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="date" label="Select Date" rules={[{ required: true, message: 'Please select a date!' }]}>
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="time" label="Select Time" rules={[{ required: true, message: 'Please select a time!' }]}>
          <Select>
            <Option value="09:00">09:00 AM</Option>
            <Option value="10:00">10:00 AM</Option>
            <Option value="11:00">11:00 AM</Option>
            <Option value="14:00">02:00 PM</Option>
            <Option value="15:00">03:00 PM</Option>
          </Select>
        </Form.Item>

        <Form.Item name="employee" label="Select Employee" rules={[{ required: true, message: 'Please select an employee!' }]}>
          <Select>
            <Option value="Nguyen Van A">Nguyen Van A</Option>
            <Option value="Tran Thi B">Tran Thi B</Option>
          </Select>
        </Form.Item>

        <Form.Item name="service" label="Select Service" rules={[{ required: true, message: 'Please select a service!' }]}>
          <Select>
            <Option value="Haircut">Haircut</Option>
            <Option value="Spa">Spa</Option>
          </Select>
        </Form.Item>

        <Form.Item name="note" label="Notes">
          <TinyEditor />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Book Appointment
        </Button>
      </Form>

      <Table columns={columns} dataSource={appointments} rowKey="dateTime" />
    </Card>
  );
};

// Bọc `Provider` xung quanh `BookingForm`
const BookingApp = () => (
  <Provider store={store}>
    <BookingForm />
  </Provider>
);

export default BookingApp;