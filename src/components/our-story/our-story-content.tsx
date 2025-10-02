export default function OurStoryContent({ story }: { story?: OurStoryDto }) {
  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 my-6">
      <div className="text-3xl font-semibold">Our Story</div>
      <article
        className="ck-content ckeditor-result"
        dangerouslySetInnerHTML={{ __html: story?.content ?? "" }}
      ></article>
    </section>
  );
}
