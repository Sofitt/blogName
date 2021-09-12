<template>
  <div :id="'drop'+uid" class="drop">
    <button class="drop__btn" @click.prevent="changeExpandState($event.target)">
      <span class="drop__mainTitle">
        <span v-if="checkboxState === true" class="drop__mainTitle">
        {{ categoryTitle }}
        </span>
        <span v-if="checkboxState === false" class="drop__mainTitle">
        {{ mainTitle }}
        </span>
      </span>
      <span :id="'arrow'+uid" class="drop__icon arrow down"></span>
    </button>

    <div v-if="checkboxState === true && expandState === true" class="drop__list">
      <searchField :title="'Поиск по категориям'"/>
      <div class="drop__inner">
        <div class="item" :key="item.index" v-for="(item, index) of items" @click="changeItemActive('check', index);">
          <label class="drop__item">
            <input :id="'check'+uid+index" :value="{id: item.id, title: item.title, subtitles: []}" v-model="itemsArr"
                   type="checkbox" class="drop__checkbox">
            <span class="drop__title">{{ item.title }}</span>
            <span :id="'icon'+uid+index" v-if="item.subtitles" class="drop__icon arrow down"
                  style="border-color: #C7C7C7;"></span>
          </label>
          <div :id="'list'+uid+index" class="sub">
            <label v-for="(sub, index) of item.subtitles" class="drop__item"
                   @click="changeItemActive('subCheck', index)">
              <input :id="'subCheck'+uid+index" :value="{subtitles: sub, id: item.id}" v-model="subArr" type="checkbox"
                     class="drop__checkbox">
              <span class="drop__title">{{ sub }}</span>
            </label>
          </div>
        </div>
      </div>
      <div v-if="acceptPanel === true" class="drop__acceptPanel">
        <button class="drop__accept" @click="accept()">Принять</button>
      </div>
    </div>
    <div :id="'list'+uid" v-if="checkboxState === false && expandState === true" class="drop__list short">
      <div :id="'item'+uid+index" class="item" :key="item.index" v-for="(item, index) of items"
           @click="setRadio(index, uid)">
        <label class="drop__item short">
          <span class="drop__title short">{{ item.title }}</span>
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
      mainTitle: this.title,
      categoryTitle: this.title,
      // States
      expandState: false,
      checkboxState: false,
      acceptPanel: false,
      // Arr
      //=-CATEGORY
      itemsArr: [],
      subArr: [],
      //=-TYPE
      typeArr: [],
      //=-SORT
      sortArr: [],
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
      } else if (target.classList[0] == 'drop__btn') {
        let arrow = target.childNodes[2];
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
        checkbox = document.getElementById(item + this.uid + id);
        icon = document.getElementById('icon' + this.uid + id)
        subList = document.getElementById('list' + this.uid + id)
      } else if (item === 'subCheck') {
        checkbox = document.getElementById(item + this.uid + id);
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

    setShortArr(arr) {
      if (arr.id.slice(4, 5) === '2') {
        this.typeArr = arr;
        this.mainTitle = arr.title;
        this.$store.commit('searchFilter/setFilterBtnsState', true);
        let text = document.getElementById('list' + this.uid).parentNode.childNodes[0].childNodes[0];
        text.style.color = '#43A5D2';
      } else if (arr.id.slice(4, 5) === '3') {
        this.sortArr = arr;
        this.mainTitle = arr.title;
        this.$store.commit('searchFilter/setFilterBtnsState', true);
        let text = document.getElementById('list' + this.uid).parentNode.childNodes[0].childNodes[0];
        text.style.color = '#43A5D2';
      }
    },
    setRadio(index, id) {
      let list = document.getElementById('list' + id).childNodes;
      let item = document.getElementById('item' + this.uid + index);
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('active');
      }
      item.classList.add('active');
      console.log('jopa', item);

      // свернуть список
      this.expandState = false;
      item.parentNode.parentNode.childNodes[0].childNodes[2].classList.add('down');
      item.parentNode.parentNode.childNodes[0].childNodes[2].classList.remove('up', 'active');
      item.parentNode.parentNode.childNodes[0].classList.remove('active');

      this.setShortArr({id: item.id, title: item.childNodes[0].childNodes[0].textContent});
    },
    async accept() {
      await this.$store.dispatch('searchFilter/updateTag', this.itemsArr);
      await this.$store.dispatch('searchFilter/updateSubTag', this.subArr);
      await this.$store.dispatch('searchFilter/setNewTitle');

      // свернуть список
      let arrow = document.getElementById('arrow'+this.uid);
      this.expandState = false;
      arrow.classList.add('down');
      arrow.classList.remove('up', 'active');
      arrow.parentNode.classList.remove('active');
      arrow.previousElementSibling.classList.add('active');
    },
    sendData() {
      this.$store.commit('searchFilter/setSearch', {
        cat: {title: this.itemsArr, sub: this.subArr},
        type: this.typeArr,
        sort: this.sortArr,
      })
    }
  },
  computed: {
    searchTags() {
      return this.$store.getters["searchFilter/getCurrentTitle"];
    }
  },
  watch: {
    itemsArr(newValue) {
      if (newValue[0]) {
        console.log('newValue', newValue);
        this.acceptPanel = true;
        this.$store.commit('searchFilter/setFilterBtnsState', true);
      } else {
        this.acceptPanel = false;
        this.$store.commit('searchFilter/setFilterBtnsState', false);
      }
      if (newValue)
        // this.$store.dispatch('searchFilter/updateTag', this.itemsArr);
        console.log('main', this.itemsArr);
    },
    subArr() {
      // this.$store.dispatch('searchFilter/updateSubTag', this.subArr);
      console.log('sub', this.subArr);
    },
    searchTags(newValue) {
      if (newValue !== '') {
        this.categoryTitle = newValue;
      } else {
        this.categoryTitle = this.title;
        let arrow = document.getElementById('arrow'+this.uid);
        arrow.previousElementSibling.classList.remove('active');
      }
    }
  },
  mounted() {
    if (this.isCheckbox) {
      this.checkboxState = this.isCheckbox;
    } else this.checkboxState = false;
  },
}
</script>

<style lang="scss">
@import "../assets/scss/style";

.drop {
  display: flex;
  flex-flow: column;
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

    background: #FFFFFF;
    border: 1px solid #E8E6E6;
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(199, 199, 199, 0.28);
    border-radius: 4px;

    &.short {
      padding: 0;
    }
  }

  &__inner {
    padding: 0px 10px;
    max-height: 221px;
    overflow-y: auto;
  }

  // Плашка принять
  &__acceptPanel {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: flex-end;
    background: white;
    height: 50px;
    width: 100%;
  }

  &__accept {
    margin-right: 19px;
    background: transparent;
    padding: 8px;
    border: 1px solid rgba(67, 165, 210, 0);
    color: #43A5D2;

    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */
    //text-align: right;
    letter-spacing: 0.2px;

    &:hover {
      border: 1px solid #43A5D2;
      border-radius: 5px;
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

    &:hover {
      background: rgba(241, 242, 246, 1);
      border-radius: 6px;
      @include transitionAll();
      //transition: all 0.3s ease 0s;
    }

    &.short {
      padding: 16px 18px;

      &:hover {
        border-radius: 0;
      }
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
  margin-bottom: 4px;

  .searchField__find {
    padding-left: 18px;
  }

  .searchField__input {
    //background: red;
    height: 50px;
    padding-left: 54px;
  }
}
</style>
