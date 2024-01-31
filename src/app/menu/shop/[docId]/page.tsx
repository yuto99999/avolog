import Detail from "@/app/components/Menu/Shop/Detail/detail";

export default function Home({ params }: { params: { docId: string } }) {
  return (
    <>
      <Detail docId={params.docId} />
    </>
  );
}