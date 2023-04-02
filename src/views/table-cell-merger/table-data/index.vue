<template>
  <div class="table-data-container">
    <span class="title">{{ title }}</span>
    <el-table :data="data" highlight-current-row border :spanMethod="spanMethod">
      <el-table-column label="省" prop="province" align="center"></el-table-column>
      <el-table-column label="市" prop="city" align="center"></el-table-column>
      <el-table-column label="性别" prop="gender"></el-table-column>
      <el-table-column label="编号" prop="code"></el-table-column>
      <el-table-column label="姓名" prop="cnName"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
    </el-table>
  </div>

</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn } from 'element-plus'
import { defineProps } from 'vue'

// 定义一个spanMethod 属性用于外面传递合并数据方法
const props = defineProps({
  spanMethod: {
    type: Function
  },
  title: {
    type: String
  },
  data: {
    type: Array
  }
})

</script>

<style scoped lang="scss">
</style>
