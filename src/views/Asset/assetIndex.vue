<template>
  <section>
    <table class="topTable">
      <tr>
        <td>今日银行卡提现笔数：</td><td>0</td>
        <td>今日微信提现笔数：</td><td>1</td>
        <td>今日支付宝提现笔数：</td><td>2</td>
        <td>可提现总余额：</td><td>3</td>
      </tr>
      <tr>
        <td>金额：</td><td>4</td>
        <td>金额：</td><td>5</td>
        <td>金额：</td><td>6</td>
        <td>累计提现金额：</td><td>7</td>
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
