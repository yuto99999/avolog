import Field from "@/app/components/Post/shop/updateField";

export default function Home({ params }: { params: { docId: string } }) {
  return (
    <>
      <Field docId={params.docId} />
    </>
  );
}
