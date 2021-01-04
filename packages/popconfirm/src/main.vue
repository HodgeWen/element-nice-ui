<template>
  <el-popover
    v-bind="$attrs"
    v-model="visible"
    trigger="click"
  >
  <div class="el-popconfirm">
    <p class="el-popconfirm__main">
    <i
      v-if="!hideIcon"
      :class="icon"
      class="el-popconfirm__icon"
      :style="{color: iconColor}"
    ></i>
      {{title}}
    </p>
    <div class="el-popconfirm__action">
      <el-btn
        size="mini"
        :type="cancElBtnType"
        @click="cancel"
      >
        {{cancelBtnText}}
      </el-btn>
      <el-btn
        size="mini"
        :type="confirmButtonType"
        @click="confirm"
      >
        {{confirmButtonText}}
      </el-btn>
    </div>
  </div>
  <!-- <template #reference>

  </template> -->
  <slot  slot="reference"></slot>
</el-popover>
</template>

<script>
import ElPopover from 'element-nice-ui/packages/popover';
import ElBtn from 'element-nice-ui/packages/btn';
import {t} from 'element-nice-ui/src/locale';

export default {
  name: 'ElPopconfirm',
  props: {
    title: {
      type: String,
      default: '确认执行当前操作吗?'
    },
    confirmButtonText: {
      type: String,
      default: t('el.popconfirm.confirmButtonText')
    },
    cancelBtnText: {
      type: String,
      default: t('el.popconfirm.cancelBtnText')
    },
    confirmButtonType: {
      type: String,
      default: 'primary'
    },
    cancElBtnType: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: 'el-icon-question'
    },
    iconColor: {
      type: String,
      default: '#f90'
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElPopover,
    ElBtn
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    confirm() {
      this.visible = false;
      this.$emit('confirm');
    },
    cancel() {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>
