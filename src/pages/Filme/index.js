import { useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filmeInfo.css'

export default function Filme(){
    const {id} = useParams();
    const [filme,setFilme] = useState({})
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        async function loadingFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: "85ce3425b5f20922bf81d5bb096cb42a",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false)
            })
            .catch(()=>{
                navigate("/", {replace:true})
                return;
            })
        }
        loadingFilme();

        return() =>{
            console.log('COMPONENTE DESMONTADO')
        }
    },[navigate,id])

   
    function salverFilme(){
        const minhaLista = localStorage.getItem("@filmes")

        let filmesSalvos = JSON.parse(minhaLista) || [];
        
        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)

        if(hasFilme){
            alert("ESSE FILME JA ESTAR NA SUA LISTA DE FAVORITOS")
            return;
        }

        filmesSalvos.push(filme)

        localStorage.setItem("@filmes", JSON.stringify(filmesSalvos));
        alert("FILME SALVO COM SUCESSO")
    }
   
    if(loading){
        return(
            <div>
                <h1>Carregando Filme...</h1>
            </div>
        )
    }

    

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salverFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}