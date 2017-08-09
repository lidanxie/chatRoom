<template>
	<div class="login" v-show="getlogintoggle">
		<div class="header">
			<mu-appbar title="Title">
                <mu-flat-button label="登录" slot="default"/>
            </mu-appbar>
		</div>
		<div class="content">
			<form name="form2">
				<mu-text-field label="帐号" labelFloat name="username" v-model="username"/>
				<br/>
				<mu-text-field label="密码" type="password" labelFloat name="password" v-model="password"/>
				<br/>
				<mu-raised-button label="登录" fullWidth @click="submit" primary/>
			</form>
			<div @click="register">
				注册账号
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		name:'login',
		data() {
			return {
				loading: '',
				username: '',
				password: ''
			}
		},
		created() {

		},
		computed: {
			...mapGetters([
				'getlogintoggle'
			])
		},
		methods: {
			submit() {
				if(this.username !== '' && this.password !== ''){
					let data = {
						name: this.username,
						password: this.password
					}
					this.$store.dispatch('loginsubmit', data);
					this.username = '';
					this.password = '';
					this.$store.commit('setIsLogin', true);
				} else {
					this.$store.commit('changedialog');
					this.$store.commit('changedialoginfo', '账号密码不能为空');
				}
			},
			register() {
				this.$store.commit('openregistertoggle')
				this.$store.commit('closelogintoggle')
			}
		}

	}
</script>

<style>
	.login {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #fff;
		.mu-appbar {
			text-align: center;
			.mu-flat-button-label {
				font-size: 20px;
			}
		}
		.content {
			width: 80%;
			margin: 20px auto;
			.mu-text-field {
				width: 100%;
			}
			.mu-raised-button {
				min-width: 80px;
				display: block;
				width: 100%;
				margin: 0 auto;
				transition: all 0.375s
				.loading{
					width: 80px;
					height: 80px;
					border-radius: 50%;
				}
			}
		}
	}
</style>