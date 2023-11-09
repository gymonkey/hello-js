<template>
  <el-table v-loading="loading" :data="data" border style="width: 100%">
    <el-table-column prop="createdAt" label="创建时间">
      <template #default="scope">
        {{ dayjs(scope.text).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column prop="name" label="分类名称" />
    <el-table-column prop="seq" label="排序" />
    <el-table-column label="操作">
      <template #header>
        <el-button type="primary" @click="onAdd">新增</el-button>
      </template>
      <template #default="scope">
        <el-button
          type="primary"
          :icon="Edit"
          circle
          @click="onEdit(scope.row)"
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

  <el-dialog :title="current ? '编辑分类' : '新增分类'" v-model="dialogVisible">
    <el-form label-width="120px" :model="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="form.seq" />
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
import { Edit, Delete } from "@element-plus/icons-vue";
import { axios } from "@/service";

const form = ref({});
const searchForm = ref({});
const dialogVisible = ref(false);
const current = ref();
const data = ref([]);
const loading = ref(false);

function onAdd() {
  dialogVisible.value = true;
  current.value = null;
  form.value = {};
}

function onEdit(row) {
  dialogVisible.value = true;
  current.value = row;
  form.value = { ...row };
}

async function onSubmit() {
  try {
    await axios.post("/category/save", toRaw(form.value));
    ElMessage.success("保存成功");
    dialogVisible.value = false;
    await getList();
  } catch (e) {
    ElMessage.error(e.msg);
  }
}
function onCancel() {
  dialogVisible.value = false;
}

async function onDelete(row) {
  try {
    await axios.post("/category/delete", { id: row.id });
    ElMessage.success("删除成功");
    await getList();
  } catch (e) {
    ElMessage.error(e.msg);
  }
}

async function getList() {
  // 获取列表
  loading.value = true;
  try {
    const res = await axios.get("/category/list");
    data.value = res;
  } catch (e) {
    ElMessage.error(e.msg);
  }
  loading.value = false;
}

getList();
</script>

<style lang="scss" scoped></style>
