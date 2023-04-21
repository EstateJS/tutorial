import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

// 1
import {useEstateClient} from "estate-react";
import {Entry, LogBook} from 'log-book-service';

export default function LogBook() {    
    
    // 2
    const estate = useEstateClient();
    const logBook = estate.getWorker(LogBook, 'default');
    const [entries, setEntries] = useState<Entry[]>([]);
    
    useEffect(() => {
        
        // 3
        logBook.getEntries()
            .then((values: Entry[]) => {
                setEntries(values);
            }).catch((reason: any) => {
                console.error(reason)
            });

    },[]);

    return (
        <div>
            <h3>Visitors Log Book</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                
                {entries.map(value => {
                    return <EntryItem entry={value} key={value.primaryKey}/>;
                })}

                </tbody>
            </table>
        </div>
    );
}

interface EntryItemProps {
    entry: Entry
}

function EntryItem(props: EntryItemProps) {
    return (
        <tr>
            <td>{props.entry.name}</td>
            <td>{props.entry.date.toString().substring(0, 10)}</td>
        </tr>
    );
}