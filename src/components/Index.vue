<template>
	<div class="index">
		<div>
			<mu-list>
				<mu-sub-header>最近聊天记录</mu-sub-header>
			</mu-list>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import io from 'socket.io-client'

	export default {
		name:'index',
		data() {
			return {
				socket:''
			}
		},
		created() {

		},
		computed: {

		},
		methods: {

		}
	}
</script>

<style type="text/css">
	
</style>