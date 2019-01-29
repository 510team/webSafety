<template>
    <div class="posted-list">
        <el-table :data="tableData" border>
            <el-table-column v-for="header in tableHeader" :key="header.prop" :prop="header.prop" :label="header.label" align="center">
                <template slot-scope="scope">
                    <span v-if="header.prop==='created_time'">{{scope.row.created_time | formatTime}}</span>
                    <span v-else>{{scope.row[header.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="onJump('view')">查看</el-button>
                    <el-button type="text" @click="onJump('edit')">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import date from "../util/date.js";
export default {
    data() {
        return {
            tableHeader: [
                {
                    label: "发帖人",
                    prop: "user_name"
                },
                {
                    label: "标题",
                    prop: "posted_title"
                },
                {
                    label: "发布时间",
                    prop: "created_time"
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
    methods: {
        onJump(type) {
            this.jump(type);
        },
        jump(type) {
            this.$router.push({
                path: "/posted",
                query: {
                    type: type
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
</style>

