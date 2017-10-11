<template>
    <div>
        <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
    </div>
</template>
<style>

</style>
<script>
  import UE from './ueditorinit';
  export default {
    components: {UE},
    data() {
      return {
        defaultMsg: '富文本 is ready',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        }
      }
    },
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
      }
    }
  };
</script>