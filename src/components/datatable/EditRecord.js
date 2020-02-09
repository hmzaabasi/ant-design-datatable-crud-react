import React from "react";
import { Redirect } from "react-router-dom";

import { Form, Input, Button } from "antd";

class EditRecord extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const userData = this.props.location.state;

    if (!userData) {
      return <Redirect to="/home" />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ padding: "5%" }}>
        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          onSubmit={this.handleSubmit}
        >
          <Form.Item label="First Name">
            {getFieldDecorator("first_name", {
              initialValue: userData.first_name,
              rules: [{ required: true, message: "Enter valid name!" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator("last_name", {
              initialValue: userData.last_name,
              rules: [{ required: true, message: "Enter valid name!" }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: userData.email,
              rules: [{ required: true, message: "Enter valid email!" }]
            })(<Input />)}
          </Form.Item>

          <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: "coordinated" })(EditRecord);

//
// const EditRecord = props => {
//   const recordId = props.match.params.id;
//   console.log("abc", props);

//   if (!props.location.state) {
//     return <Redirect to="/home" />;
//   }
//   return (
//     <div>
//       Hello World
//       <div>{JSON.stringify(props.location.state)}</div>
//     </div>
//   );
// };

// export default EditRecord;
