<template>
  <section>
    <table class="topTable">
      <tr>
        <td>深圳市店铺数：</td><td>0</td>
        <td>营业收入总额：</td><td>1</td>
        <td>待购买优惠券总量：</td><td>2</td>
        <td>邀请好友总数：</td><td>3</td>
      </tr>
      <tr>
        <td>非深圳市店铺数：</td><td>4</td>
        <td>可提现总余额：</td><td>5</td>
        <td>待消费优惠券总量：</td><td>6</td>
        <td>邀请店铺总数：</td><td>7</td>
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
