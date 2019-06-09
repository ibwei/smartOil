<template>
  <div class="setting">
    <div class="menu">
      <Button @click="toReg">新增用户</Button>
    </div>

    <table class="t-table">
      <tr class="t-tr">
        <td>用户ID</td>
        <td>用户名</td>
        <td>权限</td>
        <td>密码</td>
        <td class="operate">操作</td>
      </tr>
      <tr class="t-tr" v-for="(item,index) of tableData" :key="index">
        <td>{{item.userId}}</td>
        <td>{{item.username}}</td>
        <td>{{item.role}}</td>
        <td>{{item.password}}</td>
        <td class="operate">
          <Button type="info" @click="editUser(index)">编辑</Button>
          <Button type="error" @click="deleteUser(index)">删除</Button>
        </td>
      </tr>
    </table>
    <div class="bottom-bar">
      <Button size="large" type="info" @click="back">回到主页</Button>
    </div>
    <i-dialog :isShow="regShow" @on-close="closeReg">
      <i-reg @on-create="createdUser"></i-reg>
    </i-dialog>

    <i-dialog :isShow="editShow" @on-close="closeEdit">
      <i-edituser @on-edit="editOk" :user="editUserInfo"></i-edituser>
    </i-dialog>

    <Modal v-model="deleteModal" title="确认要删除该用户吗?" @on-ok="reDeleteUser" :styles="{top:'100px'}">
      <p>删除之后不可恢复!</p>
    </Modal>
  </div>
</template>
<script>
import iDialog from "../../components/dialog";
import iReg from "../../components/register";
import iEdituser from "../../components/editUser";
export default {
  props: {},
  components: {
    iReg,
    iDialog,
    iEdituser
  },
  data() {
    return {
      regShow: false,
      editShow: false,
      deleteUserInfo: null,
      editUserInfo: null,
      tableData: [
        {
          userId: "0001",
          username: "李峰",
          role: "管理员",
          password: "qq45656454"
        },
        {
          userId: "0002",
          username: "张华 ",
          role: "操作员",
          password: "zhanghua001"
        },
        {
          userId: "0003",
          username: "赵四",
          role: "操作员",
          password: "password123"
        },
        {
          userId: "0004",
          username: "蒲秋风",
          role: "观察员",
          password: "52ziyou"
        },
        {
          userId: "0005",
          username: "李三思",
          role: "记录员",
          password: "lss123."
        },
        {
          userId: "0006",
          username: "陈星",
          role: "记录员",
          password: "cx123123"
        },
        {
          userId: "0007",
          username: "张权",
          role: "运营",
          password: "zqyy1233"
        }
      ],
      deleteModal: false,
      userInfoListString: "",
      operateIndex: null
    };
  },
  created() {
    this.initData();
  },
  mounted() {},
  computed: {},
  methods: {
    initData() {
      if (this.getUserInfoList()) {
        this.tableData = this.getUserInfoList();
      } else {
        this.setUserInfoList(this.tableData);
      }
    },
    getUserInfoList() {
      let string = localStorage.getItem("userInfoList");
      return JSON.parse(string);
    },
    setUserInfoList(userInfoList) {
      let string = JSON.stringify(userInfoList);
      localStorage.setItem("userInfoList", string);
    },
    toReg() {
      this.regShow = true;
    },
    //打开编辑页面
    toEdit() {
      this.editShow = true;
    },
    //确认修改
    editOk(user) {
      this.tableData[this.operateIndex].userId = user.userId;
      this.tableData[this.operateIndex].name = user.name;
      this.tableData[this.operateIndex].role = user.role;
      this.tableData[this.operateIndex].password = user.password;
      this.setUserInfoList(this.tableData);
      this.editShow = false;
    },
    closeEdit() {
      this.editShow = false;
    },
    closeReg() {
      this.regShow = false;
    },
    //创建新用户
    createdUser(user) {
      this.tableData.splice(this.tableData.length, 0, user);
      let userid = "";
      for (let i = 0; i < 4; i++) {
        userid += Math.floor(Math.random() * 10);
      }
      this.tableData[this.tableData.length - 1].userId = userid;
      this.setUserInfoList(this.tableData);
      this.$Message.success("创建用户成功!");
      this.regShow = false;
    },
    editUser(index) {
      this.operateIndex = index;
      this.editUserInfo = this.tableData[index];
      console.log(this.editUser);
      this.toEdit();
    },
    deleteUser(index) {
      this.deleteModal = true;
      this.operateIndex = index;
    },
    back() {
      this.$router.push("/");
    },
    reDeleteUser() {
      this.tableData.splice(this.operateIndex, 1);
      this.setUserInfoList(this.tableData);
      this.$Message.success("删除成功!");
    }
  }
};
</script>
<style scoped lang="">
.setting {
  color: #fff;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px;
}

.menu {
  margin-top: 40px;
}
.t-table {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 16px;
  border: 1px solid white;
  margin-top: 30px;
  margin-right: 20px;
  padding: 20px;
}

.t-tr {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0px;
  transition: all 0.5s ease;
  cursor: pointer;
  padding: 5px 0;
}
.t-tr:hover {
  background: rgba(255, 255, 255, 0.6);
}
.t-tr td {
  width: 160px;
}
.operate {
  text-align: right;
  flex: 1;
}
.bottom-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
@media screen and (max-width: 720px) {
  .menu {
    margin-top: -260px;
  }
  .t-table {
    width: 100%;
    font-size: 16px;
    border: 1px solid white;
    margin-top: 30px;
    margin-right: 20px;
    padding: 20px;
  }
}

@media screen and (max-width: 320px) {
  .menu {
    margin-top: -260px;
  }
  .t-table {
    width: 100%;
    font-size: 12px;
    border: 1px solid white;
    margin-top: 30px;
    margin-right: 20px;
    padding: 20px;
  }
}
</style>