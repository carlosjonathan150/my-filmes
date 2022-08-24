import './favoritos.css'
import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


export default function Favoritos() {
    const [filmes,setFilmes] = useState([])

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@filmes")
        setFilmes(JSON.parse(minhaLista) || [])
    },[])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id)
        })

        setFilmes(filtroFilmes)
        localStorage.setItem("@filmes", JSON.stringify(filtroFilmes))
    }


  return (
    <div className='meus-filmes'>
         <h1>Meus Filmes</h1>

         {filmes.length === 0  && <span>Você não possui nenhum filme salvo :(</span>}

         <ul>
            {filmes.map((filme)=>{
                return(
                    <li key={filme.id}>
                        <span>{filme.title}</span>
                        <div>
                            <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                            <button onClick={ ()=>excluirFilme(filme.id) }>Excluir</button>
                        </div>
                    </li>
                )
            })}
         </ul>
    </div>
  )
}
