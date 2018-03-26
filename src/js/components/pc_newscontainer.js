import React from 'react';
import {Row,Col,Tabs,Carousel} from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImagesBlock from './pc_news_image_block';
import PCProduct from './pc_product';
export default class PCNewscontainer extends React.Component{
    render(){
        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        };
        return(
            <div>
            <Row>
                <Col span = {2}></Col>
                <Col span = {20} class = "container">
                    <div class = "leftContainer">
                        <div class = "carousel">
                            <Carousel {...settings}>
                                <div><img src = "./src/images/carousel_1.jpg"/></div>
                                <div><img src = "./src/images/carousel_2.jpg"/></div>
                                <div><img src = "./src/images/carousel_3.jpg"/></div>
                                <div><img src = "./src/images/carousel_4.jpg"/></div>
                            </Carousel>
                        </div>
                        <PCNewsImagesBlock count ={6} type="yule" width = "400px" cardTitle = "娱乐头条" imageWidth = "112px"/>
                    </div>
                    <Tabs class = "tabs_news">
                        <TabPane tab = "头条新闻" key = "1">
                            <PCNewsBlock count = {21} type = "top" width = "100%" bordered="false"/>
                        </TabPane>
                        {/* <TabPane tab = "科技新闻" key = "2">
                            <PCNewsBlock count = {20} type = "keji" width = "100%" bordered = "false"/>
                        </TabPane> */}
                        <TabPane tab = "国际新闻" key = "2">
                            <PCNewsBlock count = {20} type = "guoji" width = "100%" bordered = "false"/>
                        </TabPane>
                    </Tabs>
                    <Tabs class = "tabs_product">
                        <TabPane tab ="网易产品" key="1">
                            <PCProduct/>
                        </TabPane>
                    </Tabs>
                    <br/>
                    <div>
                       <PCNewsImagesBlock count = {8} type="guonei" width="100%" cardTitle="国内新闻" imageWidth="130px"/>
                       <PCNewsImagesBlock count = {16} type="yule" width="100%" cardTitle="娱乐新闻" imageWidth="130px"/> 
                       <PCNewsImagesBlock count = {16} type="tiyu" width="100%" cardTitle="体育新闻" imageWidth="130px"/> 
                       <PCNewsImagesBlock count = {13} type="shehui" width="100%" cardTitle="社会新闻" imageWidth="130px"/> 
                    </div>
                </Col>
                <Col span = {2}></Col>
            </Row>
        </div>
        )
    }
}