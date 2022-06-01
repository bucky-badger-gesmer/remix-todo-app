import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { supabase } from '../../libs/supabase-client';
import { useLoaderData } from '@remix-run/react';
import { Form } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
  const { data } = await supabase.from("todos").select("*");
  return data;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  let { _action } = Object.fromEntries(formData);
  console.log("action", _action);
  if (_action === "add") {
    const newTodo = {
      item: formData.get("todo"),
    };
    const { data, error } = await supabase
      .from("todos")
      .insert(newTodo);
    console.log("dater", data, error);
    console.log('error', error)
  }
  if (_action === 'delete') {
    await supabase.from('todos').delete().match({id: formData.get('id') })
  }
  return null;
};

interface TodoItem {
  id: number;
  item: string;
}

const Index = () => {
  const data = useLoaderData();

  return (
    <div>
      <h1>Todo's</h1>
      <Form method="post">
        <input type="text" name="todo" />
        <button name="_action" value="add">Add</button>
      </Form>
      <ul>
        {data.map((o: TodoItem) => ( 
          <li key={o.id}><Form method="post"><input type='hidden' name="id" value={o.id}/>{o.item}<button name="_action" value="delete">Delete Me</button></Form></li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
