<template>
  <div class="regform">
    <Form ref="formValidate" :label-width="70">
      <FormItem label="用户ID">
        <Input v-model="user.userId" placeholder="要添加的用户名" name="user" readonly disabled></Input>
      </FormItem>
      <FormItem label="用户名">
        <Input v-model="user.username" placeholder="要添加的用户名" name="user"></Input>
      </FormItem>
      <FormItem label="密码">
        <Input v-model="user.password" placeholder="用户密码" type="password" name="pass"></Input>
      </FormItem>
      <FormItem label="权限">
        <Input v-model="user.role" placeholder="权限" name="email"></Input>
      </FormItem>
      <FormItem>
        <Button type="info" @click="editUser">确认修改</Button>
        <Button type="default" @click="resetForm" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { FormItem, Button, Form, Icon } from "iview";
export default {
  components: {
    FormItem,
    Button,
    Form,
    Icon
  },

  props: {
    user: {
      type: Object
    }
  },

  data() {
    return {};
  },
  created() {},
  methods: {
    editUser() {
      //发起修改请求
      this.$Message.success("修改成功");
      this.$emit("on-edit", this.user);
    },
    resetForm() {
      this.user.username = "";
      this.user.role = "";
      this.user.password = "";
    },
    checkUser() {
      //首先检查用户名,如果没有重名,再去注册
      // this.$http.get('/api/reg.php', {
      // 	params: {
      // 		type: 'checkuser',
      // 		user: this.formValidate.name
      // 	}
      // }).then((response) => {
      // 	let res = response.body
      // 	if(res === 'no') {
      // 		this.$Message.error('该用户名已被注册!')
      // 		this.formValidate.name = ''
      // 		this.$Loading.error()
      // 	} else {
      // 		this.$http.get('/api/reg.php', { //发送注册请求
      // 			params: {
      // 				type: 'reg',
      // 				user: this.formValidate.name,
      // 				pass: this.formValidate.password,
      // 				email: this.formValidate.mail,
      // 				description: this.formValidate.desc,
      // 				avatar:this.formValidate.avatar
      // 			}
      // 		}).then((response) => {
      // 			let res = response.body
      // 											console.log(res)
      // 			if(res === 'ok') {
      // 				this.$Loading.finish()
      // 				this.$Message.success('注册成功!')
      // 				setTimeout(this.success(), 1000)
      // 			} else {
      // 				this.$Loading.error()
      // 				this.$Message.error('服务器异常,注册失败')
      // 			}
      // 		})
      // 	}
      // })
    },

    success() {
      this.$emit("on-close");
    }
  }
};
</script>
<style lang="less">
@color1: #2db7f5;
@color2: #2c3e50;
.regform {
  font-size: 16px;
  font-family: "微软雅黑";
  width: 100%;
  max-width: 300px;
  margin: 0px auto !important;
  text-align: center;
  height: auto;
}

.sex {
  text-align: left !important;
  position: relative;
  left: -60px;
  top: -3px;
}

.tips {
  font-size: 18px;
  color: #fff;
}

.ivu-input-group-prepend {
  background: @color1 !important;
  outline: none;
  border-radius: 0;
}

.ivu-form-item-error-tip {
  font-size: 12px;
  padding: 5px 0 10px 0;
}

.button-group1 {
  word-spacing: 20px;
}

.ivu-form-item-error {
  border: none;
}

button {
  border-radius: 0 !important;
}

input {
  border-radius: 0 !important;
  outline: none !important;
  /*border-color:@color1 !important;*/
}

input::focus {
  border-radius: 0 !important;
  outline: none !important;
}
</style>