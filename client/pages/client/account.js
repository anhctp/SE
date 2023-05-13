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
import validator from "validator";
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
  const [completedLesson, setCompletedLesson] = useState(0);
  const gridStyle = {
    width: "100%",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "900",
    margin: "10px auto 10px",
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
      if (validator.isEmail(values.email)) {
        try {
          await authSevice.update(values);
          setIsModalOpen(false);
          notification.success({
            message: "Bạn đã cập nhật tài khoản thành công",
          });
          setProfile(values);
        } catch (error) {
          notification.error({ message: "Bạn chưa nhập đủ thông tin" });
        }
      } else {
        notification.error({message: "Email chưa chính xác"})
      }
    },
  });

  useEffect(() => {
    lessonService.getAll().then((res) => {
      console.log(res.filter((e) => e.id == completedLesson));
      setLessons(res.filter((e) => e.id == completedLesson));
    });
  }, [completedLesson]);

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
        console.log(res);
        setCompletedLesson(res.complete_lesson);
        setProfile(res);
      } catch (error) {
        notification.error({ message: "Bạn chưa đăng nhập" });
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

            <div style={{ display: "flex", marginTop: "20px" }}>
              <div
                style={{
                  fontWeight: "500",
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                orientation="left"
              >
                <Row
                  style={{
                    width: "100%",
                    paddingLeft: "40px",
                    marginRight: "auto",
                  }}
                >
                  <Typography.Title level={2}>Flash Card</Typography.Title>{" "}
                </Row>

                <Row
                  style={{
                    overflowY: "auto",
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "400px",
                  }}
                  justify="center"
                >
                  <Col
                    span={18}
                    style={{
                      fontSize: "24px",
                    }}
                  >
                    <Skeleton loading={loading} avatar active></Skeleton>
                    {!loading &&
                      flashCards.map((card) => (
                        <div
                          style={{
                            width: "100%",
                            position: "relative",
                            marginTop: "20px",
                            borderRadius: "10px",
                            backgroundColor: "#ffb300",
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
              </div>

              <div
                style={{
                  fontWeight: "500",
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderLeft: "lightgray 1px solid",
                }}
                orientation="left"
              >
                <Row
                  style={{
                    width: "100%",
                    paddingLeft: "40px",
                    marginRight: "auto",
                  }}
                >
                  <Typography.Title level={2}>Progress</Typography.Title>{" "}
                </Row>

                <Row
                  style={{
                    position: "relative",
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "400px",
                  }}
                >
                  <Col
                    span={18}
                    style={{
                      fontSize: "24px",
                      paddingLeft: "80px",
                    }}
                  >
                    <div>
                      <Skeleton loading={loading} avatar active></Skeleton>
                      <div>
                        {!loading && (
                          <div
                            style={{
                              border: "2px #ffb200 solid",
                              borderRadius: "10px",
                              width: "120%",
                              height: "65px",
                              position: "relative",
                              marginTop: "20px",
                            }}
                          >
                            {lessons.length == 0 && (
                              <Typography>
                                You haven't learned any lesson yet.
                              </Typography>
                            )}
                            {lessons.map((lesson) => (
                              <Card.Grid style={gridStyle} key={lesson.id}>
                                Lesson {lesson.id}: {lesson.title}
                              </Card.Grid>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
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
