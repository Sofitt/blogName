const state = () => ({
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
  searchTags: []
})
const mutations = {
  setTag(state, data) {
    state.searchTags = data;
    // console.log('ex', state.searchTags);
  },
  setSubTag(state, data) {
  let result;
    state.data[0].categories.forEach(item => {
      for (let i = 0; i < data.length; i++) {
        try {
          if (item.subtitles.findIndex(elem => elem === data[i]) > -1) {
            result = item.subtitles.findIndex(elem => elem === data[i]);

            //== Баг по сбросу основного значения здесь
            state.searchTags.forEach(obj => {
              if (obj.id === item.id) {
                // console.log('+');
                // obj.subtitle = '';
                obj.subtitles.push(item.subtitles[result]);
                console.log(obj.subtitles);
              }
            })
            //=====================================

            console.log('search', state.searchTags);
            // state.searchTags
            // Понять в каком объекте лежит нужный id
          }
        } catch (e) {
        }
      }


    })

    /*
    state.data[0].categories.forEach(item => {
      for (let i = 0; i < data.length; i++) {
        try {
          if (item.subtitles.findIndex(elem => elem === data[i]) > -1) {
            result = item.subtitles.findIndex(elem => elem === data[i]);
            state.searchTags.forEach(obj => {
              if (obj.id === item.id) {
                // console.log('+');
                // obj.subtitle = '';
                obj.subtitles.push(item.subtitles[result]);
                console.log(obj.subtitles);
              }
            })
            console.log('search', state.searchTags);
            // state.searchTags
            // Понять в каком объекте лежит нужный id
          }
        } catch (e) {
        }
      }


    })
     */
  },
  clearSubTags(state) {
    for (let sub of state.searchTags) {
      sub.subtitles = [];
    }
  },
  updateTag(state) {

  }
}
const actions = {
  updateSubTag(ctx, data) {
    ctx.commit('clearSubTags');
    ctx.commit('setSubTag', data);
  }
}
const getters = {
  getFilterData(state) {
    return state.data;
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
  // getFilterWithSubtitle(state) {
  //   let arr = [];
  //     for (let item of state.data[0].categories) {
  //       if (item.subtitles.length > 0) {
  //         arr.push({id: item.id, subtitles: item.subtitles});
  //       }
  //     }
  //     return arr;
  // }
}
export default {
  state,
  mutations,
  actions,
  getters,
}
