<template>
  <div class="drop">
    <button class="drop__btn" @click.prevent="changeState($event.target)">
      {{title}}
      <span class="drop__icon arrow down"></span>
    </button>
<!--    v-if="activeState === true"-->
    <div class="drop__list">
      <div class="drop__item" :key="item.id" v-for="item of items">
        <input type="checkbox" class="drop__checkbox">
        <span class="drop__title">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: ['title', 'items'],
  components: {},
  data: function () {
    return {
      activeState: false,
    }
  },
  methods: {
    changeState(target) {
      this.activeState = !this.activeState
      if (target.classList[0] == 'drop__icon') {
        if (this.activeState === true) {
          target.classList.remove('down');
          target.classList.add('up');
          target.parentNode.classList.add('active');
        } else if (this.activeState === false) {
          target.classList.add('down');
          target.classList.remove('up', 'active');
          target.parentNode.classList.remove('active');
        }
      }
      else if (target.classList[0] == 'drop__btn') {
        let arrow = target.childNodes[1];
        if (this.activeState === true) {
          arrow.classList.remove('down');
          arrow.classList.add('up');
          target.classList.add('active');
        } else if (this.activeState === false) {
          arrow.classList.add('down');
          arrow.classList.remove('up');
          target.classList.remove('active');
        }
      }

    }
  },
  computed: {},
  watch: {
    activeState(newValue) {
      if (newValue === true) {

      }
    }
  },
  mounted() {

  },
}
</script>

<style lang="scss">
@import "../assets/scss/style";
.drop {
  display: flex;
  flex-flow: column;
  //align-items: center;
  margin-right: 26px;
  width: 100%;

  &:last-child {
    margin-right: 0;
  }
  // Drop btn
  &__btn {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px 0 18px;
    height: 40px;
    color: #52575C;
    background: #FFFFFF;
    border: 1px solid #E8E6E6;
    border-radius: 6px;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    mix-blend-mode: normal;
  }
  &__icon {
    width: 24px;
    height: 24px;
  }

  // Drop modal
  &__list {
    margin-top: 10px;
    padding: 0px 10px;
    background: #FFFFFF;
    border: 1px solid #E8E6E6;
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(199, 199, 199, 0.28);
    border-radius: 4px;
  }
  &__item {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-start;
    padding: 16px 8px;

    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;

    &:first-child {
      margin-top: 4px;
    }
    &:hover {
      background: rgba(241, 242, 246, 1);
      border-radius: 6px;
      @include transitionAll();
      //transition: all 0.3s ease 0s;
    }
  }
  &__title {
    margin-left: 12px;
  }
}
// Arrows
.arrow {

  border: solid #C7C7C7;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  max-height: 10px;
  max-width: 10px;
}
.up {
  position: relative;
  top: 2px;
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  border-color: #43A5D2;
}
.down {
  position: relative;
  top: -2px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
}

.active {
  border-color: #43A5D2;
  color: #43A5D2;
}

</style>
