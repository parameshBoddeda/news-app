import { useEffect, useState } from 'react';
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';

const category =[
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
]


const NewsApp = () => {

    const [article, setArticle] = useState([]);
    const [totalArticle, setTotalArticle] = useState(0);
    const [currentPage, setCurrentPage] = useState(undefined);
    const [selectedCategory, setSelectedCategory] = useState('general');


    const loadNews = (pageNo = 1) => {
        axios({
            method: "GET",
            url: "https://newsapi.org/v2/top-headlines",

            params: {
                country: 'in',
                apiKey: '693d12bccb004b6bbee4b78fda91511d',
                category: selectedCategory,
                page: pageNo
            }


        }).then((response) => {
            if(response.status === 200){
                setArticle([...article, ...response.data.articles])
                setTotalArticle(response.data.totalResults)
                setCurrentPage(pageNo)
            }
          
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        loadNews()
    },[])

    useEffect(() => {
        loadNews()
    },[selectedCategory])

    return (
        <>
            <h1>NEWS</h1>
            <div>
                {
                    category.map((category,index)=>{
                        return(
                            <button className='btn btn-primary' style={{margin: 20}} onClick={()=>{
                                setArticle([])
                                setSelectedCategory(category)
                            }} key={index}>{category}</button>
                        )
                       
                    })
                }
            </div>
            <InfiniteScroll
                style={{ display: 'flex', flexWrap: 'wrap', width: '100%'}}

                datalength={article.length}
                loadMore={() => {
                    loadNews(currentPage + 1)

                }}
                hasMore={totalArticle !== article.length}

            >
                {
                    article.map((news, index) => {
                        return (

                            <div className="card" style={{ width: '14rem', margin: 20}} key={index}>
                                <img className="card-img-top" src={news.urlToImage} alt="" style={{ width: '100%', height: 150 }} />
                                <h5 className="card-title">{news.title}</h5>
                                <p className="card-text">{news.description}</p>
                            </div>

                        )

                    })




                }
            </InfiniteScroll>


        </>

    )
}

export default NewsApp;