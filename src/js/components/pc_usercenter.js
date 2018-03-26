import React from 'react';
import{Row,Col,Tabs,Card,Upload,Menu,Icon,Modal}from 'antd';
const TabPane = Tabs.TabPane;
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import { updateLocale } from 'moment';
export default class PCUserCenter extends React.Component{
    constructor(){
        super();
        this.state={
            userCollection:'',
            userComments:'',
            previewImage:'',
            previewVisible:false,
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
              }]
        }
    }
    componentDidMount(){
        console.log(this.state.previewImage);
        const myFetchOptions= {
            method:'GET'
        }
        // 获取用户收藏
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid="+localStorage.userid,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({userCollection:json});
        });
        // 获取用户评论
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid="+localStorage.userid,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({userComments:json});
        });
    }
    render(){
        const props={
            action:'http://newsapi.gugujiankong.com/handler.ashx',
            headers:{
                "Access-Control-Allow-Origin":"*"
            },
            listType:'picture-card',
            defaultFileList:[{
                uid:-1,
                name:'xxx-png',
                state:'done',
                url:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
                thumbUrl:'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
            }],
            onPreview:(file)=>{
                this.setState({previewImage:file.url||file.thumbUrl,previewVisible:true});
            },
            onChange:({ fileList }) => this.setState({ fileList })
        };
       
        const {userCollection,userComments}= this.state;
        const userCollectionList = userCollection.length?
            userCollection.map((us,index)=>(
                <Card key = {index} title={us.uniquekey} extra={<a target="_blank" href = {`/details/${us.uniquekey}`}>查看</a>}>
                    <p>{us.Title}</p>
                </Card>
            ))
            :'你还没有任何收藏';

        const userCommentsList = userComments.length?
            userComments.map((comment,index)=>(
                <Card key = {index} title={`于${comment.datetime}收藏了${comment.uniquekey}`} extra={<a target = "_blank" href = {`/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :'您还没有任何的评论';
        // 图片上传
         const { previewVisible, previewImage, fileList } = this.state;
         const uploadButton = (<div>
             <Icon type="plus"/>
            <div className="ant-upload-text">上传照片<br/>(最多3张)</div>
         </div>)
        return(<div>
            <PCHeader/>
            <Row>
                <Col span = {2}></Col>
                <Col span = {20}>
                    <Tabs>
                        <TabPane tab = "我的评论列表" key = "1">
                            <div class="comment">
                                <Row>
                                    <Col span = {24}>
                                        {userCommentsList}
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab = "我的收藏列表" key = "2">
                            <div class = "comment">
                                <Row>
                                    <Col>
                                        {userCollectionList}
                                    </Col>
                                </Row>
                            </div>
                        </TabPane>
                        <TabPane tab = "头像设置" key = "3">
                            <div class = "clearfix">
                                <Upload {...props}>
                                    {fileList.length>=3?null:uploadButton}
                                </Upload>
                                <Modal visible={previewVisible} footer={null} onCancel={()=>{this.setState({previewVisible:false})}}>
                                    <img alt="预览" src={previewImage}/>
                                </Modal>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
                <Col span = {2}></Col>
            </Row>
            <PCFooter/>
        </div>)
    }
}