import { Form } from "antd";

const PropertyField = ({ label, children }) => {
  return (
    <Form.Item
      label={label}
      className="mb-3!"
      layout="vertical"
    >
      {children}
    </Form.Item>
  );
};

export default PropertyField;