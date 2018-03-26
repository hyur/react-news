import React from 'react';
import { Row, Col } from 'antd';
import {
    Tabs,
    Icon,
    Menu,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Card,
    notification,
    Upload
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
import { Router, Route, Link, browserHistory } from 'react-router';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileUserCenter extends React.Component {
    constructor() {
        super();
        this.state = {
            usercollection: '',
            usercomments: '',
            previewImage: '',
            previewVisible: false
        }
    }
    componentDidMount() {
        const myFetchOptions = {
            method: 'GET'
        };
        // 获取收藏
        fetch("http://newsapi.gugujiankong.com/handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ usercollection: json });
                console.log(json);
            });
        // 获取评论
        fetch("http://newsapi.gugujiankong.com/handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({ usercomments: json });
            });
    }

    render() {
        const fileList = [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }, {
            uid: -2,
            name: 'yyy.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }];
        const props = {
            action:'http://newsapi.gugujiankong.com/handler.ashx',
            headers:{
                "Access-Control-Allow-Origin":"*"
            },
            listType:'picture-card',
            // listType: 'picture',
            defaultFileList: [...fileList],
        };
        const { usercollection, usercomments } = this.state;
        const usercollectionList = usercollection.length ?
            usercollection.map((uc, index) => (
                <Card key={index} title={uc.uniquekey} extra={<a href={`/details/${uc.uniquekey}`}>查看</a>}>
                    <p>{uc.Title}</p>
                </Card>
            ))
            :
            '您还没有任何收藏';

        const usercommentsList = usercomments.length ?
            usercomments.map((comment, index) => (
                <Card key={index} title={`于${comment.datetime}评论了文章`} extra={<a href={`/details/${comment.uniquekey}`}>查看</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :
            '您还没有任何的评论';
        return (<div class="qq">
            <MobileHeader />
            <Row>
                <Col span={24}>
                    <Tabs>
                        <TabPane tab="收藏列表" key="1">
                            <Row>
                                <Col span={24}>
                                    {usercollectionList}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="评论列表" key="2">
                            <Row>
                                <Col span={24}>
                                    {usercommentsList}
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tab="个人设置" key="3">
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> 上传
                                </Button>
                            </Upload>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <MobileFooter />
        </div>)
    }
}







