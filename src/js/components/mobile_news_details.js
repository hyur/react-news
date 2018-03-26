import React from 'react';
import {Row,Col,BackTop} from 'antd';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comments';
export default class MobileNewsDetails extends React.Component{
    constructor(){
        super();
        this.state={
            newsItem:""
        }
    }

    componentDidMount(){
        const myFetchOptions = {
            method:'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&unquekey="+this.props.match.params.uniquekey,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({newsItem:json});
            document.title = this.state.newsItem.title+"React News | React驱动的新闻平台";
        });
    }
    createMakeup(){
        return{__html:this.state.newsItem.pagecontent};
    }
    render(){
        return(<div>
            <MobileHeader/>
            <Row>
                <Col span = {24} className = "container">
                    <div class = "articleContainer" dangerouslySetInnerHTML = {this.createMakeup()}></div>
                    <hr/>
                    <CommonComments uniquekey={this.props.match.params.uniquekey}/>
                </Col>
            </Row>
            <MobileFooter/>
        </div>)
    }
}