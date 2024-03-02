import Top from "@/app/components/Menu/Recipe/detail";

export default function Home({ params }: { params: { docId: string } }) {
  return (
    <>
      <Top docId={params.docId} />
    </>
  );
}