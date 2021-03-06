import React, { Component, Fragment } from "react";
import {
  Input,
  Table,
  Space,
  Popconfirm,
  message,
  Modal,
  Select,
  // Tag,
} from "antd";
import "./pages.css";
import { Stu } from "./Search";
import { MyCtx } from "../store/MyContext";
const { Option } = Select;
export default class Student extends Component {
  constructor() {
    super();
    this.state = {
      allStudent: "",
      stuDormitory: [],
      studorm: "",
      addStu: {
        id: "",
        stuId: "",
        stuName: "",
        stuUserId: "",
        stuPas: "",
        stuDormId: "",
      },
      isfrom: "",
      payment: "",
      recharge: "",
      model: {
        visible: false,
        confirmLoading: false,
      },
      paymentModel: {
        visible: false,
        confirmLoading: false,
      },
      rechargeModel: {
        visible: false,
        confirmLoading: false,
      },
    };
  }

  showModal = (val) => {
    let data = Object.assign({}, this.state.model, { visible: true });
    this.setState({
      model: data,
      isfrom: val,
    });
  };

  handleOk = () => {
    let isfrom = this.state.isfrom;
    if (isfrom === "add") {
      this.stuAdd();
    } else {
      this.stuUpdate();
    }

    let data = Object.assign({}, this.state.model, { confirmLoading: true });
    let addfrom = Object.assign({}, this.state.addStu, {
      id: "",
      stuId: "",
      stuName: "",
      stuUserId: "",
      stuPas: "",
      stuDormId: "",
    });
    this.setState({
      model: data,
      isfrom: "",
      stuDormitory: [],
    });

    setTimeout(() => {
      let data = Object.assign({}, this.state.model, {
        visible: false,
        confirmLoading: false,
      });
      this.setState({
        model: data,
        addStu: addfrom,
      });
    }, 1000);
  };

  handleCancel = () => {
    let data = Object.assign({}, this.state.model, { visible: false });
    let addfrom = Object.assign({}, this.state.addStu, {
      id: "",
      stuId: "",
      stuName: "",
      stuUserId: "",
      stuPas: "",
      stuDormId: "",
    });
    this.setState({
      model: data,
      addStu: addfrom,
      isfrom: "",
      stuDormitory: [],
    });
  };
  componentDidMount() {
    this.student();
  }
  student = () => {
    this.context.userInfo.stuName ? this.idStudent() : this.getStudent();
  };

  getStudent = () => {
    let url = `/api/student/getstudent`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data.map((item, i) => {
          item.key = item.id;
          if (item.type === 1) {
            item.type = "??????";
          } else {
            item.type = "?????????";
          }
          return item;
        });
        this.setState({
          allStudent: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  idStudent = () => {
    let data = {
      id: this.context.userInfo.id,
    };
    let url = `/api/student/idstudent`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), //?????????????????????
      headers: {
        "Content-Type": "application/json", //???????????????
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data.map((item, i) => {
          item.key = item.id;
          if (item.type === 1) {
            item.type = "??????";
          } else {
            item.type = "?????????";
          }
          return item;
        });
        this.setState({
          allStudent: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  Search = (val) => {
    let data = val;
    let url = `/api/student/getsinglestudent?stuName=${data}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data.map((item, i) => {
          item.key = item.id;
          if (item.type === 1) {
            item.type = "??????";
          } else {
            item.type = "?????????";
          }
          return item;
        });
        this.setState({
          allStudent: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let data = Object.assign({}, this.state.addStu, { [name]: value });
    this.setState({
      addStu: data,
    });
  };
  getValue = (e) => {
    let data = Object.assign({}, this.state.addStu, { stuDormId: e });
    this.setState({
      addStu: data,
    });
  };
  topUPInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };
  stuAdd = () => {
    let data = {
      stuDormId: this.state.addStu.stuDormId,
      stuName: this.state.addStu.stuName,
      stuId: this.state.addStu.stuId,
      stuUserId: this.state.addStu.stuUserId,
      stuPas: this.state.addStu.stuPas,
    };
    let url = `/api/student/addstudent`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), //?????????????????????
      headers: {
        "Content-Type": "application/json", //???????????????
      },
    })
      .then((res) => res.json())
      .then((res) => {
        message.success(res.msg);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      this.student();
    }, 500);
  };
  dormitory = () => {
    let url = `/api/dorm/getdorm`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data.map((item, i) => {
          item.key = item.id;
          if (item.type === 1) {
            item.type = "??????";
          } else {
            item.type = "?????????";
          }
          return item;
        });
        this.setState({
          stuDormitory: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  delstu = (key) => {
    let data = { id: key.id };
    let url = `/api/student/delstudent`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), //?????????????????????
      headers: {
        "Content-Type": "application/json", //???????????????
      },
    })
      .then((res) => res.json())
      .then((res) => {
        message.success(res.msg);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      this.student();
    }, 500);
  };

  updateStu = (key, val) => {
    let { id, stuId, stuName, stuUserId, stuPas, stuDormId } = key;
    let updatefrom = Object.assign({}, this.state.addStu, {
      id: id,
      stuId: stuId,
      stuName: stuName,
      stuUserId: stuUserId,
      stuPas: stuPas,
      stuDormId: stuDormId,
    });
    this.showModal(val);
    this.setState({
      addStu: updatefrom,
    });
    this.dormitory();
  };
  stuUpdate = () => {
    let data = {
      id: this.state.addStu.id,
      stuName: this.state.addStu.stuName,
      stuPas: this.state.addStu.stuPas,
      stuDormId: this.state.addStu.stuDormId,
    };
    let url = `/api/student/updatestudent`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), //?????????????????????
      headers: {
        "Content-Type": "application/json", //???????????????
      },
    })
      .then((res) => res.json())
      .then((res) => {
        message.success(res.msg);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      this.student();
    }, 500);
  };

  paymentShowModal = () => {
    let data = Object.assign({}, this.state.paymentModel, { visible: true });
    this.setState({
      paymentModel: data,
    });
  };

  paymentHandleOk = () => {
    let data = Object.assign({}, this.state.paymentModel, {
      confirmLoading: true,
    });
    this.setState({
      paymentModel: data,
      payment: "",
    });
  };

  paymentHandleCancel = () => {
    console.log("Clicked cancel button");
    let data = Object.assign({}, this.state.paymentModel, { visible: false });
    this.setState({
      paymentModel: data,
      payment: "",
    });
  };

  payment = (id) => {
    let url = `/api/student/getstudentpayment?id=${id}`;
    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data.map((item, i) => {
          item.key = item.id;
          return item;
        });
        this.setState({
          payment: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  rechargeShowModal = () => {
    let data = Object.assign({}, this.state.rechargeModel, { visible: true });
    this.setState({
      rechargeModel: data,
    });
  };

  rechargeHandleOk = () => {
    this.Recharge();
    let data = Object.assign({}, this.state.rechargeModel, {
      confirmLoading: true,
    });
    this.setState({
      rechargeModel: data,
    });

    setTimeout(() => {
      let data = Object.assign({}, this.state.rechargeModel, {
        visible: false,
        confirmLoading: false,
      });
      this.setState({
        rechargeModel: data,
        recharge: "",
      });
    }, 1000);
  };

  rechargeHandleCancel = () => {
    console.log("Clicked cancel button");
    let data = Object.assign({}, this.state.rechargeModel, { visible: false });
    this.setState({
      rechargeModel: data,
      recharge: "",
    });
  };

  Recharge = () => {
    let data = {
      stuId: this.context.userInfo.id,
      money: this.state.recharge,
    };
    let url = `/api/student/topup`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), //?????????????????????
      headers: {
        "Content-Type": "application/json", //???????????????
      },
    })
      .then((res) => res.json())
      .then((res) => {
        message.success(res.msg);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      this.student();
    }, 500);
  };

  stuDorm = () => {
    let data = {
      stuDormId: this.context.userInfo.stuDormId,
    };
    let url = `/api/student/studorm`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), //?????????????????????
      headers: {
        "Content-Type": "application/json", //???????????????
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          studorm:res.data[0]
        })
      })
      .catch((err) => {
        console.log(err);
      });

  };
  render() {
    const columns = [
      {
        title: "??????",
        dataIndex: "stuId",
        align: "center",
      },
      {
        title: "??????",
        dataIndex: "stuName",
        align: "center",
      },
      {
        title: "??????",
        dataIndex: "stuUserId",
        align: "center",
      },
      {
        title: "??????????????????",
        dataIndex: "dormId",
        align: "center",
      },
      {
        title: "?????????????????????",
        dataIndex: "balance",
        align: "center",
      },
      {
        title: "????????????",
        dataIndex: "type",
        align: "center",
      },
      {
        title: "??????",
        dataIndex: "caozuo",
        align: "center",
        render: (text, record) => {
          return (
            <Space>
              <a
                onClick={() => {
                  this.updateStu(record, "upStu");
                }}
              >
                ??????
              </a>
              <Popconfirm
                title="????????????????"
                okText="??????"
                cancelText="??????"
                onConfirm={() => {
                  this.delstu(record);
                }}
              >
                <a
                  style={{
                    display: this.context.userInfo.stuName ? "none" : "block",
                  }}
                >
                  ??????
                </a>
              </Popconfirm>
              <a
                onClick={() => {
                  this.paymentShowModal();
                  this.payment(record.id);
                }}
              >
                ??????????????????
              </a>
              <a
                style={{
                  display: this.context.userInfo.stuName ? "block" : "none",
                }}
                onClick={() => {
                  this.rechargeShowModal();
                }}
              >
                ??????
              </a>
            </Space>
          );
        },
      },
    ];
    const column = [
      {
        title: "?????????",
        key: "stuId",
        dataIndex: "stuName",
      },
      {
        title: "????????????",
        dataIndex: "money",
        key: "money",
      },
      {
        title: "????????????",
        dataIndex: "mytime",
        key: "mytime",
      },
    ];
    return (
      <Fragment>
        {this.context.userInfo.stuName ? ("") : (
          <Stu
            showModal={this.showModal}
            Search={this.Search}
            student={this.student}
            dorm={this.dormitory}
            payment={this.payment}
          ></Stu>
        )}
        <Table
          columns={columns}
          dataSource={this.state.allStudent}
          size="middle"
          position="bottomCenter"
          pagination={{defaultPageSize:5}}
        />

        <Modal
          width="500px"
          title={this.state.isfrom === "add" ? "????????????" : "??????????????????"}
          okText="??????"
          cancelText="??????"
          visible={this.state.model.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.model.confirmLoading}
          onCancel={this.handleCancel}
          // footer={null}
        >
          <div>
            <span className="bel">??????</span>
            <Input
              disabled={this.state.isfrom === "upStu" ? true : false}
              type="number"
              name="stuId"
              className="addFrom"
              value={this.state.addStu.stuId}
              placeholder="?????????????????????"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <span className="bel">??????</span>
            <Input
              name="stuName"
              className="addFrom"
              value={this.state.addStu.stuName}
              placeholder="????????????"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <span className="bel">??????</span>
            <Input
              disabled={this.state.isfrom === "upStu" ? true : false}
              name="stuUserId"
              className="addFrom"
              value={this.state.addStu.stuUserId}
              placeholder="??????"
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <span className="bel">??????</span>
            <Space direction="vertical">
              <Input.Password
                type="password"
                name="stuPas"
                className="addFrom"
                value={this.state.addStu.stuPas}
                placeholder="??????"
                onChange={this.handleInputChange}
              />
            </Space>
          </div>
          <div>
            <span className="bel">????????????</span>
            <Select
              disabled={this.context.userInfo.stuName ? true : false}
              // defaultValue={this.state.addStu.stuDormId}
              className="addFrom"
              placeholder="???????????????????????????"
              onChange={(val) => {
                this.getValue(val);
              }}
              allowClear
            >
              {this.state.stuDormitory.map((item, i) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.dormId}
                  </Option>
                );
              })}
            </Select>
          </div>
        </Modal>
        <Modal
          width="500px"
          title="????????????"
          okText="??????"
          cancelText="??????"
          visible={this.state.paymentModel.visible}
          onOk={this.paymentHandleOk}
          confirmLoading={this.state.paymentModel.confirmLoading}
          onCancel={this.paymentHandleCancel}
          footer={null}
        >
          <Table
            pagination={false}
            columns={column}
            dataSource={this.state.payment}
          />
        </Modal>

        <Modal
          width="500px"
          title="??????"
          okText="??????"
          cancelText="??????"
          visible={this.state.rechargeModel.visible}
          onOk={this.rechargeHandleOk}
          confirmLoading={this.state.rechargeModel.confirmLoading}
          onCancel={this.rechargeHandleCancel}
          // footer={null}
        >
          <div>
            <span className="bel">????????????</span>
            <Input
              type="number"
              name="recharge"
              className="addFrom"
              value={this.state.recharge}
              placeholder="???????????????????????????????????????"
              onChange={this.topUPInputChange}
            />
          </div>
        </Modal>
      </Fragment>
    );
  }
}

Student.contextType = MyCtx;
