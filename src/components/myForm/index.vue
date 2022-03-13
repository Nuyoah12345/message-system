<template>
  <el-form :model="form" :inline="true" label-width="100px">
    <el-form-item
      :label="item.label"
      v-for="item in formLabel"
      :key="item.label"
    >
      <el-input
        v-model="form[item.model]"
        v-if="item.type == 'input'"
        :placeholder="`请输入${item.label}`"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        v-if="item.type == 'pass'"
        type="password"
        v-model="form[item.model]"
        autocomplete="off"
      ></el-input>
      <el-switch
        v-if="item.type == 'switch'"
        v-model="form[item.model]"
      ></el-switch>
      <el-select
        v-if="item.type == 'select'"
        v-model="form[item.model]"
        :placeholder="'请选择'"
      >
        <el-option
          v-for="o in item.opts"
          :key="o.value"
          :value="o.value"
          :label="o.label"
        ></el-option>
      </el-select>
      <el-date-picker
        v-if="item.type == 'date'"
        v-model="form[item.model]"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </el-form-item>

    <!-- 插槽用来改变布局 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "myForm",
  props: ["formLabel", "form"],
};
</script>

<style>
</style>