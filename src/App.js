import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MediaDetails from './components/MediaDetails';
import RegisterMedia from './components/RegisterMedia';
import api from './services/api';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/media/:id" element={<MediaDetails />} />
        <Route path="/register-media" element={<RegisterMedia />} />
      </Routes>
    </Router>
  );
}

const Home = () => {
  const [medias, setMedias] = useState([]);
  const [votosTotais, setVotosTotais] = useState({ votos_positivos: 0, votos_negativos: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
    const fetchAllData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        
        const [mediasResponse, votosResponse] = await Promise.all([
          api.get('/Medias'),
          api.get('/Votos')
        ]);
        console.log(mediasResponse.data)
        console.log(votosResponse.data)
        
        setMedias(mediasResponse.data || []);
        
        setVotosTotais(votosResponse.data || { votos_positivos: 0, votos_negativos: 0 });

        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          navigate('/login');
        } else {
          setError('Erro ao buscar os dados.');
          setLoading(false);
        }
      }
    };
    fetchAllData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (loading) return <div className="container mt-5"><p>Carregando filmes...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-danger">{error}</p></div>;

    return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Mídias</h1>
        <div className="d-flex align-items-center">
            <Link to="/register-media" className="btn btn-primary me-2">
                Adicionar Mídia
            </Link>
            <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
        </div>
      </div>
      
      {}
      <div className="mb-4">
          <p>
              <strong>Votos Gerais:</strong>
              <span className="badge bg-primary me-2 ms-2">
                  👍 {votosTotais.votos_positivos}
              </span>
              <span className="badge bg-danger">
                  👎 {votosTotais.votos_negativos}
              </span>
              <span className="badge bg-secondary ms-2">
                  Total: {votosTotais.total_votos}
              </span>
          </p>
      </div>

      <div className="row">
        {medias.length > 0 ? (
          medias.map(media => (
            <div key={media.id} className="col-md-4 mb-4">
              <Link to={`/media/${media.id}`} className="text-decoration-none">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{media.titulo}</h5>
                    <p className="card-text">
                      <strong>Gêneros:</strong> {media.genero.join(', ')}
                    </p>
                    <span className="badge bg-primary me-2">👍 {media.votos_positivos}</span>
                    <span className="badge bg-danger">👎 {media.votos_negativos}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col"><p>Nenhuma mídia encontrada.</p></div>
        )}
      </div>
    </div>
  );
};

export default App;