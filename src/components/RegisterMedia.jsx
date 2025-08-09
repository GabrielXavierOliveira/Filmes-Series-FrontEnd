import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const availableGenres = [
  "Ação", "Aventura", "Comédia", "Drama", "Ficção Científica",
  "Fantasia", "Terror", "Animação", "Documentário", "Romance"
];

const RegisterMedia = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem_url, setImagemUrl] = useState('');
  const [genero, setGenero] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setGenero(prevGenres => [...prevGenres, value]);
    } else {
      setGenero(prevGenres => prevGenres.filter(g => g !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (genero.length === 0) {
      setError('Selecione pelo menos um gênero.');
      return;
    }

    try {
      const newMediaData = { titulo, descricao, genero, imagem_url };
      const response = await api.post('/medias', newMediaData);

      setMessage(`Mídia "${response.data.titulo}" registrada com sucesso!`);

      setTitulo('');
      setDescricao('');
      setImagemUrl('');
      setGenero([]);

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Falha na conexão com o servidor ou erro ao registrar a mídia.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3>Registrar Nova Mídia</h3>
              <Link to="/" className="btn btn-secondary">Voltar</Link>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                <div className="mb-3">
                  <label htmlFor="tituloInput" className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tituloInput"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="descricaoInput" className="form-label">Descrição</label>
                  <textarea
                    className="form-control"
                    id="descricaoInput"
                    rows="3"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="imagemUrlInput" className="form-label">URL da Imagem</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imagemUrlInput"
                    value={imagem_url}
                    onChange={(e) => setImagemUrl(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label d-block">Gêneros</label>
                  <div className="d-flex flex-wrap">
                    {availableGenres.map(g => (
                      <div key={g} className="form-check me-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={g}
                          id={`genre-${g}`}
                          checked={genero.includes(g)}
                          onChange={handleGenreChange}
                        />
                        <label className="form-check-label" htmlFor={`genre-${g}`}>
                          {g}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">Registrar Mídia</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterMedia;