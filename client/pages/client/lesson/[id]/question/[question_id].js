/*
1. Trong file question.js, useRouter hook để lấy giá trị của id và question_id từ URL. 
Sau đó, gọi API endpoint /api/lesson/{id}/question/{question_id} để lấy thông tin về câu hỏi hiện tại. 
Sử dụng axios để thực hiện yêu cầu GET này.
2. Sử dụng các giá trị trả về từ API endpoint để cập nhật trạng thái của component.
3. Nút để submit câu trả lời và kiểm tra đáp án. Gọi API endpoint /api/lesson/{id}/question/{id} để submit câu trả lời và kiểm tra đáp án.
4. Khi nhận được kết quả trả về từ API endpoint, cập nhật trạng thái của component để hiển thị kết quả đúng hoặc sai. 
Sử dụng một biến Boolean để kiểm tra xem câu trả lời đã đúng hay sai, và một biến để lưu trữ điểm số của người dùng.
5. Sử dụng useEffect hook để chuyển đến câu hỏi tiếp theo khi người dùng trả lời câu hỏi hiện tại hoặc chọn nút để chuyển đến câu hỏi trước đó hoặc tiếp theo.
*/

import modules from "../../../../../styles/Lesson.module.css";
import styles from "../../../../../styles/Home.module.css";
import Sidebar from "./../../../../component/sidebar";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import client, { BASE_URL } from "../../../../../utils/client";
import { notification } from "antd";
import token from "../../../../../utils/token";

export default function Create() {
  //GET
  const router = useRouter();
  const { id, question_id } = router.query;
  const [questions, setQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(null);
  const [trueAns, setTrueAns] = useState("");

  //GET
  useEffect(() => {
    const fetchQuestion = async () => {
      if (id && question_id) {
        const result = await axios.get(
          `http://localhost:8000/api/lesson/${id}/question/${question_id}`
        );
        setQuestion(result.data);
        setScore(null); //sau POST
        setTrueAns(result.data.t_ans);
      }
    };
    fetchQuestion();
  }, [id, question_id]);

  //post
  const handleSubmit = async (ans) => {
    try {
      if (ans === trueAns) {
        const result = await client.post(
          `http://localhost:8000/api/lesson/${id}/question/${question_id}`,
          { answer: ans }
        );
        // Update the score if the request was successful

        notification.success({ message: "Your score: " + result.score });
      } else {
        notification.error({ message: "The correct answer is: " + trueAns });
      }
    } catch (error) {
      notification.error({
        message: "Bạn chưa đăng nhập",
      });
      router.push("../../../../auth/login");
    }
  };

  //chuyển câu hỏi
  const [currentID, setCurrentID] = useState(0);
  function handlePreviousID() {
    if (currentID > 0) {
      setCurrentID(currentID - 1);
      if (parseInt(question_id) >= 1) {
        router.push(
          `../../../lesson/${id}/question/${parseInt(question_id) - 1}`
        );
      }
    }
  }

  function handleNextID() {
    if (currentID < parseInt(questions.question_num) - 1) {
      setCurrentID(currentID + 1);
      if (parseInt(question_id) <= parseInt(questions.question_num)) {
        router.push(
          `../../../lesson/${id}/question/${parseInt(question_id) + 1}`
        );
      }
    }
  }

  return (
    <main>
      <div className={styles.containerCol}>
        <Sidebar />

        <div className={styles.column2}>
          <div className={modules.box3}>
            Lesson {id}: {questions.title}
          </div>
          <div className={modules.boxQuestion}>
            <p className={modules.p}>Question {question_id}: </p>
            <h3 style={{ fontSize: "32px", paddingTop: "10px" }}>
              {questions.question}
            </h3>
          </div>
          <p style={{paddingLeft:'100px'}} className={modules.p}>Choose the correct answer:</p>
          <div className={modules.boxMCQ}>
            <button
              className={
                answer === questions.t_ans
                  ? modules.boxAnswerActive
                  : modules.boxAnswer
              }
              onClick={() => setAnswer(questions.t_ans)}
            >
              A: {questions.t_ans}
            </button>
            <button
              className={
                answer === questions.f_ans1
                  ? modules.boxAnswerActive
                  : modules.boxAnswer
              }
              onClick={() => setAnswer(questions.f_ans1)}
            >
              B: {questions.f_ans1}
            </button>
          </div>
          <div className={modules.boxMCQ}>
            <button
              className={
                answer === questions.f_ans2
                  ? modules.boxAnswerActive
                  : modules.boxAnswer
              }
              onClick={() => setAnswer(questions.f_ans2)}
            >
              C: {questions.f_ans2}
            </button>
            <button
              className={
                answer === questions.f_ans3
                  ? modules.boxAnswerActive
                  : modules.boxAnswer
              }
              onClick={() => setAnswer(questions.f_ans3)}
            >
              D: {questions.f_ans3}
            </button>
          </div>

          <div>
            <button
              className={modules.buttonSubmit}
              type="submit"
              onClick={() => handleSubmit(answer)}
            >
              Submit
            </button>
          </div>

          <span className={modules.ID_number}>
            <button className={modules.button} onClick={handlePreviousID}>
              <div style={{ fontSize: "18px" }}>{"<"}</div>
            </button>

            <div style={{ margin: "0 10px", fontSize: "18px" }}>
              {currentID + 1} / {parseInt(questions.question_num)}
            </div>

            <button className={modules.button} onClick={handleNextID}>
              <div style={{ fontSize: "18px" }}>{">"}</div>
            </button>
          </span>
        </div>
      </div>
    </main>
  );
}
