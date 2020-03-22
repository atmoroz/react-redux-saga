import React from "react";

import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/action";
import { Loader } from "./Loading";

export default () => {
  const dispath = useDispatch();

  const posts = useSelector(state => state.posts.fetchedPosts);
  const loading = useSelector(state => state.app.loading);
  if (loading) {
    return <Loader />;
  }
  if (!posts.length) {
    return (
      <button className="btn btn-primary" onClick={() => dispath(fetchPosts())}>
        Загрузить
      </button>
    );
  }
  return posts.map(post => <Post post={post} key={post.id} />);
};
