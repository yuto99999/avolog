import Field from "@/app/components/Post/shop/field";

export default function Home({ params }: { params: { docId: string } }) {
  return (
    <>
      <Field docId={params.docId} />
    </>
  );
}
