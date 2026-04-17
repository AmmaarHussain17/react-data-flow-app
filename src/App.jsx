import { useEffect, useState } from "react";
import FlowComponent from "./FlowComponent";
import PostList from "./PostList";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const cached = localStorage.getItem("posts");

    if (cached) {
      setPosts(JSON.parse(cached));
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
          setPosts(data);
          localStorage.setItem("posts", JSON.stringify(data));
        });
    }
  }, []);

  return (
  <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      padding: "20px",
      color: "white",
    }}
  >
    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
      React Data Flow App
    </h1>

    <PostList />
    <FlowComponent posts={posts} />
  </div>
  );
}

export default App;