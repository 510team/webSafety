<template>
    <div class="posted-list">
        <el-button class="pull-right" type="primary" @click="onJump('add')">新增</el-button>
        <el-table :data="tableData" border>
            <el-table-column v-for="header in tableHeader" :key="header.prop" :prop="header.prop" :label="header.label" align="center">
                <template slot-scope="scope">
                    <span v-if="header.prop==='created_time'">{{scope.row.created_time | formatTime}}</span>
                    <span v-else>{{scope.row[header.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="onJump('view',scope.row)">查看</el-button>
                    <el-button type="text" v-if="scope.row.delete" @click="onJump('edit',scope.row)">编辑</el-button>
                    <el-button type="text" v-if="scope.row.delete" @click="onDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { list, deleteArticle } from "../service/index.js";
import date from "../util/date.js";
export default {
    data() {
        return {
            tableHeader: [
                {
                    label: "发帖人",
                    prop: "name"
                },
                {
                    label: "标题",
                    prop: "title"
                },
                {
                    label: "发布时间",
                    prop: "create_time"
                }
            ],
            tableData: []
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        fetch() {
            return list()
                .then(data => {
                    this.tableData = data.list;
                })
                .catch(err => {
                    this.$message({
                        type: "error",
                        message: err.message || err
                    });
                });
        },
        onDelete(row) {
            deleteArticle({ id: row.id })
                .then(data => {
                    this.$message({
                        type: "success",
                        message: "删除成功"
                    });
                    this.fetch();
                })
                .catch(err => {
                    console.log("err", err);
                    this.$message({
                        type: "error",
                        message: err.message || err
                    });
                });
        },
        onJump(type, row) {
            this.jump(type, row);
        },
        jump(type, row) {
            this.$router.push({
                path: "/posted",
                query: {
                    type: type,
                    id: row && row.id
                }
            });
        }
    },
    filters: {
        formatTime(value, customFormat = "yyyy-MM-dd hh:mm:ss", isMsec = true) {
            value = isMsec ? value : value * 1000;
            return date.toFormat(value, customFormat);
        }
    }
};
</script>
<style lang='less'>
.el-table {
  thead {
    color: #fff;
  }
  th {
    background: #909399;
  }
}
.pull-right {
  float: right;
}
</style>