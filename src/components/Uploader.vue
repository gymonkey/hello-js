<template>
  <el-upload
    action="/"
    class="avatar-uploader"
    :show-file-list="false"
    accept="image/*"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :http-request="uploadRequest"
  >
    <div style="display:flex;">
      <img style="object-fit: cover" v-if="modelValue" :src="modelValue" class="avatar" />
      <el-icon class="avatar-uploader-icon"><plus /></el-icon>
    </div>
  </el-upload>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
})

const handleAvatarSuccess = (res, file) => {
  emit('update:modelValue', res.data.url);
};

const beforeAvatarUpload = (file) => {
  const isLt200k = file.size / 1024  < 100;
  console.log(file)
  if (!isLt200k) {
    ElMessage.error("图片大小不能超过200k");
  }
  return isLt200k;
};

function uploadRequest({file}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (e) {
      resolve({
        data: {
          url: e.target.result
        }
      })
    }

    reader.readAsDataURL(file)
});
}
</script>

<style>
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  margin-right: 20px;  
  border: 1px dashed #d9d9d9;
}
</style>
