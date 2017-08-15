var mongoose = require('mongoose');
//MD5加密
var bcrypt = require('bcryptjs');

var SALT_WORK_FACTOR = 10
var UserSchemas = new mongoose.Schema({
	name: {
		unique: true,
		type: String
	}
	password: String,
	src: String,
	meta: {
		createAt: {
			type: Date(),
			default: Date.now()
		},
		updateAt: {
			type: Date(),
			default: Date.now()
		}
	}
});

//对密码进行加密
UserSchemas.pre('save', function(next){
	var user = this;
	if(ths.isNew) {
		this.createAt = this.updateAt = Date.now();
	}else {
		this.updateAt = Date.now();
	}
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) {
				return next(err);
			}
			user.password = hash;
			next();
		})
	})
});

//用于比较密码是否正确
UserSchemas.methods = {
	comparePassword: function(_password, cb) {
		bcrypt.compare(_password, this.password, function(err, isMath) {
			if(err) {
				return cb(err);
			}
			cb(null, isMatch);
		})
	}
}

UserSchema.statics = {
	fetch: function(cb) {
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function(id, cb) {
		return this.find({_id: id}).exec(cb);
	}
}

module.exports = UserSchema;