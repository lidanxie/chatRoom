<template>
	<div class="register" v-show="getregistertoggle">
		<div class="header">
			<mu-appbar title="Title">
                <mu-flat-button label="注册" slot="default"/>
            </mu-appbar>
		</div>
		<div class="content">
			<form name="form1">
				<mu-text-field label="帐号" labelFloat name="username" v-model="name"/>
                <br/>
                <mu-text-field label="密码" type="password" labelFloat name="password" v-model="password"/>
                <br/>
                <mu-raised-button label="注册" fullWidth @click="submit" primary/>
			</form>
			<div @click="login">
                我已有帐号
            </div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'register',
		data() {
			return {
				name:'',
				password:''
			}
		},
		computed: {
			...mapGetters([
				'getregistertoggle'
			])
		},
		methods: {
			submit() {
				let src = './static/img/' + Math.ceil(Math.random() * 10) + '.jpg';
				if(this.name !== '' && this.password !== ''){
					let data = {
						name: this.name,
						password: this.password,
						src: src
					}
					this.$store.dispatch('registersubmit', data);
				} else {
					this.$store.commit('changedialog');
					this.$store.commit('changedialoginfo','账号密码不能为空')
				}
			},
			login() {
				this.$store.commit('openlogintoggle')
				this.$store.commit('closeregistertoggle')
			}
		},
		created() {

		}
	}
</script>

<style>
	.register {
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
		}
	}
</style>