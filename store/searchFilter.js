export const state = () => ({
  data: [
    {
      categories:
        [
          {id: 0, title: 'Финансы', subtitles: ["Финансовая грамотность", "Налоговые льготы"]},
          {id: 1, title: 'Трудоустройство', subtitles: []},
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
  ]
})
export const mutations = {}
export const actions = {}
export const getters = {
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
  }
}
