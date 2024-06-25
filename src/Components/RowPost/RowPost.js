import React,{useEffect,useState} from 'react'
import './RowPost.css'
import YouTube from 'react-youtube'
import { imageUrl,API_KEY } from '../../constant/constant'
import axios from '../../axios'

function RowPost(props) {
  const [movies,setMovie] = useState([])
  const [urlId,setUrlId] =useState('')
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  useEffect(()=>{
    axios.get(props.url).then(response=>{
         setMovie(response.data.results)
    }).catch(err=>{
      alert('Network error')
    })
  })
  const handleMove=(id)=>{
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!==0){
        setUrlId(response.data.results[0])
      }else{
        console.log('Array empty')
      }

    })

  }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
          {movies.map((obj)=>
            <img onClick={()=>handleMove(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`}/>

          )}
            
           
        </div>
     { urlId &&   <YouTube opts={opts}  videoId={urlId.key}/> }
      
    </div>
  )
}

export default RowPost
