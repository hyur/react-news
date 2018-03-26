import React from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImagesBlock from './pc_news_image_block';
import CommonComments from './common_comments';
import {Row,Col} from 'antd';

export default class PCNewsDetails extends React.Component{
    constructor(){
        super();
        this.state={
            newsItem:''
        }
    }
    componentDidMount(){
        var myFetchOptions={
            method:'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey="+this.props.match.params.uniquekey,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({newsItem:json});
            document.title = this.state.newsItem.title+"-React News | React驱动的新闻平台";
        });
    }
    createMakeup(){
       return {__html:this.state.newsItem.pagecontent};
    }
    render(){
        return(<div>
            <PCHeader/>
            <Row>
                <Col span = {2}></Col>
                <Col span = {14} className = "container">
                    <div class = "articleContainer" dangerouslySetInnerHTML = {this.createMakeup()}></div>
                    <hr/>
                    <CommonComments uniquekey = {this.props.match.params.uniquekey}/>
                </Col>
                <Col span = {6}>
                    <PCNewsImagesBlock count = {40} type = "top" width = "100%" cardTitle="相关新闻" imageWidth = "125px" cardTitle = "相关新闻"/>
                </Col>
                <Col span = {2}></Col>
            </Row>
            <PCFooter/>
        </div>)
    }
}
