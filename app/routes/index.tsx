import type { LoaderFunction } from '@remix-run/node';
import { supabase } from '../../libs/supabase-client';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  const { data } = await supabase.from("todos").select("*");
  return data;
};

interface TodoItem {
  id: number;
  item: string;
}

const Index = () => {
  const data = useLoaderData();
  console.log('DATA?', data)
  return (
    <div>
      <h1>Hello world</h1>
      <ul>
        {data.map((o: TodoItem) => <li key={o.id}>{o.item}</li>)}
      </ul>
    </div>
  );
}

export default Index;
