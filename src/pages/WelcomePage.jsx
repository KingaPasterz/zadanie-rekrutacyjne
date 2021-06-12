import React, { Component } from 'react';
import { Form, InputNumber, Button, Checkbox } from 'antd';
import { sendFilledForm } from '../redux/actions';
import { connect } from 'react-redux';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class WelcomePage extends Component {
  constructor(props) {
    super(props);
  }

  onFinish = (values) => {
    this.props.seatsData({
      ilość: values.liczba_miejsc,
      czy_obok: values.obok_siebie,
      sukces: true
    });
  }

  onFinishFailed = (errorInfo) => {
    this.props.sendFilledForm({
      ilość: null,
      czy_obok: null,
      sukces: false
    });
  }


  render() {

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        style={{ width: 400, margin: "auto", marginTop: 50 }}
      >
        <Form.Item
          label="Liczba miejsc"
          name="liczba_miejsc"
          rules={[{ required: true, message: 'Podaj liczbę miejsc' }]}
        >
          <InputNumber
            min={1}
            max={50}
            defaultValue={0}
            onChange={this.onChange}
          />
        </Form.Item>

        <Form.Item {...layout} name="obok_siebie" valuePropName="checked">
          <Checkbox>Czy miejsca mają być obok siebie?</Checkbox>
        </Form.Item>

        <Form.Item {...layout}>
          <Button type="primary" htmlType="submit">
            Wybierz miejsca
                    </Button>
        </Form.Item>
      </Form>
    );
  }
}


export default connect(null, { sendFilledForm })(WelcomePage);
