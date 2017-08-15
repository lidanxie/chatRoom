/**
* @auther lidan 2017/7
*/
import Vue from 'Vue';
import Vuex from 'vueX';
import axios from 'axios';

Vue.use(Vuex);

const store = new store({
	state: {
		isLogin: false,
		// 登录显示控制
		logintoggle: false,
		// 提示框显示控制
		dialog: false,
		// 提示框内容
		dialoginfo: '',
		// 注册页面显示控制
		registertoggle: true,
		 socket: '',
		// 存放用户信息
		user: {
			name:'',
			src:'',
			room:''
		},
		robotmsg: [{
			message:'Hi~有什么想知道的可以问我,随时任您调戏',
			user:'robot'
		}],
		// 存放历史记录
	    messhistory: {
	      infos: []
	    },
	        // 存放房间信息，为了方便以后做多房间
	    roomdetail: {
	      id: '',
	      users: {},
	      infos: []
	    },
	},
	getter: {
		getlogintoggle: state => state.logintoggle,
		getdialog: state => state.dialog,
		getdialoginfo: state => state.dialoginfo,
		getregistertoggle: state => state.registertoggle,
		getusername: state => state.user.name,
		getuserscr: state => state.user.src,
		getuserroom: state => state.user.room,
		getrobotmsg: state => state.robotmsg,
		getsocket: state => state.socket,
		getid: state => state.roomdetail.id,
		getusers: state => state.roomdetail.users,
		getinfos: state => state.roomdetail.infos,
		getmesshistoryinfos: state => state.messhistory.infos,
	},
	mutations: {
		setIsLogin (state, data) {
			state.isLogin = data;
		},
		changedialog (state) {
			state.dialog = !state.dialog;
		},
		changedialoginfo (state, data) {
			state.dialoginfo = data;
		},
		openregistertoggle (state) {
			state.registertoggle = false;
		},
		closelogintoggle(state) {
			state.logintoggle = false;
		},
		openlogintoggle(state) {
			state.logintoggle = true;
		},
		closeregistertoggle(state) {
			state.registertoggle = false;
		},
		setrobotmsg(state, data) {
			state.robotmsg.push(data);
		},
		setusername(state, data) {
			state.user.name = data;
		},
		setusersrc(state, data) {
			state.user.src = data;
		},
		setgetsocket (state, data) {
	      state.socket = data
	    },
	    addroomdetailinfos (state, data) {
	    	state.roomdetail.infos.push(data);
	    },
	    setroomdetailinfos (state) {
	    	state.roomdetail.infos = [];
	    },
	    setusers (state, data) {
	    	state.roomdetail.users = data;
	    },
	    setmesshistoryinfos (state, data) {
	    	state.messhistory.infos = data;
	    },
	    setmesshistoryinfos (state, data) {
	    	state.messhistory.infos = data;
	    },
	    setrobotmsg (state, data) {
	    	state.robotdata.push(data);
	    }
	},
	actions: {
		loginsubmit({commit}, data) {
			axios.post('/user/signin', data)
			.then( (data) => {
				if(data.data.errno ===0 ){
					commit('closelogintoggle')
					commit('changedialog')
					commit('changedialoginfo', data.data.data)
					commit('setusername', data.data.name)
					commit('setusersrc', data.data.src)
				}else {
					commit('changedialog')
					commit('changedialoginfo', data.data.data)
				}
			})
			.catch((err) => {
				console.log(err);
			})
		},
		registersubmit({commit}, data) {
			axios.post('/user/signin', data)
				.then((data) => {
					if(data.data.errno === 0) {
						commit('closelogintoggle')
						commit('openlogintoggle')
						commit('changedialog')
						commit('changedialoginfo', data.data.data)
					}else {
						commit('changedialog')
						commit('changedialoginfo', data.data.data)
					}
				})
				.catch((err) => {
					console.log(err);
				})
		},
		getrobatmess({commit}, data) {
			let robotdata = '';
			axios.get('/robotapi',{
				params: data
			}).then( (data) => {
				robotdata = JSON.parse(data.data.data);
				// 分类信息
				if (robotdata.code === 100000) {
					commit('setrobotmsg', {message: robotdata.text, user: 'robot'})
				} else if (robotdata.code === 200000) {
					let data = robotdata.text + robotdata.url
					commit('setrobotmsg', {message: data, user: 'robot'})
				} else if (robotdata.code === 302000) {
					commit('setrobotmsg', {message: '暂不支持此类对话', user: 'robot'})
				} else {
					commit('setrobotmsg', {message: '暂不支持此类对话', user: 'robot'})
				}
			}).catch( (err) => {
				console.log(err);
			})
		},
		uploadimg({commit}, data) {
			let config = {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
			}
			axios.post('/file/uploadimg', data, config).then((data) => {
				if(data.data.errno == 0) {
					console.log("上传成功");
				}
			}).catch((err) => {
				console.log(err);
			})
		},
		getmesshistory({commit}, data) {
			axios.get('/message', {params: data}).then((data) => {
				commit('setmesshistoryinfos', data.data.data);
			}).catch((err) => {
				console.log(err);
			})
		}
	}
})

export default store;