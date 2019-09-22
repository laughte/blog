<template>
  <transition appear>
    <v-card flat dark :color="$store.state.sidecolor">
      <v-card-title>
        Nutrition
        <div class="flex-grow-1"></div>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        light
        :loading="$store.state.loading"
        :headers="headers"
        :items="$store.state.ArticleData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        @click:row="showitem"
        :search="search"
        @page-count="pageCount = $event"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.username" label="name"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.articletype" label="type"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.articleCollect" label="collect"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.articleReply" label=" reply"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.articleTime" label="time"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- </v-toolbar> -->
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-4" @click.stop.prevent="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click.stop.prevent="deleteItem(item)">mdi-delete</v-icon>
        </template>

        <template v-slot:item.articletype="{ item }">
          <v-chip class="lighten-2" :color="getColor(item.articletype)" dark>
            {{
            item.articletype
            }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </transition>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      page: 1,
      pageCount: 0,
      search: "",
      itemsPerPage: 13,
      dialog: false,
      headers: [
        {
          text: "作者",
          align: "left",
          sortable: false,
          value: "username",
          width: "120px"
        },
        {
          text: "文章标题",
          align: "left",
          sortable: false,
          value: `articleTitle`,
          width: "200px"
        },
        { text: "文章类型", value: "articletype", sortable: false },
        { text: "创建时间", value: "articleTime" },
        { text: "收藏数", value: "articleCollect" },
        { text: "评论数", value: "articleReply" },
        { text: "Actions", value: "action", sortable: false }
      ],

      editedIndex: -1,
      editedItem: {
        username: "",
        articletype: 0,
        articleCollect: 0,
        articleReply: 0,
        articleTime: ""
      },
      defaultItem: {
        username: "",
        articletype: 0,
        articleCollect: 0,
        articleReply: 0,
        articleTime: ""
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    showitem(e) {
      // console.log(e);
      this.$router.push({ name: "home", params: { artid: e._id } });
    },

    editItem(item) {
      this.editedIndex = this.$store.state.ArticleData.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      if (this.$store.state.user.username) {
        let e = item.articleId;
        confirm("你确认要删除此项???") && this.$store.commit("deleteItem", e);
      } else {
        alert("你还没登录呢");
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.$store.state.ArticleData[this.editedIndex],
          this.editedItem
        );
        // let id = this.$store.state.ArticleData[this.editedIndex]._id;
        let Json = this.editedItem;
        this.$axios.post("/blog/update", Json).then(res => {
          console.log(res.data);
        });
      } else {
        this.$store.state.ArticleData.push(this.editedItem);
      }
      this.close();
    },
    getColor(e) {
      switch (e) {
        case "python":
          return "red";

        case "JavaScript":
          return "pink accent-2";

        case "PHP":
          return "teal";

        case "java":
          return "purple";

        case "诗经":
          return "brown lighten-3";

        case "散文":
          return "cyan lighten-3";

        case "水彩":
          return "light-blue";

        case "古诗词":
          return "orange";

        case "小说":
          return "lime";
        case "素描":
          return "light-green";
        case "油画":
          return "amber";

        case "插画":
          return "blue-grey";

        case "photoshop":
          return "cyan accent-2";

        case "painter":
          return "pink accent-1";

        default:
          return "yellow";
      }
    }
  }
};
</script>
