export default {
  data() {
    return {
      hoverOption: -1
    };
  },

  computed: {
    optionsAllDisabled() {
      return this.internalOptions.filter(option => option.visible).every(option => option.disabled);
    }
  },

  watch: {
    hoverIndex(val) {
      if (typeof val === 'number' && val > -1) {
        this.hoverOption = this.internalOptions[val] || {};
      }
      this.internalOptions.forEach(option => {
        option.hover = this.hoverOption === option;
      });
    }
  },

  methods: {
    navigateOptions(direction) {
      if (!this.visible) {
        this.visible = true;
        return;
      }
      if (this.internalOptions.length === 0 || this.filteredOptionsCount === 0) return;
      if (!this.optionsAllDisabled) {
        if (direction === 'next') {
          this.hoverIndex++;
          if (this.hoverIndex === this.internalOptions.length) {
            this.hoverIndex = 0;
          }
        } else if (direction === 'prev') {
          this.hoverIndex--;
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.internalOptions.length - 1;
          }
        }
        const option = this.internalOptions[this.hoverIndex];
        if (option.disabled === true ||
          option.groupDisabled === true ||
          !option.visible) {
          this.navigateOptions(direction);
        }
        this.$nextTick(() => this.scrollToOption(this.hoverOption));
      }
    }
  }
};
