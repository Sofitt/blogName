const state = () => ({
  filterBtnsState: false,
  data: [
    {
      categories:
        [
          {id: 0, title: 'Финансы', subtitles: ["Финансовая грамотность", "Налоговые льготы"]},
          {id: 1, title: 'Трудоустройство'},
          {id: 2, title: 'Наука', subtitles: ['Астрономия', "Физика"]}
        ]
    },
    {
      types:
        [
          {id: 0, title: 'Только статьи'},
          {id: 1, title: 'Только Prof-Post'},
          {id: 2, title: 'Показать все'}
        ]
    },
    {
      sort:
        [
          {id: 0, title: 'Сначала новые'},
          {id: 1, title: 'Сначала старые'},
          {id: 2, title: 'Сначала популярные'}
        ]
    },
  ],
  searchTags: [],
  currentTitle: '',
})
const mutations = {
  setCurrentTitle(state) {
    let temp = [];
      state.searchTags.forEach(item => {
            temp.push(item.title);
            item.subtitles.forEach(el => {
              temp.push(el);
              console.log(el);
            })
      })
    state.currentTitle = temp.join(', ');
  },
  resetCurrentTitle(state) {
    state.currentTitle = '';
  },
  setTag(state, data) {
    state.searchTags = data;
  },

  clearTags(state) {
    state.searchTags = [];
  },
  setSubTag(state, arr) {
    state.searchTags.forEach(item => {
      arr.forEach(elem => {
        console.log('elem', elem);
        console.log('item', item);

        if(item.id === elem.id) {
          item.subtitles.push(elem.subtitles);
        }
      })
      console.log('state.searchTags', state.searchTags);
    })
  },
  // setSubTag(state, arr) {
  //   let result;
  //   for (let i = 0; i < arr.length; i++) {
  //     state.data[0].categories.forEach(item => {
  //       try {
  //         if (item.subtitles.findIndex(elem => elem === arr[i]) > -1) {
  //           result = item.subtitles.findIndex(elem => elem === arr[i]);
  //
  //           //== Баг по сбросу основного значения здесь
  //           try {
  //             state.searchTags.forEach(obj => {
  //               if (obj.id === item.id) {
  //                 obj.subtitles.push(item.subtitles[result]);
  //                 console.log(obj.subtitles);
  //               }
  //             })
  //           } catch (e) {
  //             console.log('reset', e);
  //           }
  //
  //           //=====================================
  //
  //           console.log('search', state.searchTags);
  //           // state.searchTags
  //           // Понять в каком объекте лежит нужный id
  //         }
  //       } catch (e) {
  //       }
  //     })
  //   }
  //
  //
  //   /*
  //   setSubTag(state, arr) {
  // let result;
  //   state.data[0].categories.forEach(item => {
  //     for (let i = 0; i < arr.length; i++) {
  //       try {
  //         if (item.subtitles.findIndex(elem => elem === arr[i]) > -1) {
  //           result = item.subtitles.findIndex(elem => elem === arr[i]);
  //
  //           //== Баг по сбросу основного значения здесь
  //           try {
  //             state.searchTags.forEach(obj => {
  //               if (obj.id === item.id) {
  //                 // console.log('+');
  //                 // obj.subtitle = '';
  //                 obj.subtitles.push(item.subtitles[result]);
  //                 console.log(obj.subtitles);
  //               }
  //             })
  //           } catch (e) {
  //             console.log('reset', e);
  //           }
  //
  //           //=====================================
  //
  //           console.log('search', state.searchTags);
  //           // state.searchTags
  //           // Понять в каком объекте лежит нужный id
  //         }
  //       } catch (e) {
  //       }
  //     }
  //
  //
  //   })
  //
  //   /*
  //   state.data[0].categories.forEach(item => {
  //     for (let i = 0; i < data.length; i++) {
  //       try {
  //         if (item.subtitles.findIndex(elem => elem === data[i]) > -1) {
  //           result = item.subtitles.findIndex(elem => elem === data[i]);
  //           state.searchTags.forEach(obj => {
  //             if (obj.id === item.id) {
  //               // console.log('+');
  //               // obj.subtitle = '';
  //               obj.subtitles.push(item.subtitles[result]);
  //               console.log(obj.subtitles);
  //             }
  //           })
  //           console.log('search', state.searchTags);
  //           // state.searchTags
  //           // Понять в каком объекте лежит нужный id
  //         }
  //       } catch (e) {
  //       }
  //     }
  //
  //
  //   })
  //    */
  // },

  clearSubTags(state) {
    for(let tag of state.searchTags) {
      tag.subtitles = [];
    }
  },
  setFilterBtnsState(state, boolean) {
    state.filterBtnsState = boolean;
  }
}
const actions = {
  async updateTag(ctx, arr) {
    await ctx.commit('clearTags');
    await ctx.commit('setTag', arr);
  },
  async updateSubTag(ctx, arr) {
    await ctx.commit('clearSubTags');
    await ctx.commit('setSubTag', arr);
  },
  async setNewTitle(ctx) {
    return ctx.commit('setCurrentTitle');
  },
}
const getters = {
  getFilterBtnsState(state) {
    return state.filterBtnsState;
  },
  getCurrentTitle(state) {
    return state.currentTitle;
  },
  getFilterCategories(state) {
    return state.data[0].categories;
  },
  getFilterListType(state) {
    return state.data[1].types;
  },
  getFilterSort(state) {
    return state.data[2].sort;
  },
}
export default {
  state,
  mutations,
  actions,
  getters,
}
