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
    Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import { Link } from 'react-router-dom';
import { locale } from 'moment';
class MobileHeader extends React.Component{
     constructor(){
         super();
         this.state={
             current:'top',
             modalVisible:false,
             action:'login',
             hasLogined:false,
             userNickName:'',
             userid:0
         }
     }
     setModalVisible(value){
        this.setState({modalVisible:value});
    }
    componentWillMount() {
        if (localStorage.userid != '') {
        	this.setState({hasLogined: true});
        	this.setState({userNickName: localStorage.username, userid: localStorage.userid});
        }
    }
    //  登录
     login(){
        this.setModalVisible(true);
     }
    //  处理提交
     handlerSubmit(e){
        e.preventDefault();
        var formData;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                formData = values;
            }
        });
        const myFetchOptions = {
            method:'GET'
        }
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action+"&username="+formData.username+"&password="+formData.password+"&r_userName="+formData.r_username+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
        .then(response=>response.json())
        .then(json=>{
            this.setState({userNickName:json.NickUserName,userid :json.UserId});
            localStorage.setItem("username",json.NickUserName);
            localStorage.setItem("userid",json.UserId);
        });
        if(this.state.action = "login"){
            this.setState({hasLogined:true});
        }
        message.success("请求成功");
        this.setModalVisible(false);
     }
    
     callback(key){
        if(key == 1){
            this.setState({action:'login'});
        }else if(key == 2){
            this.setState({action:'register'});
        }
     }
    //  退出
    logout(){
        localStorage.username='';
        localStorage.userid='';
        this.setState({hasLogined:false});
    }

     render(){
         const { getFieldDecorator } = this.props.form;
         const userShow = this.state.hasLogined?
            <Link to={`/usercenter`}>
                <Icon type="logout" onClick = {this.logout.bind(this)}/>
                <Icon type="smile-o" />
            </Link>
            :
            <Icon type = "login" onClick = {this.login.bind(this)}/>
            // <Icon type="login" />
            ;
         return(<div id = "mobileheader">
            <header>
                <a href = "/">
                    <Icon src = "/src/images/logo.png" alt = ""/>
                    <span>移动新闻</span>
                </a>
                {userShow}
            </header>
            <Modal title = "个人中心" wrapClassName = "vertical-center-modal" visible = {this.state.modalVisible} onOk={() => { this.setModalVisible(false) }} onCancel={() => this.setModalVisible(false)}>
                <Tabs type = "card" onChange = {this.callback.bind(this)}>
                    <TabPane tab = "登录" key = "1">
                        <Form layout='horizontal' onSubmit = {this.handlerSubmit.bind(this)}>
                            <FormItem label = "账号">
                                 {getFieldDecorator('username')(<Input placeholder="请输入您的账号" />)}    
                            </FormItem>
                            <FormItem label = "密码">
                                {getFieldDecorator('password')(<Input placeholder="请输入您的密码" />)}
                            </FormItem>
                            <Button type = "primary" htmlType ="submit">登录</Button>
                        </Form>
                    </TabPane>
                    <TabPane tab = "注册" key = "2">
                        <Form layout='horizontal' onSubmit={this.handlerSubmit.bind(this)}>
                            <FormItem label = "账号">
                                {getFieldDecorator('r_userName')(<Input placeholder="请输入您的账号" />)}
                            </FormItem>
                            <FormItem label = "密码">
                                {getFieldDecorator('r_password')(<Input placeholder="请输入您的密码" />)}
                            </FormItem>
                            <FormItem lable = "确认密码">
                                {getFieldDecorator('r_confirmPassword')(<Input placeholder="请再次输入您的密码" />)}
                            </FormItem>
                            <Button type = "primary" htmlType = "submit">注册</Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
         </div>)
     }
 }

 export default MobileHeader= Form.create({})(MobileHeader);