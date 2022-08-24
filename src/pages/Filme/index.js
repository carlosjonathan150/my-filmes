import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'


export default function Filme(){
    const {id} = useParams();
    const [filme,setFilme] = useState({})
    const [loading,setLoading] = useState(true);

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

            })
        }
        loadingFilme();

        return() =>{
            console.log('COMPONENTE DESMONTADO')
        }
    },[])

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
        </div>
    )
}