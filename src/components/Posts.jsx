import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPostsQuery, useDeletePostMutation } from "../api/apiSlice";
export function Posts() {
  let { id } = useParams();
  const navigate = useNavigate();

  const { data: posts, isLoading, isError, error } = useGetPostsQuery(id);

  const [deletePost] = useDeletePostMutation();

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container container-table">
      <button className="btn-back contrast" onClick={() => navigate(-1)}>
        Back to Page
      </button>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>
                <button onClick={() => deletePost(item.id)} className="outline">
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
