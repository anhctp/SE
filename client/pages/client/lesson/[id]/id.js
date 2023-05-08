export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:8000/api/lesson/${id}`);
  const lesson = await res.json();

  return {
    props: {
      lesson,
    },
  };
}

