import BookDetail from "./components/BookDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const id = (await params).id;

  const fetchOptions: RequestInit = {};

  const response = await fetch(
    `https://elibrary-demo-b.origin.com.mm/api/ebook/get/${id}/similar`,
    fetchOptions
  );

  const data = await response.json();

  return (
    <div className=" m-10">
      <BookDetail data={data} />
    </div>
  );
};

export default Page;
