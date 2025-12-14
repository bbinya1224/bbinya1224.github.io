module.exports = function (plop) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const defaultSlug = `${yyyy}${mm}${dd}`;

  plop.setGenerator("post", {
    description: "Create a new blog post",
    prompts: [
      {
        type: "input",
        name: "title",
        message: "Post Title:",
      },
      {
        type: "input",
        name: "slug",
        message: "Slug (YYYYMMDD):",
        default: defaultSlug,
      },
      {
        type: "input",
        name: "tag",
        message: "Tags (comma separated):",
      },
      {
        type: "input",
        name: "category",
        message: "Category:",
      },
      {
        type: "input",
        name: "description",
        message: "Description:",
      },
    ],
    actions: function (data) {
      const date = /^\d{8}$/.test(data.slug)
        ? `${data.slug.substring(0, 4)}-${data.slug.substring(4, 6)}-${data.slug.substring(6, 8)}`
        : `${yyyy}-${mm}-${dd}`;

      return [
        {
          type: "add",
          path: "posts/{{slug}}.mdx",
          templateFile: "plop-templates/post.mdx.hbs",
          data: { date },
        },
      ];
    },
  });
};
