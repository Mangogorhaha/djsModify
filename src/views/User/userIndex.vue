<template>
  <section>
    <table class="topTable">
      <tr>
        <td>本周新增用户量：</td><td>0</td>
        <td>累计用户量：</td><td>1</td>
        <td>有充值记录的用户量：</td><td>2</td>
        <td>待消费总金额：</td><td>3</td>
      </tr>
      <tr>
        <td>本月新增用户量：</td><td>4</td>
        <td>被邀请注册的用户量：</td><td>5</td>
        <td>有消费记录的用户量：</td><td>6</td>
        <td>已消费总金额：</td><td>7</td>
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
