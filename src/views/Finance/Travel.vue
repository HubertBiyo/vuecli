<template>
<section>
  <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="condition">
        <el-form-item>
					<el-button type="primary" size="medium" v-on:click="addTrain">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    <!--列表-->
		<template>
    <el-table :data="trainList" border v-loading="Loadtrain" element-loading-text="拼命加载中">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="OrderNo" label="订单编号" width="">
                    </el-table-column>
                    <el-table-column prop="DepartureTime" :formatter="dateFormat" label="出发日期" width="">
                    </el-table-column>
                    <el-table-column prop="Origin_Time" label="始发地" width="">
                    </el-table-column>
                    <el-table-column prop="Destination_Time" label="目的地" width="">
                    </el-table-column>
                    <el-table-column prop="TrainNumber" label="车次" width="">
                    </el-table-column>
                    <el-table-column prop="TicketMoney" label="火车票金额" width="">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button type="primary" v-on:click="handelEdit(scope.row)" size="small" plain>编辑</el-button>
                            <el-button type="primary" v-on:click="showdelete(scope.row.Id)" size="small" plain>删除</el-button>
                        </template>
                    </el-table-column>
     </el-table>
		</template>
    <!--弹窗-->
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :model="add" label-width="80px" :rules="rules" ref="add">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="订单号" prop="OrderNo">
                        <el-input v-model="add.OrderNo" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="TName">
                        <el-input v-model="add.TName" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="始发地" prop="Origin_Time">
                        <el-input v-model="add.Origin_Time" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="目的地" prop="Destination_Time">
                        <el-input v-model="add.Destination_Time" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="车次" prop="TrainNumber">
                        <el-input v-model="add.TrainNumber" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="具体位置" prop="Carriage">
                        <el-col :span="12">
                            <el-input v-model="add.Carriage" auto-complete="off">
                                <template slot="append">
                                    车
                                </template>
                            </el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="add.SeatNumber" auto-complete="off">
                                <template slot="append">
                                    号
                                </template>
                            </el-input>
                        </el-col>

                    </el-form-item>
                </el-col>

            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="座位类型" prop="SeatType">
                        <el-select v-model="add.SeatType" placeholder="请选择">
                            <el-option v-for="item in SeatTypeOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="车票类型" prop="TicketType">
                        <el-select v-model="add.TicketType" placeholder="请选择">
                            <el-option v-for="item in TicketTypeOptions"
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
                    <el-form-item label="出行日期" prop="DepartureTime">
                        <div>
                            <el-date-picker v-model="add.DepartureTime" v-on:change="getTimeDepartureTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="订单日期" prop="OrderTime">
                        <div>
                            <el-date-picker v-model="add.OrderTime" v-on:change="getTimeOrderTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="车票金额" prop="TicketMoney">
                        <el-input type="" v-model="add.TicketMoney" auto-complete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注" prop="Remark">
                <el-input type="textarea" :rows="2" v-model="add.Remark" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-row>
                <el-button v-on:click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" size="small" v-on:click="saveTrain('add')">确定</el-button>
            </el-row>
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
      condition: {
        pageindex: 1,
        pagesize: 10,
        name
      },
      add: {
        OrderNo: "",
        DepartureTime: "",
        Origin_Time: "",
        Destination_Time: "",
        TrainNumber: "",
        SeatType: "",
        Carriage: "",
        SeatNumber: "",
        TName: "",
        TicketType: "",
        OrderTime: "",
        TicketMoney: "",
        Remark: "",
        CreateTime: ""
      },
      rules: {
        OrderNo: [{ required: true, message: "请输入订单号", trigger: "blur" }],
        TName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" }
        ],
        Origin_Time: [
          { required: true, message: "请输入始发地", trigger: "blur" }
        ],
        Destination_Time: [
          { required: true, message: "请输入目的地", trigger: "blur" }
        ],
        TrainNumber: [
          { required: true, message: "请输入车次", trigger: "blur" }
        ],
        Carriage: [
          { required: true, message: "请输入车厢号", trigger: "blur" }
        ],
        SeatNumber: [
          { required: true, message: "请输入座位号", trigger: "blur" }
        ],
        SeatType: [
          { required: true, message: "请选择座位类型", trigger: "change" }
        ],
        TicketType: [
          { required: true, message: "请选择车票类型", trigger: "change" }
        ],
        DepartureTime: [
          { required: true, message: "请选择日期" },
          { type: "date", message: "请选择您的出生日期", trigger: "change" }
        ],
        OrderTime: [
          { required: true, message: "请选择日期" },
          { type: "date", message: "请选择您的出生日期", trigger: "change" }
        ],
        TicketMoney: [
          { required: true, message: "请输入火车票金额", trigger: "blur" }
        ]
      },
      trainList: [],
      Loadtrain: false,
      dialogFormVisible: false,
      dialogStatus: "",
      titleMap: {
        addTrain: "新增日常出行记录",
        editTrain: "编辑日常出行记录"
      },
      SeatTypeOptions: [
        {
          value: "HradSeat",
          label: "硬座"
        },
        {
          value: "HardBerth",
          label: "硬卧"
        },
        {
          value: "NoSeat",
          label: "无座"
        }
      ],
      TicketTypeOptions: [
        {
          value: "High-speedRail",
          label: "高铁"
        },
        {
          value: "MotorCar",
          label: "动车"
        },
        {
          value: "Express",
          label: "特快"
        }
      ],
      value: ""
    };
  },
  methods: {
    gettrain: function() {
      var _this=this;
      axios
        .get("http://api.xinyo.xin/api/Travel/GetAllTravel")
        .then(function(res) {
          console.log(res);
          _this.trainList=res.data;
        });
    },
    addTrain: function() {
      this.dialogFormVisible = true;
      this.addtype = "add";
      this.dialogStatus = "addTrain";
      this.add = {
        OrderNo: "",
        DepartureTime: "",
        Origin_Time: "",
        Destination_Time: "",
        TrainNumber: "",
        SeatType: "",
        Carriage: "",
        SeatNumber: "",
        TName: "",
        TicketType: "",
        TicketMoney: "",
        Remark: "",
        CreateTime: ""
      };
    },
    /*日期格式*/
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    addTrain: function() {
      this.dialogFormVisible = true;
      this.addtype = "add";
      this.dialogStatus = "addTrain";
      this.add = {
        OrderNo: "",
        DepartureTime: "",
        Origin_Time: "",
        Destination_Time: "",
        TrainNumber: "",
        SeatType: "",
        Carriage: "",
        SeatNumber: "",
        TName: "",
        TicketType: "",
        TicketMoney: "",
        Remark: "",
        CreateTime: ""
      };
    },
    getTimeDepartureTime: function(val) {
      this.add.DepartureTime = new Date(moment(val).format("YYYY-MM-DD"));
    },
    getTimeOrderTime: function(val) {
      this.add.OrderTime = new Date(moment(val).format("YYYY-MM-DD"));
    },
    handelEdit: function(item) {
      this.dialogFormVisible = true;
      this.addtype = "edit";
      this.dialogStatus = "editTrain";
      this.add = item;
      this.add.DepartureTime = new Date(
        moment(this.add.DepartureTime).format("YYYY-MM-DD")
      );
      this.add.OrderTime = new Date(
        moment(this.add.OrderTime).format("YYYY-MM-DD")
      );
    },
    saveTrain: function(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = "/account/AddTrain";
          if (_this.addtype == "edit") {
            url = "/account/EditTrain";
          }
          _this.add.DepartureTime = moment(_this.add.DepartureTime).format(
            "YYYY-MM-DD"
          );
          _this.add.OrderTime = moment(_this.add.OrderTime).format(
            "YYYY-MM-DD"
          );
          $.ajax({
            type: "post",
            url: url,
            data: _this.add,
            dataType: "json",
            success: function(res) {
              if (res.Code == 0) {
                vm.$data.dialogFormVisible = false;
                _this.$message({
                  message: res.Message,
                  type: "success",
                  center: true
                });
                vm.loaddata();
              } else {
                _this.$message({
                  message: res.Message,
                  type: "error",
                  center: true
                });
              }
            },
            error: function(d) {
              _this.$message({
                message: "服务器异常",
                type: "error",
                center: true
              });
            }
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
          $.ajax({
            type: "post",
            url: "/account/DeleteTrain",
            data: { id: id },
            dataType: "Json",
            success: function(res) {
              if (res.Code == 0) {
                _this.$message({
                  type: "success",
                  message: res.Message
                });
                vm.loaddata();
              } else {
                _this.$message({
                  type: "success",
                  message: res.Message
                });
              }
            },
            error: function(d) {
              _this.$message({
                type: "success",
                message: "服务器异常"
              });
            }
          });
        });
    }
  },
  created() {
    this.gettrain();
  },
  mounted() {},
  filters: {}
};
</script>

