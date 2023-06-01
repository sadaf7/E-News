import React,{useState,useEffect} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props) => {

    const {pageSize,country,category,setProgress} = props;
    
    let initialArticle=[]
    const [article, setArticle] = useState(initialArticle)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalResult] = useState(0)
    const [loading, setLoading] = useState(false)
    
    const updateNews=async()=>{
        setProgress(15)
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=89038d9c277d407da281ab595cfc1484&page=${page}&pageSize=${pageSize}`
        setProgress(30)
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        setProgress(70)
        setArticle(parsedData.articles)
        setTotalResult(parsedData.totalResult)
        setLoading(false)
        setProgress(100)
    }
    const capitalizeLetter = (word)=>{
      return word.charAt(0).toUpperCase()+word.slice(1);
    }
    useEffect(() => {
      document.title = `${capitalizeLetter(category)}-E-News`
      updateNews();
      // eslint-disable-next-line 
    }, [])
    
    let fetchMoreData=async()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=89038d9c277d407da281ab595cfc1484&page=${page+1}&pageSize=${pageSize}`
        setPage(page+1);        
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticle(article.concat(parsedData.articles))
        setTotalResult(parsedData.totalResult)
    }
  return (
    <>
    
    <h1 className='mt-6 text-center'>{capitalizeLetter(category)} Top-Headlines</h1>
      {loading && <Spinner/>}
      <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalResult}
          loader={<Spinner/>} 
        >
          <div className="container">
        <div className="row">           
            {!loading && article.map((element)=>{
                return <div className="col-md-4 mt-4" key={element.url}>
                <Newsitem author={element.author} source={element.source.name} date={element.publishedAt} title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,40):""} imgUrl={element.urlToImage} newsUrl={element.url}/>
              </div>
            })}
        </div>
            </div>
            </InfiniteScroll>
    

    </>
  )
}

export default News
