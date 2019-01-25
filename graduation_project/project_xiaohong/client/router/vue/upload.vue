<template>
    <div>
        <!--{{getImgSrc}}-->
        <el-upload
                class="avatar-uploader"
                action="/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="initImageUrl" :src="getImgSrc" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="alert_text">(请点击图片进行更改)</div>
    </div>
</template>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        left: 50%;
        margin-left: -90px;
        margin-top: 0.2rem;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    input[type=file]{
        display: none;
    }
    .alert_text{
        width: 100%;
        text-align: center;
        height: 0.2rem;
        line-height: 0.2rem;
        margin-bottom: 0.2rem;

    }
</style>

<script>
    export default {
        computed:{
            initImageUrl(){
                return this.img;
            },
            getImgSrc(){
                if(this.imgUrl){
                    return this.imgUrl;
                }else{
                    return this.initImageUrl;
                }
            },
        },
        watch:{
            getImgSrc(newValue,oldValue){
               this.$emit("showNewValue",newValue)
            }
        },
        mounted(){

        },
        props:["img"],
        data() {
            return {
                imgUrl:""
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log("res",JSON.parse(res).imgSrc);
                console.log("file",file);
                this.imgUrl=JSON.parse(res).imgSrc;
//                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

//                if (!isJPG) {
//                    this.$message.error('上传头像图片只能是 JPG 格式!');
//                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
//                return isJPG && isLt2M;
                return isLt2M;
            }
        }
    }
</script>