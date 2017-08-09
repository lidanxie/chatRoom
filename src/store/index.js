/**
* @auther lidan 2017/7
*/
import Vue from 'Vue';
import Vuex from 'vueX';

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
	},
	getter: {
		getlogintoggle: state => state.logintoggle,
		getdialog: state => state.dialog,
		getdialoginfo: state => state.dialoginfo,
		registertoggle: state => state.registertoggle
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
		}
	}
})