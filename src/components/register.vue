<template>
  <div class="regform">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
      <FormItem label="用户名" prop="username">
        <Input v-model="formValidate.username" placeholder="要添加的用户名" name="user"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="formValidate.password" placeholder="用户密码" type="password" name="pass"></Input>
      </FormItem>
      <FormItem label="权限" prop="role">
        <Input v-model="formValidate.role" placeholder="用户权限" name="role"></Input>
      </FormItem>
      <FormItem>
        <Button type="info" @click="handleSubmit('formValidate')">添加</Button>
        <Button type="default" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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

  data() {
    return {
      status: "",
      formValidate: {
        password: "",
        username: "",
        role: "",
        userId: ""
      },
      ruleValidate: {
        username: [
          {
            required: true,
            message: "名字是不可少的",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度至少为6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    checkUser() {
      this.$emit("on-create", this.formValidate);
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
    handleSubmit(name) {
      //首先验证表单规则,通过再去调用检查用户名
      this.$refs[name].validate(valid => {
        if (valid) {
          this.checkUser();
        } else {
          this.$Message.error("还有些选项不符合规范");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
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