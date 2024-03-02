import UpdateField from "@/app/components/Post/shop/updateField";

export default function Home({ params }: { params: { docId: string } }) {
  return (
    <>
      <UpdateField docId={params.docId} />
    </>
  );
}
