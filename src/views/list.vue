<template>
    <div class="posted-list">
        <el-button type="primary" @click="onJump" class="btn">发布新文章</el-button>
        <el-table :data="tableData" border>
            <el-table-column v-for="header in tableHeader" :key="header.prop" :prop="header.prop" :label="header.label" align="center">
                <template slot-scope="scope">
                    <span v-if="header.prop==='create_time'">{{scope.row.create_time | formatTime}}</span>
                    <span v-else>{{scope.row[header.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <!-- <el-button type="text" @click="onJump('view')">查看</el-button> -->
                    <!-- <el-button type="text" @click="onJump('edit')">编辑</el-button> -->
                    <el-button type="text" @click="onDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import date from "../util/date.js";
import service from "@/service";

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
                    label: "内容",
                    prop: "content"
                },
                {
                    label: "发布时间",
                    prop: "create_time"
                }
            ],
            tableData: [
                {
                    user_name: "章三",
                    posted_title: "第一篇帖子",
                    created_time: 1550851199000
                }
            ]
        };
    },
    created() {
        this.fetch();
    },
    methods: {
        fetch() {
            service
                .getList()
                .then(res => {
                    if (res.status === "success") {
                        this.tableData = res.list;
                    }
                })
                .catch(err => {
                    this.$message.error(err && err.message);
                });
        },
        onJump() {
            this.jump();
        },
        jump() {
            this.$router.push({
                path: "/posted"
            });
        },
        onDelete(row) {
            service
                .delete({ list_id: row.id })
                .then(res => {
                    if (res.status === "success") {
                        this.$message.success("删除成功");
                        this.fetch();
                    }
                })
                .catch(err => {
                    this.$message.error(err && err.message);
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
.btn {
    float: right;
    margin-bottom: 20px;
}
</style>

