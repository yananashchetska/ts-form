import "./App.css";
import React, { useState } from "react";
import { Post } from "./types/Post";
import postsFromServer from "./api/posts.json";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { getUserById } from "./services/user";

const initialPosts: Post[] = postsFromServer.map((post) => ({
  ...post,
  user: getUserById(post.userId),
}));

function getNewPostId(posts: Post[]) {
  // return +Math.random().toFixed(12).slice(2);

  const maxId = Math.max(...posts.map((post) => post.id));

  return maxId + 1;
}
export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (post: Post) => {
    const newPost = {
      ...post,
      id: getNewPostId(posts),
    };
    setPosts((currentPosts) => [newPost, ...currentPosts]);
  };
  return (
    <div className="section">
      <h1 className="title">Create a post</h1>

      <PostForm onSubmit={addPost} />
      <PostList posts={posts} />
    </div>
  );
};
export default App;
