import { MDXRemote } from "next-mdx-remote/rsc";

const PostWidget2 = ({ content }: { content: string }) => {
  return (
    <article>
      <MDXRemote source={content} />
    </article>
  );
};

export default PostWidget2;
