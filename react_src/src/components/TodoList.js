import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList(props) {

    const handleItemUpdate = (newItem) => {
        const index = props.list.items.findIndex((item) => item.id === newItem.id);

        if(index !== -1) {
            let newItems = [...props.list.items];
            newItems.splice(index, 1, newItem);

            let newList = {...props.list, items: newItems};

            props.onUpdate(newList);
        }
    }

    const handleDelete = (id) => () => {
        const index = props.list.items.findIndex((item) => item.id === id);

        if(index !== -1) {
            let newItems = [...props.list.items];
            newItems.splice(index, 1);

            let newList = {...props.list, items: newItems};

            props.onUpdate(newList);
        }
    }

    return (
        <div>
            {props.list.items.map((item) => <TodoItem 
                item={item}
                onUpdate={handleItemUpdate}
                onDelete={handleDelete(item.id)}
            />)}
        </div>
    )
} 