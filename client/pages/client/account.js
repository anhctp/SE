import styles from "../../styles/Home.module.css";
import Sidebar from "../component/sidebar";

import { EditOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Skeleton,
  Row,
  Image,
  Typography,
  Button,
  Divider,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import authSevice from "../../services/auth.service";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import client from "../../utils/client";
import dayjs from "dayjs";
import { token } from "../../utils/token";
import lessonService from "../../services/lesson.service";
export default function Account() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flashCards, setFlashCards] = useState([]);
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

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
      try {
        await authSevice.update(values);
        setIsModalOpen(false);
        window.location.reload();
        notification.success({
          message: "Bạn đã cập nhật tài khoản thành công",
        });
        setProfile(values);
      } catch (error) {
        notification.error({ message: error.response.data.message });
      }
    },
  });

  useEffect(() => {
    lessonService.getAll().then((res) => {
      setLessons(res);
    });
  }, []);

  useEffect(() => {
    const getFlashCards = async () => {
      try {
        const response = await client.get("flashcards");
        setFlashCards(response[0]);
        setLoading(false);
      } catch (error) {
        notification.error({ message: "Có lỗi xảy ra khi lấy thông tin thẻ" });
      }
      setLoading(false);
    };

    const fetchData = async () => {
      try {
        const res = await authSevice.auth();
        getFlashCards();
        setProfile(res);
      } catch (error) {
        notification.error({ message: "Bạn chưa đăng nhập"});
        setLoading(false);
        router.push("/auth/login");
      }
    };
    fetchData();
  }, []);

  return (
    <main>
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
                              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                              preview={{
                                src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
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
                                style={{ margin: 0, fontSize: "48px" }}
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
                                  marginRight: "10px",
                                }}
                                strong
                                italic
                              >
                                Email
                              </Typography.Text>
                              <Typography.Text style={{ fontSize: "20px" }}>
                                {profile.email}
                              </Typography.Text>
                          </Row>
                          </div>
                        </Col>
                        <Col span={6}>
                          <Row justify="center">
                            <Col
                              style={{ marginTop: "12px", width: "100%" }}
                              span={12}
                            >
                              <Button
                                style={{ width: "100%" }}
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
            <Divider style={{ fontWeight: "500" }} orientation="left">
              <Row align="center" justify="space-between">
                <Typography.Title level={2}>Flash Card</Typography.Title>{" "}
              </Row>
            </Divider>
            <Row
              style={{ height: "200px", overflowY: 'scroll' }}
              justify="center"
            >
              
              <Col span={18}>
                <Skeleton loading={loading} avatar active></Skeleton>
                {!loading &&
                  flashCards.map((card) => (
                    <div
                      style={{
                        width: "100%",
                        position: "relative",
                        marginTop: "12px",
                        borderRadius: "10px",
                        backgroundColor: "lightgray",
                      }}
                      key={card.id}
                    >
                      <div style={{ padding: "12px 8px" }}>
                        <h4>{card.front}</h4>
                      </div>
                      <p
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 10,
                          transform: "translateY(-50%)",
                        }}
                      >
                        {dayjs(card.created_at).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  ))}
              </Col>
            </Row>
            <Divider style={{ fontWeight: "500" }} orientation="left">
              <Row align="center" justify="space-between">
                <Typography.Title level={2}>Lessons</Typography.Title>{" "}
              </Row>
            </Divider>
            <Row justify="space-evenly" style={{ padding: "10px 12px" }}>
              <Col span={10}>
                <Card title="Done">
                  <Skeleton loading={loading} avatar active></Skeleton>
                  {!loading && (
                    <Card>
                       {lessons.map((lesson) => (
                        <Card.Grid style={gridStyle} key={lesson.id}>
                          {lesson.title}
                        </Card.Grid>
                      ))}
                    </Card>
                  )}
                </Card>
              </Col>
            </Row>
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
        </div>
      </div>
    </main>
  );
}
