<template>
  <v-card>
    <v-container class="grey lighten-4 fill-height">
      <v-navigation-drawer clipped color="grey lighten-4">
        <v-list dense class="grey lighten-4">
          <template v-for="(item, i) in items">
            <v-row v-if="item.heading" :key="i" align="center">
              <v-col cols="6">
                <v-subheader v-if="item.heading">{{
                  item.heading
                }}</v-subheader>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn small text>edit</v-btn>
              </v-col>
            </v-row>
            <v-divider
              v-else-if="item.divider"
              :key="i"
              dark
              class="my-4"
            ></v-divider>
            <v-list-item v-else :key="i" @click>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="grey--text">{{
                  item.text
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-row justify="center" align="center">
        <v-col>
          <managecontent />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import managecontent from "@/components/manageContent";
export default {
  components: { managecontent },
  props: {
    source: String
  },
  data: () => ({
    items: [
      { icon: "mdi-lightbulb", text: "Notes" },
      { icon: "mdi-touch", text: "Reminders" },
      { divider: true },
      { heading: "Labels" },
      { icon: "mdi-plus", text: "Create new label" },
      { divider: true },
      { icon: "mdi-archive", text: "Archive" },
      { icon: "mdi-delete", text: "Trash" },
      { divider: true },
      { icon: "mdi-settings", text: "Settings" },
      { icon: "mdi-delete-empty", text: "Trash" },
      { icon: "mdi-help", text: "Help" },
      { icon: "mdi-file-download", text: "App downloads" },
      { icon: "mdi-keyboard", text: "Keyboard shortcuts" }
    ]
  })
};
</script>
