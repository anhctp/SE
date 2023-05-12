import client from "../utils/client";

class LessonService {
  getAll() {
    return client.get("lessons");
  }
}

export default new LessonService();
