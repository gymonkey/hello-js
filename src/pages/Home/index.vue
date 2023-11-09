<template>
  <el-form :inline="true">
    <el-form-item>
      <el-input v-model="searchForm.name" placeholder="请输入名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select placeholder="请选择分类" v-model="searchForm.category">
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="onSearch" type="primary">搜索</el-button>
    </el-form-item>
  </el-form>

  <el-table :data="data" border style="width: 100%">
    <el-table-column prop="createdAt" label="创建时间">
      <template #default="scope">
        {{ dayjs(scope.text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="category.name" label="分类" />
    <el-table-column prop="link" label="跳转地址" />
    <el-table-column prop="cover" label="封面图">
      <template #default="scope">
        <img v-if="scope.row.cover" :src="scope.row.cover" style="width: 100px; height: 100px; object-fit: cover;" />
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #header>
        <el-button type="primary" @click="onAdd">新增</el-button>
      </template>
      <template #default="scope">
        <el-button
          type="primary"
          :icon="Edit"
          @click="onEdit(scope.row)"
          circle
        >
        </el-button>
        <el-popconfirm title="确定要删除吗?" @confirm="onDelete(scope.row)">
          <template #reference>
            <el-button type="danger" :icon="Delete" circle> </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <div style="margin-top: 10px; display: flex; justify-content: flex-end">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="searchForm.total"
      class="mt-4"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    >
    </el-pagination>
  </div>

  <el-dialog :title="current ? '编辑' : '新增'" v-model="dialogVisible">
    <el-form label-width="120px" :rules="rules" ref="$formRef" :model="form">
      <el-form-item prop="name" label="名称">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item prop="category" label="分类">
        <el-select placeholder="请选择分类" v-model="form.category">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="link" label="跳转地址">
        <el-input v-model="form.link" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item prop="cover" label="封面图">
        <div>
          <p-uploader v-model="form.cover" />
          <div>请上传 215*140 不超过100kb大小的图片</div>
        </div>
      </el-form-item>
      <el-form-item prop="seq" label="排序">
        <el-input-number v-model="form.seq"></el-input-number>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onCancel">取消</el-button>
      <el-button @click="onSubmit" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { ref, toRaw } from "vue";
import { Edit, Delete, Plus } from "@element-plus/icons-vue";
import { axios } from "@/service";
import PUploader from "@/components/Uploader.vue";

const rules = {
  name: [{ required: true, message: "请输入名称" }],
  category: [{ required: true, message: "请选择分类" }],
  link: [{ required: true, message: "请输入跳转地址" }],
};

const $formRef = ref();
const form = ref({});
const searchForm = ref({
  page: 1,
  pageSize: 15,
  total: 0,
});
const dialogVisible = ref(false);
const current = ref();
const data = ref([]);
const loading = ref(false);
const categoryList = ref([]);

function onAdd() {
  dialogVisible.value = true;
  current.value = null;
  form.value = {};
}

function onEdit(row) {
  dialogVisible.value = true;
  current.value = row;
  form.value = {
    id: row.id,
    category: row.category?.id,
    name: row.name,
    link: row.link,
    cover: row.cover,
    seq: row.seq
  };
}

async function onSubmit() {
  $formRef.value?.validate(async (valid) => {
    if (!valid) return;
    try {
      await axios.post("/project/save", toRaw(form.value));
      ElMessage.success("保存成功");
      dialogVisible.value = false;
      await getList();
    } catch (e) {
      ElMessage.error(e.msg);
    }
  });
}
function onCancel() {
  $formRef.value?.clearValidate();
  dialogVisible.value = false;
}

async function onDelete(row) {
  try {
    await axios.post("/project/delete", { id: row.id });
    ElMessage.success("删除成功");
    await getList();
  } catch (e) {
    ElMessage.error(e.msg);
  }
}

async function getCategory() {
  const list = await axios.get("/category/list");
  categoryList.value = list;
}

async function getList() {
  // 获取列表
  loading.value = true;
  try {
    const res = await axios.get("/project/page", {
      params: toRaw(searchForm.value),
    });
    data.value = res.data;
    searchForm.value.page = res.page;
    searchForm.value.total = res.total;
  } catch (e) {
    ElMessage.error(e.msg);
  }
  loading.value = false;
}

function onSearch() {
  searchForm.value.page = 1;
  getList();
}

function onSizeChange(size) {
  searchForm.value.pageSize = size;
  getList();
}

function onCurrentChange(page) {
  searchForm.value.page = page;
  getList();
}

getList();
getCategory();
</script>

<style lang="scss" scoped></style>
