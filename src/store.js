import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: "true",
    sidecolor: "blue",
    ArticleData: [],
    articleDataTemp: [],
    newarticle: [],
    serchlist: [],
    sideflag: true,
    user: {},
    urls: [],
    artype: [],
    userlist: [],
    tempurls: [],
    topbarflag: false,
    switch1: false,
    overlay: false,
    carouselflag: false
  },
  mutations: {
    selectArticle(state, e) {
      let el = state.articleDataTemp
      state.ArticleData = []
      el.forEach(Element => {
        if (Element[e.type] === e.data) {
          state.ArticleData.push(Element)
        }
      });
    },
    filterUser(state) {
      let el = state.articleDataTemp;
      let artype = [];
      let user = [];
      el.forEach(e => {
        if (e.articletype) {
          artype.push(e.articletype);
        }
        if (e.username) {
          user.push(e.username);
        }
      });
      state.artype = Array.from(new Set(artype));
      state.userlist = Array.from(new Set(user));
    },
    changesideflag(state) {
      state.sideflag = !state.sideflag;
    },
    change(state) {
      state.blackboardflag = !state.blackboardflag;
      state.homeflag = !state.homeflag;
    },
    addArticleItem(state, data) {
      state.ArticleData.unshift(data);
      state.articleDataTemp.unshift(data)
      this.commit('filterUser')
    },

    readAllDataFormDB(state, Json) {
      axios
        .post("/blog", Json)
        .then(res => {
          state.loading = false;
          state.ArticleData = state.articleDataTemp = res.data.reverse();
          this.commit('filterUser')
          // return state.ArticleData;
        })
        .catch(err => {
          console.log(err);
        });
    },
    readDataFormDB(state, Json) {
      axios
        .post("/blog", Json)
        .then(res => {
          state.loading = false;
          state.ArticleData = res.data.reverse();
          // return state.ArticleData;
        })
        .catch(err => {
          console.log(err);
        });
    },


    deleteItem(state, i) {
      let adata = state.ArticleData;
      adata.forEach((element, e) => {
        if (element._id === i) {
          axios
            .post("/blog/delete", {
              _id: adata.splice(e, 1)[0]._id
            })
            .then(res => {
              console.log(res.data);
            })
            .catch(err => [console.log(err)]);
        }
      });
    },

    serchData(state, keywords) {
      // console.log(keywords)
      let newlist = [];
      state.ArticleData.forEach(element => {
        if (element.articleComment.indexOf(keywords) === -1) {
          newlist.push(element);
        }
      });
      state.serchlist = newlist;
    },

  }
});
