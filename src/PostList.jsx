import { useEffect, useState } from "react";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Fetch + Cache
  useEffect(() => {
    const cachedData = localStorage.getItem("posts");

    if (cachedData) {
      setPosts(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          if (!res.ok) throw new Error("API Failed");
          return res.json();
        })
        .then((data) => {
          setPosts(data);
          localStorage.setItem("posts", JSON.stringify(data));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, []);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Refresh
  const refreshData = () => {
    localStorage.removeItem("posts");
    window.location.reload();
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center" }}>Error: {error}</h2>;
  if (!posts.length) return <h2>No data available</h2>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        marginBottom: "30px",
      }}
    >
      <h1>Posts</h1>

      <button
        onClick={refreshData}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Refresh Data
      </button>

      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "320px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {posts
          .filter((post) =>
            post.title
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase())
          )
          .slice(0, 10)
          .map((post) => (
            <div
              key={post.id}
              style={{
                width: "600px",
                padding: "20px",
                backgroundColor: "#1e1e1e",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            >
              <h3 style={{ color: "#4CAF50" }}>{post.title}</h3>
              <p style={{ color: "#ccc" }}>{post.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;