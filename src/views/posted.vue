<template>
    <div class="posted">
        <el-form ref="postForm" :model="postForm" :rules="formRules" label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model.trim="postForm.title" placeholder="请输入标题" :disabled="type==='view'"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model.trim="postForm.content" :autosize="{ minRows: 10, maxRows: 10}" placeholder="开始你的创作吧" :disabled="type==='view'"></el-input>
            </el-form-item>
            <el-form-item v-if="type !== 'view'">
                <el-button>取消</el-button>
                <el-button type="primary" @click="onEnsure">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { addArticle, view } from "../service/index.js";
export default {
    data() {
        return {
            postForm: {
                title: "",
                content: ""
            },
            formRules: {
                title: [
                    {
                        required: true,
                        message: "请输入标题",
                        trigger: "blur"
                    }
                ],
                content: [
                    {
                        required: true,
                        message: "请输入内容",
                        trigger: "blur"
                    }
                ]
            },
            type: this.$route.query.type
        };
    },
    methods: {
        onEnsure() {
            this.add();
        },
        add() {
            this.$refs["postForm"].validate(valid => {
                if (valid) {
                    addArticle(this.postForm)
                        .then(data => {
                            this.$message({
                                type: "success",
                                message: "发布成功"
                            });
                            this.$route.push({
                                path: "/list"
                            });
                        })
                        .catch(err => {
                            this.$message({
                                type: "error",
                                message: err.message || err
                            });
                        });
                }
            });
        }
    },
    created() {
        if (this.type === "view" || this.type === "edit") {
            view({ id: this.$route.query.id })
                .then(data => {
                    const res = data.data;
                    this.postForm.content = res.content;
                    this.postForm.title = res.title;
                })
                .catch();
        }
    }
};
</script>


