import React from 'react';
import {Row,Col} from 'antd';
import { Link } from 'react-router-dom';
// 下拉刷新
import Tloader from 'react-touch-loader';
export default class MobileList extends React.Component{
    constructor(){
        super();
        this.state = {
            news:'',
            count:5,
            hasMore: 0,
            initializing: 1,
            refreshedAt: Date.now()
        }
    }

    componentWillMount(){
        const myFetchOptions = {
            method:'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.props.count,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({news:json});
        });
    }
    // 加载更多
    loadMore(resolve) {
        setTimeout(() => {
          var count = this.state.count;
          this.setState({
            count: count+5
          });
        const myFetchOptions = {
            method:'GET'
        }

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type="+this.props.type+"&count="+this.state.count,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({news:json});
        });
        this.setState({hasMore:count>0 && count<50});
        resolve();
        }, 2e3);
      }

      componentDidMount() {
        setTimeout(() => {
          this.setState({
            hasMore: 1,
            initializing: 2 // initialized
          });
        }, 2e3);
      }
    render(){
        const {news,hasMore,initializing,refreshedAt}= this.state;
        const newsList = news.length?
            news.map((newsItem,index)=>(
                <section key = {index} className = "m_article list-item special_section clearfix">
                    <Link to={`/details/${newsItem.uniquekey}`}>
                        <div className = "m_article_img">
                            <img src = {newsItem.thumbnail_pic_s} alt = {newsItem.title}/>
                        </div>
                        <div className = "m_article_info">
                            <div className = "m_article_title">
                                <span>{newsItem.title}</span>
                            </div>
                            <div className = "m_article_desc clearfix">
                                <div className = "m_article_desc1">
                                    <span className = "m_article_channel">{newsItem.type}</span>
                                    <span className = "m_article_time">{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            ))
            :'正在为你快马加鞭的加载新闻';
        return(<div>
            <Row>
                <Col span = {24}>
                <Tloader className="main"
                    onLoadMore={this.loadMore.bind(this)}
                    hasMore={hasMore}
                    initializing={initializing}>
                  {newsList}
             </Tloader>
                   
                </Col>
            </Row>
        </div>)
    }
}