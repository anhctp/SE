import {
    Button,
    Card,
    Col,
    Form,
    Input,
    Modal,
    Row,
    Typography,
    notification,
  } from "antd";
  import { useEffect, useRef, useState } from "react";
  import {
    PlusCircleFilled,
    EditFilled,
    DeleteFilled,
    StopOutlined,
    SaveOutlined,
  } from "@ant-design/icons";
  import { motion } from "framer-motion";
  import client from "../../utils/client";
  export default function AddCardModal({ isModalOpen, setIsModalOpen }) {
    const [cards, setCards] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const originalValue = useRef({ front: "", back: "" });
  
    const saveAllCard = async () => {
      for (const card of cards) {
        try {
          await client.post("flashcards", card);
          notification.success({
            message: "Added card with word" + card.front + "!",
          });
          setIsModalOpen(false);
        } catch (error) {
          notification.error({ message: "Có lỗi xảy ra vui lòng thử lại sau" });
        }
      }
    };
  
    const onFinish = () => {
      alert("Edit successfully");
    };
    const onFinishFailed = () => {
      alert("Please try again");
    };
  
    const removeCard = (index) => {
      const newCardList = [...cards];
      setCards(newCardList.filter((e) => e.id !== index));
    };
    const edit = (index) => {
      if (index != -1) save();
      setEditIndex(index);
      const editingCard = cards[index];
      console.log(editingCard);
      originalValue.current = {
        ...editingCard,
      };
    };
    const save = () => {
      setEditIndex(-1);
      originalValue.current = {};
    };
    return (
      <Modal
        width={1000}
        title="Add New FlashCards"
        open={isModalOpen}
        onOk={saveAllCard}
        onCancel={() => setIsModalOpen(false)}
      >
        <div style={{ padding: "24px" }}>
          <Row style={{ maxHeight: "405px", overflowY: "auto" }}>
            {cards.map((card, index) => (
              <Col key={card.id} span={12}>
                <motion.div
                  className="box"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <Card
                    title={
                      <Row justify="space-between" align="middle">
                        <Col span={10}>
                          <Typography.Title level={3}>
                            {`Flash Card #${index + 1}`}
                          </Typography.Title>
                        </Col>
                        <Col span={14}>
                          {editIndex === card?.id ? (
                            <>
                              <Button
                                onClick={save}
                                type="dashed"
                                icon={<SaveOutlined />}
                              >
                                Save
                              </Button>
                            </>
                          ) : (
                            <Button
                              onClick={() => edit(card.id)}
                              icon={<EditFilled />}
                            ></Button>
                          )}
                          <Button
                            onClick={() => removeCard(card.id)}
                            icon={<DeleteFilled />}
                          ></Button>
                        </Col>
                      </Row>
                    }
                  >
                    <Form
                      name="basic"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      style={{ display: "flex", justifyContent: "space-evenly" }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                      layout="vertical"
                    >
                      <Form.Item
                        label="Word"
                        name="word"
                        rules={[
                          { required: true, message: "Please input your Word!" },
                        ]}
                      >
                        <Input
                          disabled={editIndex != card.id}
                          defaultValue={card?.front || ""}
                          value={
                            cards.find((e) => e?.id === card.id)?.front || ""
                          }
                          onChange={(e) => {
                            setCards(
                              cards.map((loopCard) => {
                                if (card.id == loopCard.id)
                                  return { ...loopCard, front: e.target.value };
                                return loopCard;
                              })
                            );
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Meaning"
                        name="meaning"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Meaning!",
                          },
                        ]}
                      >
                        <Input
                          disabled={editIndex != card.id}
                          defaultValue={card?.back || ""}
                          value={cards.find((e) => e?.id === card.id)?.back || ""}
                          onChange={(e) => {
                            setCards(
                              cards.map((loopCard) => {
                                if (card.id == loopCard.id)
                                  return { ...loopCard, back: e.target.value };
                                return loopCard;
                              })
                            );
                          }}
                        />
                      </Form.Item>
                    </Form>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
          <Row style={{ marginTop: "12px" }} justify="center">
            <Col span={12}>
              <Button
                onClick={() => {
                  setCards([
                    ...cards,
                    {
                      front: "",
                      back: "",
                      id: parseInt(Math.random() * 10000000),
                    },
                  ]);
                }}
                style={{ width: "100%" }}
                type="primary"
                icon={<PlusCircleFilled />}
              >
                Add
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
  