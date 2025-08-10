import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {//Realiza operação de Login do usuário
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/Auth/Login', { login, senha });

      //Armazena token e informações do usuario ao storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      
      navigate('/'); //Redireciona a home page
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Falha na conexão com o servidor ou credenciais inválidas.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="loginInput" className="form-label">Usuário</label>
                  <input
                    type="text"
                    className="form-control"
                    id="loginInput"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="senhaInput" className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="senhaInput"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-2">Entrar</button>
              </form>
              <div className="text-center mt-3">
                <Link to="/registro">Não tem uma conta? Crie uma!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;