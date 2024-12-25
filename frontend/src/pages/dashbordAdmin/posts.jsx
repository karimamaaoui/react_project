import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../context/AuthContext";
import PostList from "./PostList";
import PostFormModal from "./postForm";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cookies] = useCookies(["jwt"]);
    const { auth } = useContext(AuthContext);
    const [users, setUsers] = useState([]); 

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/auth/getAll", {
                withCredentials: true,
            });
            setUsers(response.data);
            console.log("users",response.data)
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchPosts = async () => {
      setLoading(true);
  
      try {
        const response = await axios.get("http://localhost:8000/api/posts/getAll", {
          withCredentials: true,
        });
        setPosts(response.data);
        console.log("posts",response.data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPosts();
      fetchUsers();
    }, [auth.token, cookies.jwt]);
  
    
    return (
      <>
        <PostFormModal fetchPosts={fetchPosts} />
        <PostList  posts={posts} loading={loading}  users={users}/>
      </>
    );
  }
  
  export default Posts;
  