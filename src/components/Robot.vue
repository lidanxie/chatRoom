<template>
	<div>
		<div v-for="obj in getrobotmsg">
			<othermsg v-if="obj.user!=getusername" :name="obj.user" head="./static/img/robot.jpg" :msg="obj.message"></othermsg>
            <mymsg v-if="obj.user==getusername" :name="getusername" :head="getusersrc" :msg="obj.message"></mymsg>
		</div>
		<div style="height:250px;"></div>
		<div class="con-input">
			<div class="input">
				<input type="text" id="msg" v-model="msg">
			</div>
			<mu-raised-button label="发送" class="demo-raised-button" primary @click="sendmessage"/>
		</div>
	</div>
</template>

<script>
	import Mymsg from './Mymsg.vue';
	import Othermsg from './Othermsg.vue';
	import { mapGetters } from 'vuex';

	export default {
		name:'robot',
		data() {
			return {
				msg:''
			}
		},
		methods: {
			sendmessage() {
				let data = {
					info: this.msg,
					id: this.getusername
				}
				this.$store.commit('setrobotmsg', {
					message: this.msg, user: this.getusername
				});
				this.$store.dispatch('getrobatmess', data);
				this.msg = '';
				window.scrollTo(0, 900000);
			}
		},
		computed: {
			...mapGetters([
				'getusername',
				'getrobotmsg',
				'getusersrc'
			])
		},
		components: {
			Mymsg,
			Othermsg
		}
	}
</script>

<style>
	.con-input { 
		width: 100%;
		position: fixed;
		height: 50px;
		bottom: 55px;
		display: flex;
		.input {
			flex: 1;
			background: #ddd;
			padding: 4px;
			input{
				width: 100%;
				height: 42px;
				box-sizing: border-box;
				border: 1px solid #ddd;
				color: #333333;
				font-size: 18px;
				padding-left: 5px;
			}
			.mu-text-field {
				width: 100%;
			}
		}
		.demo-raised-button {
			height: 5px;
			background: #ddd;
		}
	}
</style>