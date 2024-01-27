import Field from "@/app/components/Post/shop/field";

export default function Home({ params }: { params: { docId: any } }) {
  return (
    <>
      <Field docId={params.docId} />
    </>
  );
}
