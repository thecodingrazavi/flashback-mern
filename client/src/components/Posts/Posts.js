import React from "react";
import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux'

import Post from "./Post/Post";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  
  if(!posts.length && !isLoading) return 'No posts';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} xs={12} sm={12} md={6} lg={4} item>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
