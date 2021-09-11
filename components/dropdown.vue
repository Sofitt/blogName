<template>
  <div class="drop">
    <button class="drop__btn" @click.prevent="changeExpandState($event.target)">
      {{title}}
      <span class="drop__icon arrow down"></span>
    </button>
    <div v-if="checkboxState === true" class="drop__list">
      <searchField :title="'Поиск по категориям'"></searchField>
      <div class="item" :key="item.index" v-for="(item, index) of items" @click="changeItemActive('check', index);">
        <label class="drop__item">
          <input :id="'check'+uid+index" :value="{id: item.id, title: item.title, subtitles: []}" v-model="itemsArr" type="checkbox" class="drop__checkbox">
          <span class="drop__title">{{item.title}}</span>
          <span :id="'icon'+uid+index" v-if="item.subtitles" class="drop__icon arrow down" style="border-color: #C7C7C7;"></span>
        </label>
        <div :id="'list'+uid+index" class="sub">
          <label v-for="(sub, index) of item.subtitles" class="drop__item" @click="changeItemActive('subCheck', index)">
            <input :id="'subCheck'+uid+index" :value="sub" v-model="subArr" type="checkbox" class="drop__checkbox">
            <span class="drop__title">{{sub}}</span>
          </label>
        </div>
      </div>
    </div>
    <div :id="'list'+uid" v-if="checkboxState === false" class="drop__list short">
      <div :id="'item'+uid+index" class="item" :key="item.index" v-for="(item, index) of items" @click="setRadio(index, uid)">
        <label class="drop__item short">
          <span class="drop__title short">{{item.title}}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import searchField from "@/components/searchBar/components/searchField";
export default {
  name: "dropdown",
  props: ['uid', 'isCheckbox', 'title', 'items'],
  components: {searchField},
  data: function () {
    return {
      // States
      expandState: false,
      checkboxState: false,
      // Arr
      itemsArr: [],
      subArr: [],
    }
  },
  methods: {
    changeExpandState(target) {
      this.expandState = !this.expandState
      if (target.classList[0] == 'drop__icon') {
        if (this.expandState === true) {
          target.classList.remove('down');
          target.classList.add('up');
          target.parentNode.classList.add('active');
        } else if (this.expandState === false) {
          target.classList.add('down');
          target.classList.remove('up', 'active');
          target.parentNode.classList.remove('active');
        }
      }
      else if (target.classList[0] == 'drop__btn') {
        let arrow = target.childNodes[1];
        if (this.expandState === true) {
          arrow.classList.remove('down');
          arrow.classList.add('up');
          target.classList.add('active');
        } else if (this.expandState === false) {
          arrow.classList.add('down');
          arrow.classList.remove('up');
          target.classList.remove('active');
        }
      }

    },
    changeItemActive(item, id) {
      let checkbox;
      let icon;
      let subList;
      if (item === 'check') {
        checkbox = document.getElementById(item+this.uid+id);
        icon = document.getElementById('icon'+this.uid+id)
        subList = document.getElementById('list'+this.uid+id)
      } else if (item === 'subCheck') {
        checkbox = document.getElementById(item+this.uid+id);
      }
      if (checkbox.checked === true) {
        checkbox.parentNode.classList.toggle('active')
        if (icon) {
          icon.classList.remove('down');
          icon.classList.add('up');
        }
      if (subList) {
        subList.style.display = 'block';
      }
      } else {
        if (icon) {
          icon.classList.add('down');
          icon.classList.remove('up');
        }
        if (subList) {
          subList.style.display = 'none';
        }
      }
    },
    setRadio(index, id) {
      let list = document.getElementById('list'+id).childNodes;
      let item = document.getElementById('item'+this.uid+index);
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('active');
      }
      item.classList.add('active'); // Отсбда брать данные
    }
  },
  computed: {
  },
  watch: {
subArr() {
  this.$store.dispatch('searchFilter/updateSubTag', this.subArr);
  console.log(this.subArr);
},
itemsArr() {
  this.$store.commit('searchFilter/setTag', this.itemsArr);
  console.log(this.itemsArr);
}
  },
  mounted() {
    if (this.isCheckbox) {
      this.checkboxState = this.isCheckbox;
    } else this.checkboxState = false;
console.log(this.checkboxState);
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

    &.short {
      padding: 0;
    }
  }
  // Modal item
  &__item {
    z-index: -10;
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
    @include transitionAll();
    //transition: all 0.3s ease 0s;

    &:first-child {
      //margin-top: 4px; // **** Отступ надо делать у компонента search.
    }
    &:hover {
      background: rgba(241, 242, 246, 1);
      border-radius: 6px;
      @include transitionAll();
      //transition: all 0.3s ease 0s;
    }
    &.short {
      padding: 16px 18px;
    }
  }
  &__checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
  // Item title
  &__title {
    margin-left: 12px;
    flex: 0 1 89.5%;
    &.short {
      margin-left: 0;
    }
  }
}
.sub {
  display: none;
  padding-left: 36px;
}
// Arrows
.arrow {
  border: solid #C7C7C7;
  border-width: 0 2px 2px 0;
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

// Custom checkboxes
input[type="checkbox"] {
  appearance: none;
  cursor: pointer;
}
label {
  cursor: pointer;
}
input[type="checkbox"]:before {
  border: 1px solid #DCDCDC;
  border-radius: 5px;
  content: "\00a0";
  display: inline-block;
  padding: 0;
  height: 18.5px;
  width: 18.5px;
}
input[type="checkbox"]:checked:before {
  border: 1px solid #43A5D2;
  border-radius: 5px;
  background-image: url("../assets/svg/checked.svg");
  background-repeat: no-repeat;
  background-position: center;
}

// searchField component
.drop__list > .searchField {
  border-bottom: 1px solid #EBEDF5;
  .searchField__find {
    padding-left: 7px;
  }
  .searchField__input {
    //background: red;
    height: 50px;
    padding-left: 45px;
  }
}
</style>
