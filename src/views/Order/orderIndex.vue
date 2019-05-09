<template>
  <section>
    <table class="topTable">
      <tr>
        <td>待消费总金额：</td><td>0</td>
        <td>已消费总金额：</td><td>1</td>
        <td>退款总金额：</td><td>2</td>
      </tr>
      <tr>
        <td>用户量：</td><td>4</td>
        <td>用户量：</td><td>5</td>
        <td>用户量：</td><td>6</td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.topTable {
	margin: 20px 0;
	border: 1px solid #F2F2F2;
  tr{
    height: 25px;
    line-height: 25px;
    td{
      width: 150px;
    }
    td:nth-child(odd) {
      background: lightblue;
      text-align: right;
    }
  }
}
</style>
