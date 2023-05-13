import styles from "../../../styles/Home.module.css";
import Sidebar from "../../component/sidebar";
import Head from "next/head";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import {
  Card,
  Col,
  Skeleton,
  Row,
  Image,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import authSevice from "../../../services/auth.service";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import validator from "validator";
import client from "../../../utils/client";
import { token } from "../../../utils/token";
import modules from "../../../styles/admin.module.css";

export default function AdminAccount() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authSevice.logout();
      token.destroy();
      router.push("/");
    } catch (error) {}
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      ...profile,
    },
    enableReinitialize: true,
    async onSubmit(values) {
      if (validator.isEmail(values.email)) {
        try {
          await authSevice.update(values);
          setIsModalOpen(false);
          notification.success({
            message: "Updated successfully",
          });
          setProfile(values);
        } catch (error) {
          notification.error({ message: "You need to text more information!" });
        }
      } else {
        notification.error({ message: "Email is invalid" });
      }
    },
  });

  //profile user
  const [table, setTable] = useState([]);
  useEffect(() => {
    const getAccounts = async () => {
      try {
        const response = await client.get(
          `http://localhost:8000/api/admin/accounts`
        );
        setTable(response);
        setLoading(false);
      } catch (error) {
        notification.error({ message: error });
      }
      setLoading(false);
    };

    const fetchData = async () => {
      try {
        const res = await authSevice.auth();
        getAccounts();
        setProfile(res);
      } catch (error) {
        notification.error({ message: "You need to login!" });
        setLoading(false);
        router.push("/auth/login");
      }
    };
    fetchData();
  }, []);

  //delete account
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      await client.delete(`http://localhost:8000/api/admin/account/${id}`);
      setDeleted(true);
      window.location.reload();
      notification.success({
        message: "Deleted",
      });
    } catch (error) {
      notification.error({ message: error });
    }
  };

  if (deleted) {
    return null;
  }
  return (
    <main>
      <Head>
        <title>Japper</title>
      </Head>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          {/* PROFILE STARTS */}
          <>
            {profile && (
              <Row>
                <Col span={24}>
                  <Card>
                    <Skeleton loading={loading} avatar active></Skeleton>
                    {!loading && (
                      <Row>
                        <Col span={8}>
                          <div
                            style={{
                              borderRadius: "50%",
                              overflow: "hidden",
                              width: "fit-content",
                              margin: "0 auto",
                            }}
                          >
                            <Image
                              width={200}
                              style={{ borderRadius: "50%" }}
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRov3osGD602hK59_f_b5AC8qxej4aoLUvLNvIII_bVMWKm1jtN"
                              preview={{
                                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRov3osGD602hK59_f_b5AC8qxej4aoLUvLNvIII_bVMWKm1jtN",
                              }}
                            />
                          </div>
                        </Col>
                        <Col span={8}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                              height: "100%",
                            }}
                          >
                            <Row>
                              <Typography.Title
                                level={1}
                                style={{
                                  marginBottom: "10px",
                                  fontSize: "40px",
                                }}
                              >
                                {profile.name}
                              </Typography.Title>
                            </Row>

                            <Row
                              align="middle"
                              justify="start"
                              style={{ marginTop: "6px" }}
                            >
                              <Typography.Text
                                style={{
                                  fontSize: "32px",
                                  textAlign: "start",
                                }}
                                strong
                                italic
                              ></Typography.Text>
                              <Typography.Text style={{ fontSize: "30px" }}>
                                {profile.email}
                              </Typography.Text>
                            </Row>
                          </div>
                        </Col>
                        <Col span={6}>
                          <Row justify="center">
                            <Col
                              style={{ marginTop: "65px", width: "100%" }}
                              span={12}
                            >
                              <Button
                                style={{ width: "100%", marginTop: "auto" }}
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={openModal}
                              >
                                Edit
                              </Button>
                            </Col>
                          </Row>

                          <Row justify="center">
                            <Col
                              style={{ marginTop: "12px", width: "100%" }}
                              span={12}
                            >
                              <Button
                                style={{ width: "100%" }}
                                type="primary"
                                icon={<UserOutlined />}
                                onClick={handleLogout}
                              >
                                Sign out
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    )}
                  </Card>
                </Col>
              </Row>
            )}
          </>
          {/* PROFILE ENDS */}
          <Modal
            title="Update Profile"
            open={isModalOpen}
            onOk={formik.handleSubmit}
            onCancel={handleCancel}
          >
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item
                label="Fullname"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Form.Item>
            </Form>
          </Modal>

          {/* table accounts */}

          <table className={modules.table}>
            <tbody>
              <tr>
                <td className={modules.th}>Full name</td>
                <td className={modules.th}>Email</td>
                <td className={modules.th}>Role</td>
                <td className={modules.th}>Date created</td>
                <td className={modules.th}>Action</td>
              </tr>

              {table.map((tables) => (
                <tr key={tables.id}>
                  <td className={modules.td}>{tables.name}</td>
                  <td className={modules.td}>{tables.email}</td>
                  <td className={modules.td}>{tables.role}</td>
                  <td className={modules.td}>{tables.created_at}</td>
                  {tables.role == 0 && (
                    <td className={modules.td}>
                      <button
                        style={{
                          margin: "auto",
                          color: "red",
                        }}
                        onClick={() => handleDelete(tables.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                  {tables.role === 1 && <td className={modules.td}></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
