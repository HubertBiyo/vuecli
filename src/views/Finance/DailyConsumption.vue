<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="condition">
                <el-form-item>
                    <el-button type="primary" size="medium" v-on:click="addCapial">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <template>
            <el-table :data="capitalList" border v-loading="LoadCapital" element-loading-text="拼命加载中">
                <el-table-column type="index" width="50"></el-table-column>
                <!-- <el-table-column prop="Code" label="编号" width="220"> 
                </el-table-column> -->
                <el-table-column prop="Category" :formatter="CategoryFormat" label="分类">
                </el-table-column>
                <el-table-column prop="Consumer" label="消费者" width="160">
                </el-table-column>
                <el-table-column prop="OutMoney" label="消费金额">
                </el-table-column>
                 <el-table-column prop="Remark" label="备注">
                </el-table-column>
                <el-table-column prop="AccountType" :formatter="AccountTypeFormat" label="账户">
                </el-table-column>
                <el-table-column prop="OrderTime" width="180" :formatter="dateFormat" label="消费时间">
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
                        <el-form-item label="分类" prop="Category">
                            <el-select v-model="add.Category" placeholder="请选择">
                                <el-option v-for="item in CategoryOptions"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="消费者" prop="Consumer">
                            <el-input v-model="add.Consumer" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="消费时间" prop="OrderTime">
                            <div>
                                <el-date-picker v-model="add.OrderTime" v-on:change="getOrderTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期">
                                </el-date-picker>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="账户" prop="AccountType">
                            <el-select v-model="add.AccountType" placeholder="请选择">
                                <el-option v-for="item in AccountTypeOptions"
                                           :key="item.value"
                                           :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="消费金额" prop="OutMoney">
                            <el-input type="" v-model="add.OutMoney" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注" prop="Remark">
                    <el-input type="textarea" :rows="2" v-model="add.Remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-on:click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" v-on:click="save('add')">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      capitalList: [],
      LoadCapital: false,
      dialogFormVisible: false,
      dialogStatus: "",
      titleMap: {
        addCapital: "新增资金流动记录",
        editCapital: "编辑资金流动记录"
      },
      add: {
        Category: "",
        AccountType: "",
        OutMoney: "",
        Consumer: "豆旭波",
        Remark: "",
        CreateTime: "",
        OrderTime: ""
      },
      rules: {
        Category: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        AccountType: [
          { required: true, message: "请选择账户", trigger: "change" }
        ],
        OutMoney: [{ required: true, message: "请输入金额", trigger: "blur" }],
        Consumer: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" }
        ],
        OrderTime: [
          { required: true, message: "请选择日期" },
          { type: "date", message: "请选择您的出生日期", trigger: "change" }
        ]
      },
      AccountTypeOptions: [
        {
          value: "Alipay",
          label: "支付宝"
        },
        {
          value: "Wechat",
          label: "微信"
        },
        {
          value: "BankCard",
          label: "银行卡"
        }
      ],
      CategoryOptions: [
        {
          value: "1",
          label: "支出"
        },
        {
          value: "2",
          label: "收入"
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
    this.getDailyConsumption();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.condition.PageIndex = val;
      console.log(this.condition.PageIndex);
      this.getDailyConsumption();
    },
    getOrderTime: function(val) {
      this.add.OrderTime = new Date(moment(val).format("YYYY-MM-DD HH:mm:ss"));
    },
    getDailyConsumption: function() {
      var _this = this;
      _this.LoadCapital=true;
      axios
        .get("http://api.xinyo.xin/api/CapitalFlow/SearchList", {
          params: _this.condition
        })
        .then(function(res) {
          console.log(res);
          if (res.data.Code == 0) {
            _this.capitalList = res.data.Data;
            _this.total = res.data.Total;
            _this.LoadCapital=false;
          }
        });
    },
    addCapial: function() {
      this.dialogFormVisible = true;
      this.addtype = "add";
      this.dialogStatus = "addCapital";
      this.add = {
        Category: "",
        AccountType: "",
        OutMoney: "",
        Consumer: "豆旭波",
        Remark: "",
        CreateTime: "",
        OrderTime: ""
      };
    },
    handelEdit: function(item) {
      this.dialogFormVisible = true;
      this.addtype = "edit";
      this.dialogStatus = "editCapital";
      this.add = item;
      this.add.OrderTime = new Date(
        moment(this.add.OrderTime).format("YYYY-MM-DD HH:mm:ss")
      );
    },
    save: function(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = "http://api.xinyo.xin/api/CapitalFlow/Add";
          if (_this.addtype == "edit") {
            url = "http://api.xinyo.xin/api/CapitalFlow/Edit";
          }
          _this.add.OrderTime = moment(_this.add.OrderTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          axios
            .post(url, _this.add)
            .then(function(res) {
              console.log(res);
              if (res.data.Code == 0) {
                _this.dialogFormVisible = false;
                _this.$message({
                  message: res.data.Message,
                  type: "success",
                  center: true
                });
                _this.getDailyConsumption();
              } else {
                _this.$message({
                  message: res.data.Message,
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
          return false;
        }
      });
    },

    showdelete: function(id) {
      var _this = this;
      _this
        .$confirm("您确认删除此记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(function() {
          axios
            .delete("http://api.xinyo.xin/api/CapitalFlow/Delete", {
              params: {
                Id: id
              }
            })
            .then(function(res) {
                console.log(res);
              if (res.data.Code == 0) {
                _this.$message({
                  type: "success",
                  message: res.data.Message,
                  center: true
                });
                console.log(res);
                _this.getDailyConsumption();
              } else {
                _this.$message({
                  type: "success",
                  message: res.data.Message
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
    CategoryFormat: function(row, column) {
      var category = row[column.property];
      switch (category) {
        case "1":
          return "支出";
        case "2":
          return "收入";
        default:
          return category;
      }
    },
    CategoryFormat: function(row, column) {
      var category = row[column.property];
      switch (category) {
        case "1":
          return "支出";
        case "2":
          return "收入";
        default:
          return category;
      }
    },
    AccountTypeFormat: function(row, column) {
      var accountType = row[column.property];
      switch (accountType) {
        case "Wechat":
          return "微信";
        case "Alipay":
          return "支付宝";
        case "BankCard":
          return "银行卡";
        default:
          return accountType;
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

