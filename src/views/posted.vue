<template>
    <div class="posted">
        <el-form ref="postForm" :model="postForm" :rules="formRules" label-width="100px">
            <el-form-item label="标题" prop="title">
                <el-input v-model.trim="postForm.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model.trim="postForm.content" :autosize="{ minRows: 10, maxRows: 10}" placeholder="开始你的创作吧"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onDel">取消</el-button>
                <el-button type="primary" @click="onEnsure">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import service from "@/service";
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
            }
        };
    },
    created() {},
    methods: {
        onEnsure() {
            this.add();
        },
        onDel() {
            this.$refs.postForm.resetFields();
        },
        add() {
            this.$refs["postForm"].validate(valid => {
                if (valid) {
                    const params = {
                        title: this.postForm.title,
                        content: this.postForm.content
                    };
                    service
                        .posted(params)
                        .then(res => {
                            if (res.status === "success") {
                                this.$message.success("发布成功了");
                                this.$router.push("/list");
                            }
                        })
                        .catch(err => {
                            this.$message.error(err && err.message);
                        });
                }
            });
        }
    }
};
</script>


