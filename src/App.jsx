import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import "./App.css";

import { Usuarios } from "./components/Usuarios";
import { LoginForm } from "./components/LoginForm";

import {Posts} from "./components/Posts";
import {Albums} from "./components/Albums";
import {NotFound} from "./components/NotFound";

import { ProtectedRoute } from "./protected/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/posts/:id" element={<Posts />} />
          <Route path="/albums/:id" element={<Albums />} />
        </Route>
       

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
