<template>
  <section>
    <table class="topTable" v-if="!searchPage">
      <tr>
        <td class="t-tit">深圳市店铺数：</td>
        <td>0</td>
        <td class="t-tit">营业收入总额：</td>
        <td>1</td>
        <td class="t-tit">待购买优惠券总量：</td>
        <td>2</td>
        <td class="t-tit">邀请好友总数：</td>
        <td>3</td>
      </tr>
      <tr>
        <td class="t-tit">非深圳市店铺数：</td>
        <td>4</td>
        <td class="t-tit">可提现总余额：</td>
        <td>5</td>
        <td class="t-tit">待消费优惠券总量：</td>
        <td>6</td>
        <td class="t-tit">邀请店铺总数：</td>
        <td>7</td>
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
      .t-tit {
        background: lightblue;
        text-align: right;
      }
    }
  }
}
</style>
