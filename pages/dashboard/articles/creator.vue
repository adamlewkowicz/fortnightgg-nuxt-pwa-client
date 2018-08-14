<template>
  <article>
    <div
      :content="content"
      @change="content = $event.html"
      v-quill:myQuillEditor="{}">
    </div>
    <button @click="getTitle()">Get title</button>
    {{ title }}
    <div v-html="content">
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      content: '<h1>Typical fortnt playerz śćść</h1>',
      title: '',
      editorOption: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block']
        ]
      }
    }
    }
  },
  methods: {
    getTitle() {
      const regExp = new RegExp("\<h1\>(.*)\<\/h1\>");
      const [, title] =  regExp.exec(this.content);
      if (title) {
        this.prepareTitle(title);
      }
    },
    prepareTitle(title) {
      this.title = encodeURI(title.toLowerCase().replace(/ /g, '-'));
    }
  }
}
</script>

