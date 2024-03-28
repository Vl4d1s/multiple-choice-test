import useTest from "../hooks/useTest";

export default function Test() {
  const { error, loading, questions } = useTest();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{JSON.stringify(questions)}</div>;
}
