import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const MediaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userVote, setUserVote] = useState(null);

  const fetchMedia = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const mediaResponse = await api.get(`/medias/${id}`);
      setMedia(mediaResponse.data);
      
      const voteResponse = await api.get(`/votos/reacao/${id}`);
      setUserVote(voteResponse.data.reacao);

      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      } else if (err.response && err.response.status === 404) {
        setError('Mídia não encontrada.');
        setLoading(false);
      } else {
        setError('Erro ao buscar os dados.');
        setLoading(false);
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

const handleVote = async (reacao) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para votar!');
      navigate('/login');
      return;
    }

    try {
      if (userVote === reacao) {
        await api.delete('/votos', {
          data: {
            mediaId: parseInt(id),
          }
        });
        setUserVote(null);
      } else {
        const voteData = {
          mediaId: parseInt(id),
          reacao: reacao,
        };
        await api.post('/votos', voteData);
        setUserVote(reacao);
      }

      await fetchMedia();
      alert('Voto registrado com sucesso!');

    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Sessão expirada. Faça login novamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      } else {
        alert('Erro ao registrar voto. Tente novamente.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (loading) return <div className="container mt-5"><p>Carregando detalhes...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-danger">{error}</p></div>;
  if (!media) return null;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-danger" onClick={handleLogout}>Sair</button>
      </div>
      <div className="row">
        <div className="col-md-4">
          <img src={media.imagem_url} alt={media.titulo} className="img-fluid rounded" />
        </div>
        <div className="col-md-8">
          <h1>{media.titulo}</h1>
          <p className="lead">{media.descricao}</p>
          <hr />
          <p>
            <strong>Gêneros:</strong> {media.genero.join(', ')}
          </p>
          <p>
            <strong>Votos:</strong>
            <span className="badge bg-primary me-2 ms-2">👍 {media.votos_positivos}</span>
            <span className="badge bg-danger">👎 {media.votos_negativos}</span>
          </p>
          
          <div className="mt-4">
            <button
              className={`btn ${userVote === true ? 'btn-success' : 'btn-outline-success'} me-2`}
              onClick={() => handleVote(true)}
            >
              👍 Curtir
            </button>
            <button
              className={`btn ${userVote === false ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={() => handleVote(false)}
            >
              👎 Não Curtir
            </button>
          </div>
          
          <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
            Voltar para a lista
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaDetails;