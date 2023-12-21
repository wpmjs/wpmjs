import React from 'react';
import Button from 'antd/es/Button'; // 加载 JS
import 'antd/es/Button/style/css'; // 加载 CSS
import Form from 'antd/es/Form'; // 加载 JS
import 'antd/es/Form/style/css'; // 加载 CSS
import Input from 'antd/es/Input'; // 加载 JS
import 'antd/es/Input/style/css'; // 加载 CSS
import Select from 'antd/es/Select'; // 加载 JS
import 'antd/es/Select/style/css'; // 加载 CSS
import "./index.css"
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import localStorage from "./getLocalStorage"

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
const availablePropertys = ["url", "packageVersion", "package"]

const wpmAlias = (function () {
  try {
    const importMap = JSON.parse(localStorage.getItem("wpm-debug-import-map")) || {}
    return Object.keys(importMap).map(name => {
      const config = importMap[name]
      const props = []
      for (let index = 0; index < availablePropertys.length; index++) {
        const prop = availablePropertys[index];
        if (config[prop]) {
          props.push({
            name,
            prop,
            value: config[prop]
          })
        }
      }
      return props
    }).flat().filter(config => !!config)
  } catch (e) {
    return []
  }
})()
const initialValues = {
  list: wpmAlias
}
const App = () => {
  const onFinish = (values) => {
    const importMap = {}
    values.list.forEach(({name, prop, value}) => {
      importMap[name] = importMap[name] || {}
      importMap[name][prop] = value
    })
    localStorage.setItem("wpm-debug-import-map", JSON.stringify(importMap))
    location.reload()
  };
  return (
    <div className="wpmjs-develop-alias" style={{position: "relative"}}>
    <Form
      initialValues={initialValues}
      name="dynamic_form_item"
      {...formItemLayoutWithOutLabel}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.List
        name="list"
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div style={{display: "flex", marginTop: 10}}>
                <Form.Item
                  name={[field.name, 'name']}
                  noStyle
                >
                  <Input
                    placeholder="package name"
                  />
                </Form.Item>
                <Form.Item name={[field.name, "prop"]} noStyle>
                  <Select defaultValue={"packageVersion"} getPopupContainer={() => document.querySelector(".wpmjs-develop-alias")} style={{minWidth: 140}}>
                    {availablePropertys.map((key, i) => {
                      return <Select.Option key={i} value={key}>{key}</Select.Option>
                    })} 
                  </Select>
                </Form.Item>
                <Form.Item
                  name={[field.name, 'value']}
                  noStyle
                >
                  <Input
                    placeholder={field.prop}
                  />
                </Form.Item>
                
                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                />
              </div>
            ))}
            <Form.ErrorList errors={errors} />
            <div style={{display: "flex", marginTop: 10}}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add
              </Button>
              <Button type="primary" htmlType="submit">
                save
              </Button>
            </div>
          </>
        )}
      </Form.List>
    </Form>
    </div>
  );
};

export default App;