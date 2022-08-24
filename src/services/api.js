import axios from 'axios';


//base da api : https://api.themoviedb.org/3/
// lançamentos : now_playing?api_key=85ce3425b5f20922bf81d5bb096cb42a&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api