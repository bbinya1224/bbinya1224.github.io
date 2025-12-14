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
      const slug = data.slug;
      // Assuming slug is YYYYMMDD, format it to YYYY-MM-DD
      // If slug is not YYYYMMDD, fallback to today's date or keep as is?
      // Let's try to parse YYYYMMDD from slug if it matches 8 digits
      let date = `${yyyy}-${mm}-${dd}`;
      if (/^\d{8}$/.test(slug)) {
        date = `${slug.substring(0, 4)}-${slug.substring(4, 6)}-${slug.substring(6, 8)}`;
      }

      return [
        {
          type: "add",
          path: "../../../../posts/{{slug}}.mdx",
          templateFile: "templates/post.mdx.hbs",
          data: { date },
        },
      ];
    },
  });
};
