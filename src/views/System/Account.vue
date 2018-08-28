<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="condition">
                <el-form-item>
                    <el-button type="primary" size="medium" v-on:click="addUser">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table :data="userList"  border v-loading="LoadUser" element-loading-text="拼命加载中">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="Code" label="账户" width="160">
                </el-table-column>
                <el-table-column prop="Name" label="姓名">
                </el-table-column>
                 <el-table-column prop="HumanName" :formatter="HumanNameFormat" label="角色">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="160">
                    <template slot-scope="scope">
                        <el-button type="primary" plain v-on:click="handelEdit(scope.row)" size="small">编辑</el-button>
                        <el-button type="primary" plain v-on:click="showdelete(scope.row.Id)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
           <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="condition.PageSize"
                  layout="total, prev, pager, next"
                  :total="total">
                </el-pagination>
            </div>
        </template>
        <!--弹窗-->
        <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="add" label-width="80px" :rules="rules" ref="add">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="角色" prop="HumanName">
                            <el-select v-model="add.HumanName" placeholder="请选择">
                                <el-option v-for="item in HumanNameOptions"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="Name">
                            <el-input v-model="add.Name" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="账户" prop="Code">
                            <el-input type="" v-model="add.Code" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="PassWord">
                            <el-input type="password" v-model="add.PassWord" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-on:click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" v-on:click="save('add')">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import moment from "moment";
import {
  getuserlist,
  addUser,
  editUser,
  deleteUser
} from "../../api/api.js";
export default {
  data() {
    return {
      userList: [],
      LoadUser: false,
      dialogFormVisible: false,
      dialogStatus: "",
      titleMap: {
        addUser: "新增用户信息",
        editUser: "编辑用户信息"
      },
      add: {
        Code: "",
        Name: "",
        HumanName: "",
        PassWord: ""
      },
      rules: {
        HumanName: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        Code: [{ required: true, message: "请输入登录账户", trigger: "blur" }],
        Name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" }
        ],
        PassWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      HumanNameOptions: [
        {
          value: "admin",
          label: "管理员"
        },
        {
          value: "user",
          label: "普通用户"
        }
      ],
      value: "",
      currentRow: null,
      total: 0,
      currentPage: 1,
      condition: {
        PageIndex: 1,
        PageSize: 5,
        Search: ""
      }
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.condition.PageIndex = val;
      this.getUser();
    },
    getUser: function() {
      var _this = this;
      _this.LoadUser = true;
      let para = _this.condition;
      getuserlist(para).then(res => {
        console.log(res);
        if (res.Code == 0) {
          _this.userList = res.Data;
          _this.total = res.Total;
          _this.LoadUser = false;
        }
      });
    },
    addUser: function() {
      this.dialogFormVisible = true;
      this.addtype = "add";
      this.dialogStatus = "addUser";
      this.add = {
        Code: "",
        Name: "",
        HumanName: "",
        PassWord: ""
      };
    },
    handelEdit: function(item) {
      this.dialogFormVisible = true;
      this.addtype = "edit";
      this.dialogStatus = "editUser";
      this.add = item;
    },
    save: function(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.addtype == "add") {
            addUser(_this.add)
              .then(res => {
                if (res.Code == 0) {
                  _this.dialogFormVisible = false;
                  _this.$message({
                    message: res.Message,
                    type: "success",
                    center: true
                  });
                  _this.getUser();
                } else {
                  _this.$message({
                    message: res.Message,
                    type: "error",
                    center: true
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
                _this.$message({
                  message: "服务器异常",
                  type: "error",
                  center: true
                });
              });
          } else {
            editUser(_this.add)
              .then(res => {
                if (res.Code == 0) {
                  _this.dialogFormVisible = false;
                  _this.$message({
                    message: res.Message,
                    type: "success",
                    center: true
                  });
                  _this.getUser();
                } else {
                  _this.$message({
                    message: res.Message,
                    type: "error",
                    center: true
                  });
                }
              })
              .catch(function(error) {
                console.log(error);
                _this.$message({
                  message: "服务器异常",
                  type: "error",
                  center: true
                });
              });
          }
        } else {
          return false;
        }
      });
    },

    showdelete: function(id) {
      var _this = this;
      console.log(id);
      _this
        .$confirm("您确认删除此记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(function() {
          deleteUser({ Id: id })
            .then(res => {
              if (res.Code == 0) {
                _this.$message({
                  type: "success",
                  message: res.Message,
                  center: true
                });
                console.log(res);
                _this.getUser();
              } else {
                _this.$message({
                  type: "success",
                  message: res.Message
                });
              }
            })
            .catch(function(error) {
              console.log(error);
              _this.$message({
                type: "success",
                message: "服务器异常"
              });
            });
        });
    },
    HumanNameFormat: function(row, column) {
      var HumanName = row[column.property];
      switch (HumanName) {
        case "admin":
          return "管理员";
        case "user":
          return "普通用户";
        default:
          return HumanName;
      }
    },
    /*日期格式*/
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  filters: {}
};
</script>