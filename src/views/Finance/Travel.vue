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
<script>
export default {
  data() {
    return {
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
      }
    };
  },
  methods: {}
};
</script>

