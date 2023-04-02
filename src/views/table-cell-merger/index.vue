<template>
  <div class="container">
    <table-data title="1:原始数据" :data="data"></table-data>
    <table-data title="2:省市性别列合并" :data="data" :spanMethod="spanMethod1"></table-data>
    <table-data title="3:省市列合并,相同市下面的性别列合并" :data="data" :spanMethod="spanMethod2"></table-data>
    <table-data title="4:自定义合并,相同性别下的市才可以进行合并" :data="data" :spanMethod="spanMethod3"></table-data>
    <table-data title="5:横向合并-和上海市" :data="data" :spanMethod="spanMethod4"></table-data>
  </div>
</template>

<script lang="ts" setup>
import tableData from '@/views/table-cell-merger/table-data/index'
import { TableCellMerger, CellValueWrapper } from '@cj-toolkit-x/table-cell-merger'

const data = [
  {
    id: 1,
    code: '001',
    gender: '男',
    cnName: '张三',
    age: 18,
    province: '湖北',
    city: '武汉'
  },
  {
    id: 2,
    code: '002',
    gender: '男',
    cnName: '李四',
    age: 18,
    province: '湖北',
    city: '武汉'
  },
  {
    id: 3,
    code: '003',
    gender: '男',
    cnName: '王五',
    age: 19,
    province: '湖北',
    city: '黄冈'
  },
  {
    id: 4,
    code: '004',
    gender: '女',
    cnName: '赵六',
    age: 19,
    province: '湖北',
    city: '黄冈'
  },
  {
    id: 5,
    code: '005',
    gender: '女',
    cnName: '王二麻子',
    age: 18,
    province: '上海',
    city: '上海'
  },
  {
    id: 6,
    code: '006',
    gender: '女',
    cnName: '张三',
    age: 18,
    province: '上海',
    city: '上海'
  }
]
/* 省市性别行合并 */
// 构建一个表格合并计算器
const tableCellMerger1 = new TableCellMerger()
// 设置参数
tableCellMerger1.setOptions({
  mergeColumns: ['province', 'city', 'gender']
})
// 绑定数据
tableCellMerger1.mergeCell(data)
const spanMethod1 = function (params: { row: Record<string, any>, column: { property: string } }) {
  const {
    row,
    column
  } = params
  const { property } = column
  return tableCellMerger1.getCellMergeInfo(row, property)
}
/* 省市合并,相同市下面的性别合并 */
// 构建一个表格合并计算器
const tableCellMerger2 = new TableCellMerger()
// 设置参数
tableCellMerger2.setOptions({
  mergeColumns: ['province', 'city', 'gender'],
  mergeColumnsRelations: { gender: 'city' }
})
// 绑定数据
tableCellMerger2.mergeCell(data)
const spanMethod2 = function (params: { row: Record<string, any>, column: { property: string } }) {
  const {
    row,
    column
  } = params
  const { property } = column
  return tableCellMerger2.getCellMergeInfo(row, property)
}
/* 自定义合并,相同性别下的市才可以进行合并 */
// 构建一个表格合并计算器
const tableCellMerger3 = new TableCellMerger()
// 设置参数
tableCellMerger3.setOptions({
  mergeColumns: ['province', 'city', 'gender'],
  mergeColumnsRelations: { gender: 'city' },
  judgeValueEquals (cur: CellValueWrapper, // 当前值
    next: CellValueWrapper, // 下一个值
    tableCellMerger: TableCellMerger, // 单元格合并管理器
    vertical: boolean): boolean {
    const { prop } = cur
    if (prop === 'city') {
      // 如果当前比较的市城市 那么先检查市
      if (next.rowData.gender !== cur.rowData.gender) {
        return false
      }
    }
    return !!tableCellMerger.defaultTableMergeOptions.judgeValueEquals?.(cur, next, tableCellMerger, vertical)
  }
})
// 绑定数据
tableCellMerger3.mergeCell(data)
const spanMethod3 = function (params: { row: Record<string, any>, column: { property: string } }) {
  const {
    row,
    column
  } = params
  const { property } = column
  return tableCellMerger3.getCellMergeInfo(row, property)
}

/* 横向合并 */
// 构建一个表格合并计算器
const tableCellMerger4 = new TableCellMerger()
// 设置参数
tableCellMerger4.setOptions({
  mergeColumns: ['province', 'city', 'gender'],
  mergeColumnsRelations: { gender: 'city' },
  horizontalColumns: ['province', 'city'], // 横向合并省市
  judgeValueEquals (cur: CellValueWrapper, // 当前值
    next: CellValueWrapper, // 下一个值
    tableCellMerger: TableCellMerger, // 单元格合并管理器
    vertical: boolean): boolean {
    const { prop } = cur
    // 纵向合并
    if (prop === 'city') {
      // 如果当前比较的市城市 那么先检查市
      if (next.rowData.gender !== cur.rowData.gender) {
        return false
      }
    }
    return !!tableCellMerger.defaultTableMergeOptions.judgeValueEquals?.(cur, next, tableCellMerger, vertical)
  }
})
// 绑定数据
tableCellMerger4.mergeCell(data)
const spanMethod4 = function (params: { row: Record<string, any>, column: { property: string } }) {
  const {
    row,
    column
  } = params
  const { property } = column
  return tableCellMerger4.getCellMergeInfo(row, property)
}

</script>

<style scoped lang="scss">
.container {
  display: grid;
  grid-template-columns: repeat(2,calc(50% - 5px));
  grid-gap: 10px;
  :deep(.table-data-container) {
    display: flex;
    flex-flow: column;
    .title {
      display: inline-block;
      font-size: 24px;
      font-weight: 600;
      text-align: left;
      padding: 10px;
    }
  }

}

</style>
