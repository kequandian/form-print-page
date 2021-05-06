import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

import './index.css';

const EditableContext = React.createContext(null);


const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '标识',
                dataIndex: 'name',
                width: '30%',
                editable: true,
            },
            {
                title: '字段名',
                dataIndex: 'entityName',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (_, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>移除</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            dataSource: [
                // {
                //     key: '0',
                //     name: 'Edward King 0',
                //     age: '32',
                //     address: 'London, Park Lane no. 0',
                // },
                // {
                //     key: '1',
                //     name: 'Edward King 1',
                //     age: '32',
                //     address: 'London, Park Lane no. 1',
                // },
            ],
            count: 0,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        
        // change data
        const { onChange } = this.props;
        onChange(dataSource.filter((item) => item.key !== key))

        this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
        });
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: `name_${count}`,
            entityName: `entityName_${count}`,
        };

        // change data
        const { onChange } = this.props;
        onChange([...dataSource, newData])

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };
    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        // change data
        const { onChange } = this.props;
        onChange(newData)

        this.setState({
            dataSource: newData,
        });
    };

    render() {
        const { dataSource } = this.state;
        const {
            name,
            value,
            namespace,
            options = {},
            props: p,
            onChange,
            handle,
            hooks = {},
            ...rest
          } = this.props;
          
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button
                    onClick={this.handleAdd}
                    type="primary"
                    style={{
                        marginTop: 20,
                        marginBottom: 16,
                    }}
                >
                    新增字段
          </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}


export default EditableTable