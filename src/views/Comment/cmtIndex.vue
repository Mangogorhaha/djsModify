<template>
  <section>
    <table class="topTable">
      <thead>
        <tr>
          <th>全部</th>
          <th>一般</th>
          <th>好评</th>
          <th>有效举报</th>
          <th>无效举报</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
        </tr>
      </tbody>
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
	// border: 1px solid #F2F2F2;
  border-right: 1px solid #F2F2F2;
  border-bottom: 1px solid #F2F2F2;
  tr {
    height: 25px;
    line-height: 25px;
    td {
      text-align: center;
      border-left:1px solid #F2F2F2;
      border-top:1px solid #F2F2F2;
    }
  }
  thead tr {
    background: lightblue;
    th {
      width: 150px;
    }
  }
}
</style>
