import React from 'react';
import {Row,Col} from 'antd';
import {
    Menu,
    Icon,
    Tabs,
    message,
    Form,
    Input,
    Button,
    Checkbox,
    Modal,
    Card,
    notification
}from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup= Menu.ItemGroup;
class CommonComments extends React.Component{
    constructor(){
        super();
        this.state = {
            comments:''
        }
    }
    // 获取评论
    componentDidMount(){
        const myFetchOptions = {
            method:'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey="+this.props.uniquekey+"",myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({comments:json});
        });
    }
    // 提交评论
    handleSubmit(e){
        e.preventDefault();
        const myFetchOptions = {
            method:'GET'
        };
        const formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"&commnet="+formData.remark,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            console.log(formData.remark);
            this.componentDidMount();
        });
    }

    // 收藏文章
    addUserCollection(){
        const myFetchOptions = {
            method:'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid="+localStorage.userid+"&uniquekey="+this.props.uniquekey+"",myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            notification['success']({message:'ReactNews收藏',description:'收藏此文章成功'});
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const {comments}= this.state;
        // 评论列表
        const commentsList = comments.length?
            comments.map((comment,index)=>(
                <Card key = {index} title = {"用户："+comment.UserName} extra = {<a href = "#">发布于{comment.datetime}</a>}>
                    <p>{comment.Comments}</p>
                </Card>
            ))
            :'没有任何的评论';

        return(<div>
            <Row>
                <Col span = {24}>
                    {commentsList}
                    <Form onSubmit = {this.handleSubmit.bind(this)}>
                        <FormItem label = "您的评论">
                            {getFieldDecorator('remark')(<Input type = "textarea" placeholder="请输入您的评论"/>)} 
                        </FormItem>
                        <Button type = "primary" htmlType = "submit">提交评论</Button>
                        &nbsp;&nbsp;
                        <Button type = "primary" htmlType = "button" onClick = {this.addUserCollection.bind(this)}>收藏此文章</Button>
                    </Form>
                </Col>
            </Row>
        </div>)
    }
};
export default CommonComments=Form.create({})(CommonComments);
