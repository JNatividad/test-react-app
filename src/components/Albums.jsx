import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useGetAlbumsQuery } from "../api/apiSlice";

export function Albums() {
  const navigate = useNavigate();
  let { id } = useParams();

  const { data: albums, isLoading, isError, error } = useGetAlbumsQuery(id);

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
            <th>Album ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.id}</td>
              <td>{album.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
